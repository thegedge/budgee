import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { type SyncStatus, syncStatus$ } from "../../database/replication";

declare global {
  interface HTMLElementTagNameMap {
    "sync-status-indicator": SyncStatusIndicator;
  }
}

const LABELS: Record<SyncStatus, string> = {
  "not-configured": "Not configured",
  connecting: "Connecting",
  syncing: "Syncing",
  synced: "Synced",
  error: "Error",
};

@customElement("sync-status-indicator")
export class SyncStatusIndicator extends LitElement {
  @state() private _status: SyncStatus = "not-configured";

  #subscription?: { unsubscribe: () => void };

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.75rem;
      color: var(--budgee-text-muted);
      padding: 0.5rem 1rem;
    }

    .dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .dot.not-configured {
      background: var(--budgee-text-muted, gray);
    }

    .dot.connecting {
      background: var(--budgee-warning, orange);
      animation: pulse 1s infinite;
    }

    .dot.syncing {
      background: var(--budgee-warning, orange);
      animation: pulse 1s infinite;
    }

    .dot.synced {
      background: var(--budgee-positive, green);
    }

    .dot.error {
      background: var(--budgee-negative, red);
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.#subscription = syncStatus$.subscribe((status) => {
      this._status = status;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#subscription?.unsubscribe();
  }

  render() {
    return html`<span class="dot ${this._status}"></span>${LABELS[this._status]}`;
  }
}
