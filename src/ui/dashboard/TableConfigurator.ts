import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { buttonStyles } from "../buttonStyles";
import { inputStyles } from "../inputStyles";
import type { DashboardTableColumn, DashboardTableModel } from "../../database/types";
import type { DashboardTable } from "../../models/DashboardTable";

declare global {
  interface HTMLElementTagNameMap {
    "table-configurator": TableConfigurator;
  }
}

const COLUMNS_BY_MODEL: Record<DashboardTableModel, { id: DashboardTableColumn; label: string }[]> =
  {
    transactions: [
      { id: "date", label: "Date" },
      { id: "amount", label: "Amount" },
      { id: "description", label: "Description" },
      { id: "merchant", label: "Merchant" },
      { id: "tags", label: "Tags" },
      { id: "account", label: "Account" },
    ],
    merchants: [
      { id: "name", label: "Name" },
      { id: "transactionCount", label: "Transaction Count" },
      { id: "totalAmount", label: "Total Amount" },
    ],
    tags: [
      { id: "name", label: "Name" },
      { id: "transactionCount", label: "Transaction Count" },
      { id: "totalAmount", label: "Total Amount" },
    ],
  };

function defaultColumns(model: DashboardTableModel): DashboardTableColumn[] {
  return COLUMNS_BY_MODEL[model].map((c) => c.id);
}

@customElement("table-configurator")
export class TableConfigurator extends LitElement {
  @property({ type: Object })
  editingTable?: DashboardTable;

  @state()
  private _title = "";

  @state()
  private _model: DashboardTableModel = "transactions";

  @state()
  private _columns: DashboardTableColumn[] = defaultColumns("transactions");

  @state()
  private _initialized = false;

  static styles = [
    buttonStyles,
    inputStyles,
    css`
      :host {
        display: block;
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      h4 {
        margin-top: 0;
      }
      .form-grid {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5rem;
        align-items: center;
        max-width: 400px;
        margin-bottom: 1rem;
      }
      input,
      select {
        padding: 4px 8px;
      }
      button {
        margin-right: 0.5rem;
      }
      .checkbox-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem 1rem;
        margin-bottom: 1rem;
      }
      .checkbox-list label {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.9rem;
      }
    `,
  ];

  updated(changed: Map<string, unknown>) {
    if (changed.has("editingTable") && this.editingTable && !this._initialized) {
      this._title = this.editingTable.title;
      this._model = this.editingTable.model;
      this._columns = [...this.editingTable.columns];
      this._initialized = true;
    }
  }

  #onModelChange(model: DashboardTableModel) {
    this._model = model;
    this._columns = defaultColumns(model);
  }

  #toggleColumn(col: DashboardTableColumn, checked: boolean) {
    if (checked) {
      const ordered = COLUMNS_BY_MODEL[this._model].map((c) => c.id);
      this._columns = ordered.filter((c) => this._columns.includes(c) || c === col);
    } else {
      this._columns = this._columns.filter((c) => c !== col);
    }
  }

  #onSave() {
    const title = this._title.trim();
    if (!title || this._columns.length === 0) return;

    this.dispatchEvent(
      new CustomEvent("table-saved", {
        detail: {
          id: this.editingTable?.id,
          title,
          model: this._model,
          columns: this._columns,
        },
      }),
    );

    this._title = "";
    this._initialized = false;
  }

  render() {
    const availableColumns = COLUMNS_BY_MODEL[this._model];

    return html`
      <h4>${this.editingTable ? "Edit Table" : "Add Table"}</h4>
      <div class="form-grid">
        <label>Title:</label>
        <input
          type="text"
          .value=${this._title}
          @input=${(e: Event) => {
            this._title = (e.target as HTMLInputElement).value;
          }}
        />
        <label>Model:</label>
        <select @change=${(e: Event) => {
          this.#onModelChange((e.target as HTMLSelectElement).value as DashboardTableModel);
        }}>
          <option value="transactions" ?selected=${this._model === "transactions"}>Transactions</option>
          <option value="merchants" ?selected=${this._model === "merchants"}>Merchants</option>
          <option value="tags" ?selected=${this._model === "tags"}>Tags</option>
        </select>
      </div>
      <label>Columns:</label>
      <div class="checkbox-list">
        ${availableColumns.map(
          (col) => html`
          <label>
            <input
              type="checkbox"
              ?checked=${this._columns.includes(col.id)}
              @change=${(e: Event) => this.#toggleColumn(col.id, (e.target as HTMLInputElement).checked)}
            />
            ${col.label}
          </label>
        `,
        )}
      </div>
      <button @click=${this.#onSave}>${this.editingTable ? "Update Table" : "Save to Dashboard"}</button>
    `;
  }
}
