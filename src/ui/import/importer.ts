import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Accounts } from "../../data/accounts";
import { exportDatabase } from "../../database/exportDb";
import { importDatabase } from "../../database/importDb";
import type { Account } from "../../database/types";
import { type ImportMode, importTransactions } from "../../import/importTransactions";
import { type ColumnMapping, type CsvParseResult, parseCsv } from "../../import/parseCsv";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "trans-importer": Importer;
  }
}

const MAPPING_FIELDS: { key: keyof ColumnMapping; label: string }[] = [
  { key: "date", label: "Date" },
  { key: "amount", label: "Debit" },
  { key: "credit", label: "Credit" },
  { key: "description", label: "Description" },
  { key: "account", label: "Account" },
];

@customElement("trans-importer")
export class Importer extends LitElement {
  @state()
  private _step: "upload" | "mapping" = "upload";

  @state()
  private _result?: CsvParseResult;

  @state()
  private _mapping: ColumnMapping = {};

  @state()
  private _accounts: Account[] = [];

  @state()
  private _selectedAccountId?: number;

  @state()
  private _newAccountName = "";

  @state()
  private _importMode: ImportMode = "append";

  static styles = [
    tableStyles,
    css`
      :host {
        display: block;
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      .preview {
        max-height: 200px;
        overflow-y: auto;
      }
      .mapping-form {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5rem;
        align-items: center;
        max-width: 400px;
      }
      select {
        padding: 4px 8px;
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
    `,
  ];

  async #onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    this._accounts = await Accounts.all();
    this._result = await parseCsv(file);
    this._mapping = { ...this._result.suggestedMapping };
    this._step = "mapping";
  }

  #onAccountChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    this._selectedAccountId = value ? Number(value) : undefined;
  }

  #onNewAccountNameInput(e: Event) {
    this._newAccountName = (e.target as HTMLInputElement).value;
  }

  #onImportModeChange(e: Event) {
    this._importMode = (e.target as HTMLSelectElement).value as ImportMode;
  }

  #onMappingChange(field: keyof ColumnMapping, e: Event) {
    const select = e.target as HTMLSelectElement;
    const value = select.value || undefined;
    this._mapping = { ...this._mapping, [field]: value };
  }

  async #onDatabaseImport(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;

    if (!confirm("This will replace all existing data. Are you sure?")) {
      input.value = "";
      return;
    }

    await importDatabase(input.files[0]);
    input.value = "";
    window.location.reload();
  }

  async #onImport() {
    if (!this._result) return;

    let accountId = this._selectedAccountId;
    if (accountId === undefined) {
      const name = this._newAccountName.trim();
      if (!name) return;
      accountId = await Accounts.create({ name });
    }

    const count = await importTransactions(this._result.data, this._mapping, {
      accountId,
      importMode: this._importMode,
    });

    this.dispatchEvent(new CustomEvent("imported", { detail: { count } }));
    this._step = "upload";
    this._result = undefined;
    this._mapping = {};
    this._selectedAccountId = undefined;
    this._newAccountName = "";
    this._importMode = "append";
  }

  render() {
    return html`
      <h2>Import Transactions</h2>
      ${this._step === "upload" ? this.#renderUpload() : this.#renderMapping()}

      <hr style="margin: 2rem 0;" />

      <h2>Import Database</h2>
      <p>Restore from a full JSON backup. This will replace all existing data.</p>
      <input type="file" accept=".json" @change=${this.#onDatabaseImport} />

      <h2>Export Database</h2>
      <p>Download a full backup of your data as JSON.</p>
      <button @click=${exportDatabase}>Export</button>
    `;
  }

  #renderUpload() {
    return html`
      <label for="file-upload">Select a CSV file:</label>
      <input type="file" id="file-upload" accept=".csv" @change=${this.#onFileChange} />
    `;
  }

  #renderMapping() {
    if (!this._result) return nothing;

    const headers = this._result.meta.fields ?? [];
    const previewData = this._result.data.slice(0, 5);

    return html`
      <h3>Column Mapping</h3>
      <div class="mapping-form">
        ${MAPPING_FIELDS.map(
          ({ key, label }) => html`
          <label>${label}:</label>
          <select @change=${(e: Event) => this.#onMappingChange(key, e)}>
            <option value="">-- Unmapped --</option>
            ${headers.map(
              (h) => html`
              <option value=${h} ?selected=${this._mapping[key] === h}>${h}</option>
            `,
            )}
          </select>
        `,
        )}
      </div>

      <h3>Account</h3>
      <div class="mapping-form">
        <label>Account:</label>
        <select @change=${this.#onAccountChange}>
          <option value="">-- New Account --</option>
          ${this._accounts.map(
            (a) => html`
            <option value=${a.id!} ?selected=${this._selectedAccountId === a.id}>${a.name}</option>
          `,
          )}
        </select>
        ${
          this._selectedAccountId === undefined
            ? html`
          <label>Name:</label>
          <input type="text" .value=${this._newAccountName} @input=${this.#onNewAccountNameInput} />
        `
            : nothing
        }
        <label>Mode:</label>
        <select @change=${this.#onImportModeChange}>
          <option value="append" ?selected=${this._importMode === "append"}>Append to existing</option>
          <option value="replace" ?selected=${this._importMode === "replace"}>Replace existing transactions</option>
        </select>
      </div>

      <button @click=${this.#onImport}>Import</button>

      <h3>Preview</h3>
      <div class="preview">
        <table>
          <thead>
            <tr>${headers.map((h) => html`<th>${h}</th>`)}</tr>
          </thead>
          <tbody>
            ${previewData.map(
              (row) => html`
              <tr>${headers.map((h) => html`<td>${row[h]}</td>`)}</tr>
            `,
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}
