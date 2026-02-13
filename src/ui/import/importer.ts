import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { type ColumnMapping, type CsvParseResult, parseCsv } from "../../import/parseCsv";

declare global {
  interface HTMLElementTagNameMap {
    "trans-importer": Importer;
  }
}

const MAPPING_FIELDS: { key: keyof ColumnMapping; label: string }[] = [
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
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

  static styles = css`
    :host {
      display: block;
      border: 1px solid #ccc;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
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
  `;

  async #onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    this._result = await parseCsv(file);
    this._mapping = { ...this._result.suggestedMapping };
    this._step = "mapping";
  }

  #onMappingChange(field: keyof ColumnMapping, e: Event) {
    const select = e.target as HTMLSelectElement;
    const value = select.value || undefined;
    this._mapping = { ...this._mapping, [field]: value };
  }

  render() {
    return html`
      <h2>Import Transactions</h2>
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
