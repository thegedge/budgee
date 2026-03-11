import type { LitElement } from "lit";
import { css } from "lit";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

export const busyStyles = css`
  :host([busy]) {
    pointer-events: none;
    cursor: wait;
    opacity: 0.6;
  }
`;

export function BusyMixin<T extends Constructor<LitElement>>(superClass: T) {
  class BusyMixinClass extends superClass {
    private _busy = false;

    async withBusy<R>(fn: () => Promise<R>): Promise<R> {
      this._busy = true;
      this.toggleAttribute("busy", true);
      this.requestUpdate();
      try {
        return await fn();
      } finally {
        this._busy = false;
        this.toggleAttribute("busy", false);
        this.requestUpdate();
      }
    }

    get busy() {
      return this._busy;
    }
  }

  return BusyMixinClass as unknown as Constructor<BusyMixinClass> & T;
}
