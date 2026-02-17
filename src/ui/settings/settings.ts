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
  }

  #onUrlChange(e: Event) {
    this._url = (e.target as HTMLInputElement).value;
    this._testResult = null;
    this._testError = "";
    this._testedUrl = "";
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
    if (this._url === savedUrl) return false;
    if (!this._url) return true;
    return this._testResult === "success" && this._testedUrl === this._url;
  }

  #onSave() {
    localStorage.setItem("budgee-sync-url", this._url);
    this.dispatchEvent(
      new CustomEvent("budgee-sync-settings-changed", { bubbles: true, composed: true }),
    );
    this.requestUpdate();
  }

  render() {
    return html`
      <h2>Sync Settings</h2>
      <p class="hint">Sync your data across devices using CouchDB replication. Save a valid URL to enable sync; clear it to disable.</p>
      <div class="field">
        <label for="sync-url">CouchDB URL</label>
        <input type="url" id="sync-url" .value=${this._url} @change=${this.#onUrlChange}
          placeholder="http://your-server:5984" />
        <p class="hint">The URL of your CouchDB server.</p>
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
