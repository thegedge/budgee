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
  @state() private _enabled = false;
  @state() private _url = "";
  @state() private _testResult: "success" | "error" | "testing" | null = null;
  @state() private _testError = "";

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

  async #onTestConnection() {
    this._testResult = "testing";
    this._testError = "";
    try {
      await testConnection(this._url);
      this._testResult = "success";
    } catch (e) {
      this._testResult = "error";
      this._testError = e instanceof Error ? e.message : String(e);
    }
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
    `;
  }
}
