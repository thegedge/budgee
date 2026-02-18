/**
 * Custom WebRTC connection handler based on RxDB's simple-peer handler,
 * fixing a race condition where sendMessage is called on a WebSocket
 * that isn't in the OPEN state.
 */
import { Subject } from "rxjs";
// @ts-expect-error no type declarations for minified bundle
import { default as _Peer } from "simple-peer/simplepeer.min.js";
import {
  ensureNotFalsy,
  getFromMapOrThrow,
  PROMISE_RESOLVE_VOID,
  promiseWait,
  randomToken,
} from "rxdb/plugins/utils";
import { newRxError } from "rxdb";
import type {
  SimplePeer,
  SimplePeerConnectionHandlerOptions,
  PeerMessage,
} from "rxdb/plugins/replication-webrtc";
import type { WebRTCConnectionHandlerCreator } from "rxdb/plugins/replication-webrtc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Peer = _Peer as any;

const PING_INTERVAL = 1000 * 60 * 2;

function sendMessage(ws: WebSocket, msg: PeerMessage) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(msg));
  }
}

export function getConnectionHandler({
  signalingServerUrl,
  wrtc,
  config,
  webSocketConstructor = WebSocket,
}: SimplePeerConnectionHandlerOptions): WebRTCConnectionHandlerCreator<SimplePeer> {
  if (typeof process === "undefined" || typeof process.nextTick !== "function") {
    throw newRxError("RC7");
  }

  return async (options) => {
    const connect$ = new Subject<SimplePeer>();
    const disconnect$ = new Subject<SimplePeer>();
    const message$ = new Subject<{ peer: SimplePeer; message: unknown }>();
    const response$ = new Subject<{ peer: SimplePeer; response: unknown }>();
    const error$ = new Subject<unknown>();
    const peers = new Map<string, SimplePeer>();
    let closed = false;
    let ownPeerId: string;
    let socket: WebSocket | undefined;

    createSocket();

    // Ping loop
    (async () => {
      while (!closed) {
        await promiseWait(PING_INTERVAL / 2);
        if (closed) break;
        if (socket) {
          sendMessage(socket, { type: "ping" } as PeerMessage);
        }
      }
    })();

    function createSocket() {
      if (closed) return;

      const ws = new webSocketConstructor(signalingServerUrl!);
      socket = ws;

      ws.onclose = () => createSocket();
      ws.onopen = () => {
        ws.onmessage = (msgEvent: MessageEvent) => {
          const msg = JSON.parse(msgEvent.data as string);
          switch (msg.type) {
            case "init":
              ownPeerId = msg.yourPeerId;
              sendMessage(ws, { type: "join", room: options.topic } as PeerMessage);
              break;

            case "joined": {
              const createPeerConnection = (remotePeerId: string) => {
                let disconnected = false;
                const newPeer = new Peer({
                  initiator: remotePeerId > ownPeerId,
                  wrtc,
                  config,
                  trickle: true,
                }) as unknown as SimplePeer;
                newPeer.id = randomToken(10);
                peers.set(remotePeerId, newPeer);

                newPeer.on("signal", (signal: unknown) => {
                  sendMessage(ensureNotFalsy(socket), {
                    type: "signal",
                    senderPeerId: ownPeerId,
                    receiverPeerId: remotePeerId,
                    room: options.topic,
                    data: signal,
                  } as PeerMessage);
                });

                newPeer.on("data", (raw: Buffer | string) => {
                  const parsed = JSON.parse(raw.toString());
                  if (parsed.result) {
                    response$.next({ peer: newPeer, response: parsed });
                  } else {
                    message$.next({ peer: newPeer, message: parsed });
                  }
                });

                newPeer.on("error", (error: Error) => {
                  error$.next(newRxError("RC_WEBRTC_PEER", { error }));
                  newPeer.destroy();
                  if (!disconnected) {
                    disconnected = true;
                    disconnect$.next(newPeer);
                  }
                });

                newPeer.on("connect", () => {
                  connect$.next(newPeer);
                });

                newPeer.on("close", () => {
                  if (!disconnected) {
                    disconnected = true;
                    disconnect$.next(newPeer);
                  }
                  createPeerConnection(remotePeerId);
                });
              };

              (msg.otherPeerIds as string[]).forEach((remotePeerId) => {
                if (remotePeerId === ownPeerId || peers.has(remotePeerId)) return;
                createPeerConnection(remotePeerId);
              });
              break;
            }

            case "signal": {
              const peer = getFromMapOrThrow(peers, msg.senderPeerId);
              peer.signal(msg.data);
              break;
            }
          }
        };
      };
    }

    return {
      error$,
      connect$,
      disconnect$,
      message$,
      response$,
      async send(peer: SimplePeer, message: unknown) {
        await (peer as unknown as { send(data: string): void }).send(JSON.stringify(message));
      },
      close() {
        closed = true;
        ensureNotFalsy(socket).close();
        error$.complete();
        connect$.complete();
        disconnect$.complete();
        message$.complete();
        response$.complete();
        return PROMISE_RESOLVE_VOID;
      },
    } as unknown as ReturnType<WebRTCConnectionHandlerCreator<SimplePeer>>;
  };
}
