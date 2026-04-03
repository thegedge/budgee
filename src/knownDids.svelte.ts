/**
 * PROTOTYPE ONLY — Populated via the server's list_dids RPC, which dumps all
 * known DIDs. Replace with a proper contact/discovery mechanism before
 * production use.
 */
let dids = $state<string[]>([]);

export function knownDids(): string[] {
  return dids;
}

export function setKnownDids(value: string[]): void {
  dids = value;
}
