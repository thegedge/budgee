import { LitElement, type PropertyValues, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Account } from "../../models/Account";
import type { ImportMode } from "../../import/importTransactions";
import { type ColumnMapping, type CsvParseResult, parseCsv } from "../../import/parseCsv";
import { buttonStyles } from "../buttonStyles";
import { inputStyles } from "../inputStyles";
import { BusyMixin, busyStyles } from "../shared/BusyMixin";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "transaction-importer": TransactionImporter;
  }
}

const MAPPING_FIELDS: { key: keyof ColumnMapping; label: string }[] = [
  { key: "date", label: "Date" },
  { key: "amount", label: "Debit" },
  { key: "credit", label: "Credit" },
  { key: "description", label: "Description" },
  { key: "account", label: "Account" },
];

@customElement("transaction-importer")
export class TransactionImporter extends BusyMixin(LitElement) {
  /** When set, skips the upload step and loads this file directly. */
  @property({ attribute: false })
  file?: File;

  @state()
  private _step: "upload" | "mapping" = "upload";

  @state()
  private _result?: CsvParseResult;

  @state()
  private _mapping: ColumnMapping = {};

  @state()
  private _accounts: Account[] = [];

  @state()
  private _accountName = "";

  @state()
  private _importMode: ImportMode = "append";

  static styles = [
    buttonStyles,
    inputStyles,
    busyStyles,
    tableStyles,
    css`
      :host {
        display: block;
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
      }
    `,
  ];

  willUpdate(changed: PropertyValues) {
    if (changed.has("file") && this.file) {
      this._step = "mapping";
      this.#loadFile(this.file);
    }
  }

  async #loadFile(file: File) {
    await this.withBusy(async () => {
      this._accounts = await Account.all();
      this._result = await parseCsv(file);
      this._mapping = { ...this._result.suggestedMapping };
      this._step = "mapping";
    });
  }

  async #onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    await this.#loadFile(input.files[0]);
  }

  #onAccountNameInput(e: Event) {
    this._accountName = (e.target as HTMLInputElement).value;
  }

  #onImportModeChange(e: Event) {
    this._importMode = (e.target as HTMLSelectElement).value as ImportMode;
  }

  #onMappingChange(field: keyof ColumnMapping, e: Event) {
    const select = e.target as HTMLSelectElement;
    const value = select.value || undefined;
    this._mapping = { ...this._mapping, [field]: value };
  }

  async #resolveAccountId(): Promise<string | undefined> {
    if (this._mapping.account) return undefined;

    const name = this._accountName.trim();
    if (!name) return undefined;

    const existing = this._accounts.find((a) => a.name.toLowerCase() === name.toLowerCase());
    if (existing) return existing.id;

    return (await Account.create({ name })).id;
  }

  async #onImport() {
    if (!this._result) return;

    const needsAccount = !this._mapping.account;
    const accountId = await this.#resolveAccountId();
    if (needsAccount && accountId === undefined) return;

    this.dispatchEvent(
      new CustomEvent("import-start", {
        detail: {
          data: this._result.data,
          mapping: this._mapping,
          accountId,
          importMode: this._importMode,
        },
      }),
    );
  }

  render() {
    return html`
      ${this._step === "upload" ? this.#renderUpload() : this.#renderMapping()}
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
      <h4>Column Mapping</h4>
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

      ${
        !this._mapping.account
          ? html`
        <h4>Account</h4>
        <div class="mapping-form">
          <label>Account:</label>
          <input
            type="text"
            list="account-options"
            .value=${this._accountName}
            @input=${this.#onAccountNameInput}
            placeholder="Type or select an account"
          />
          <datalist id="account-options">
            ${this._accounts.map((a) => html`<option value=${a.name}></option>`)}
          </datalist>
        </div>
      `
          : nothing
      }

      <div class="mapping-form">
        <label>Mode:</label>
        <select @change=${this.#onImportModeChange}>
          <option value="append" ?selected=${this._importMode === "append"}>Append to existing</option>
          <option value="replace" ?selected=${this._importMode === "replace"}>Replace existing transactions</option>
        </select>
      </div>

      <button @click=${this.#onImport}>Import</button>

      <h4>Preview</h4>
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
