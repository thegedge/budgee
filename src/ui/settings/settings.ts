import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "budgee-settings": Settings;
  }
}

@customElement("budgee-settings")
export class Settings extends LitElement {
  @state() private _enabled = false;
  @state() private _url = "";

  static styles = css`
    :host {
      display: block;
    }

    h2 {
      margin-top: 0;
    }

    .field {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    input[type="url"] {
      width: 100%;
      max-width: 400px;
      padding: 0.4rem 0.6rem;
      border: 1px solid var(--budgee-border);
      border-radius: 4px;
      background: var(--budgee-surface);
      color: var(--budgee-text);
      font-size: 0.9rem;
    }

    .toggle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .hint {
      font-size: 0.8rem;
      color: var(--budgee-text-muted);
      margin-top: 0.25rem;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._enabled = localStorage.getItem("budgee-sync-enabled") === "true";
    this._url = localStorage.getItem("budgee-sync-url") ?? "";
  }

  #onToggle(e: Event) {
    this._enabled = (e.target as HTMLInputElement).checked;
    localStorage.setItem("budgee-sync-enabled", String(this._enabled));
    this.#dispatchChange();
  }

  #onUrlChange(e: Event) {
    this._url = (e.target as HTMLInputElement).value;
    localStorage.setItem("budgee-sync-url", this._url);
    this.#dispatchChange();
  }

  #dispatchChange() {
    this.dispatchEvent(
      new CustomEvent("budgee-sync-settings-changed", { bubbles: true, composed: true }),
    );
  }

  render() {
    return html`
      <h2>Sync Settings</h2>
      <div class="field">
        <div class="toggle">
          <input type="checkbox" id="sync-enabled" .checked=${this._enabled} @change=${this.#onToggle} />
          <label for="sync-enabled">Enable sync</label>
        </div>
        <p class="hint">Sync your data across devices using CouchDB replication.</p>
      </div>
      <div class="field">
        <label for="sync-url">CouchDB URL</label>
        <input type="url" id="sync-url" .value=${this._url} @change=${this.#onUrlChange}
          placeholder="http://your-server:5984" />
        <p class="hint">The URL of your CouchDB server.</p>
      </div>
    `;
  }
}
