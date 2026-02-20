import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { exportDatabase } from "../../database/exportDb";
import { importDatabase } from "../../database/importDb";
import { testConnection } from "../../database/replication";
import { hideLoadingOverlay, showLoadingOverlay } from "../shared/LoadingOverlay";

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

    section {
      border: 1px solid var(--budgee-border);
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      background: var(--budgee-surface);
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
      padding: 0.5rem 1rem;
      cursor: pointer;
      background-color: var(--budgee-primary);
      color: white;
      border: none;
      border-radius: 4px;
    }

    button:hover {
      background-color: var(--budgee-primary-hover);
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
    localStorage.removeItem("budgee-ice-server");
    localStorage.removeItem("budgee-turn-server");
    this.dispatchEvent(
      new CustomEvent("budgee-sync-settings-changed", { bubbles: true, composed: true }),
    );
    this.requestUpdate();
  }

  async #onDatabaseImport(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;

    if (!confirm("This will replace all existing data. Are you sure?")) {
      input.value = "";
      return;
    }

    showLoadingOverlay("Importing database...");
    try {
      await importDatabase(input.files[0]);
      input.value = "";
      window.location.reload();
    } finally {
      hideLoadingOverlay();
    }
  }

  render() {
    return html`
      <section>
        <h2>Import / Export</h2>
        <h3>Import Database</h3>
        <p>Restore from a full JSON backup. This will replace all existing data.</p>
        <input type="file" accept=".json" @change=${this.#onDatabaseImport} />

        <h3>Export Database</h3>
        <p>Download a full backup of your data as JSON.</p>
        <button @click=${exportDatabase}>Export</button>
      </section>

      <section>
        <h2>Sync</h2>
        <p class="hint">Sync your data across devices using a sync server. Save a valid URL to enable sync; clear it to disable.</p>
        <div class="field">
          <label for="sync-url">Server URL</label>
          <input type="url" id="sync-url" .value=${this._url} @change=${this.#onUrlChange}
            placeholder="http://your-server:3001" />
          <p class="hint">The URL of your sync server.</p>
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
      </section>
    `;
  }
}
