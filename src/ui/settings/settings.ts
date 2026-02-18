import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { testConnection } from "../../database/replication";

declare global {
  interface HTMLElementTagNameMap {
    "budgee-settings": Settings;
  }
}

@customElement("budgee-settings")
export class Settings extends LitElement {
  @state() private _url = "";
  @state() private _iceServer = "";
  @state() private _turnServer = "";
  @state() private _testResult: "success" | "error" | "testing" | null = null;
  @state() private _testError = "";
  @state() private _testedUrl = "";

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

    input[type="url"],
    input[type="text"] {
      width: 100%;
      max-width: 400px;
      padding: 0.4rem 0.6rem;
      border: 1px solid var(--budgee-border);
      border-radius: 4px;
      background: var(--budgee-surface);
      color: var(--budgee-text);
      font-size: 0.9rem;
    }

    .hint {
      font-size: 0.8rem;
      color: var(--budgee-text-muted);
      margin-top: 0.25rem;
    }

    button {
      padding: 0.4rem 0.8rem;
      border: 1px solid var(--budgee-border);
      border-radius: 4px;
      background: var(--budgee-surface);
      color: var(--budgee-text);
      cursor: pointer;
      font-size: 0.9rem;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .test-result {
      font-size: 0.85rem;
      margin-top: 0.25rem;
    }

    .test-result.success {
      color: var(--budgee-positive, green);
    }

    .test-result.error {
      color: var(--budgee-negative, red);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._url = localStorage.getItem("budgee-sync-url") ?? "";
    this._iceServer = localStorage.getItem("budgee-ice-server") ?? "";
    this._turnServer = localStorage.getItem("budgee-turn-server") ?? "";
  }

  #onUrlChange(e: Event) {
    this._url = (e.target as HTMLInputElement).value;
    this._testResult = null;
    this._testError = "";
    this._testedUrl = "";
  }

  #onIceServerChange(e: Event) {
    this._iceServer = (e.target as HTMLInputElement).value;
  }

  #onTurnServerChange(e: Event) {
    this._turnServer = (e.target as HTMLInputElement).value;
  }

  async #onTestConnection() {
    this._testResult = "testing";
    this._testError = "";
    try {
      await testConnection(this._url);
      this._testResult = "success";
      this._testedUrl = this._url;
    } catch (e) {
      this._testResult = "error";
      this._testError = e instanceof Error ? e.message : String(e);
      this._testedUrl = "";
    }
  }

  get #canSave() {
    const savedUrl = localStorage.getItem("budgee-sync-url") ?? "";
    const savedIceServer = localStorage.getItem("budgee-ice-server") ?? "";
    const savedTurnServer = localStorage.getItem("budgee-turn-server") ?? "";
    const urlChanged = this._url !== savedUrl;
    const iceChanged = this._iceServer !== savedIceServer || this._turnServer !== savedTurnServer;
    if (!urlChanged && !iceChanged) return false;
    if (!this._url) return true;
    if (urlChanged) return this._testResult === "success" && this._testedUrl === this._url;
    return true;
  }

  #onSave() {
    localStorage.setItem("budgee-sync-url", this._url);
    localStorage.setItem("budgee-ice-server", this._iceServer);
    localStorage.setItem("budgee-turn-server", this._turnServer);
    this.dispatchEvent(
      new CustomEvent("budgee-sync-settings-changed", { bubbles: true, composed: true }),
    );
    this.requestUpdate();
  }

  render() {
    return html`
      <h2>Sync Settings</h2>
      <p class="hint">Sync your data across devices using a sync server. Save a valid URL to enable sync; clear it to disable.</p>
      <div class="field">
        <label for="sync-url">Server URL</label>
        <input type="url" id="sync-url" .value=${this._url} @change=${this.#onUrlChange}
          placeholder="http://your-server:3001" />
        <p class="hint">The URL of your sync server.</p>
      </div>
      <div class="field">
        <label for="ice-server">ICE Server</label>
        <input type="text" id="ice-server" .value=${this._iceServer} @change=${this.#onIceServerChange}
          placeholder="stun:stun.example.com:3478" />
        <p class="hint">Optional STUN server URL for WebRTC connectivity.</p>
      </div>
      <div class="field">
        <label for="turn-server">TURN Server</label>
        <input type="text" id="turn-server" .value=${this._turnServer} @change=${this.#onTurnServerChange}
          placeholder="turn:username:credential@host:3478" />
        <p class="hint">Optional TURN relay server. Format: turn:username:credential@host:port</p>
      </div>
      ${
        this._url
          ? html`
            <div class="field">
              <button ?disabled=${this._testResult === "testing"} @click=${this.#onTestConnection}>
                ${this._testResult === "testing" ? "Testing..." : "Test Connection"}
              </button>
              ${
                this._testResult === "success"
                  ? html`
                      <p class="test-result success">Connection successful.</p>
                    `
                  : this._testResult === "error"
                    ? html`<p class="test-result error">Connection failed: ${this._testError}</p>`
                    : nothing
              }
            </div>
          `
          : nothing
      }
      <div class="field">
        <button ?disabled=${!this.#canSave} @click=${this.#onSave}>Save</button>
      </div>
    `;
  }
}
