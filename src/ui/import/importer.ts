import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { CsvParseResult, parseCsv } from "../../import/parseCsv";

declare global {
  interface HTMLElementTagNameMap {
    "trans-importer": Importer;
  }
}

@customElement("trans-importer")
export class Importer extends LitElement {
  @state()
  private _step: "upload" | "preview" = "upload";

  @state()
  private _result?: CsvParseResult;

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
    th, td {
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
  `;

  async #onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    this._result = await parseCsv(file);
    this._step = "preview";
  }

  render() {
    return html`
      <h2>Import Transactions</h2>
      ${this._step === "upload" ? this.#renderUpload() : this.#renderPreview()}
    `;
  }

  #renderUpload() {
    return html`
      <label for="file-upload">Select a CSV file:</label>
      <input type="file" id="file-upload" accept=".csv" @change=${this.#onFileChange} />
    `;
  }

  #renderPreview() {
    if (!this._result) return html`<p>No data to preview.</p>`;
    
    const headers = this._result.meta.fields || [];
    const previewData = this._result.data.slice(0, 5);

    return html`
      <h3>Preview Data</h3>
      <div class="preview">
        <table>
          <thead>
            <tr>${headers.map(h => html`<th>${h}</th>`)}</tr>
          </thead>
          <tbody>
            ${previewData.map(row => html`
              <tr>${headers.map(h => html`<td>${row[h]}</td>`)}</tr>
            `)}
          </tbody>
        </table>
      </div>
      <h3>Suggested Column Mapping</h3>
      <ul>
        ${Object.entries(this._result.suggestedMapping).map(([key, value]) => html`
          <li><strong>${key}:</strong> ${value || 'Not found'}</li>
        `)}
      </ul>
    `;
  }
}
