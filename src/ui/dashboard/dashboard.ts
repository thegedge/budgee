import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import Sortable from "sortablejs";
import { Accounts } from "../../data/accounts";
import { DashboardCharts } from "../../data/dashboardCharts";
import { DashboardTables } from "../../data/dashboardTables";
import { Merchants } from "../../data/merchants";
import { Tags } from "../../data/tags";
import { Transactions } from "../../data/transactions";
import type {
  Account,
  DashboardChart,
  DashboardTable,
  Merchant,
  Tag,
  Transaction,
} from "../../database/types";
import "../charts/chartConfigurator";
import "../charts/chartWrapper";
import "../shared/modal";
import "../shared/paginatedTable";
import { tableStyles } from "../tableStyles";
import "./dashboardChartCard";
import "./dashboardTableCard";
import "./tableConfigurator";

declare global {
  interface HTMLElementTagNameMap {
    "budgee-dashboard": Dashboard;
  }
}

@customElement("budgee-dashboard")
export class Dashboard extends LitElement {
  @state()
  private _transactions: Transaction[] | null = null;

  @state()
  private _tags: Tag[] = [];

  @state()
  private _merchants: Merchant[] = [];

  @state()
  private _accounts: Account[] = [];

  @state()
  private _charts: DashboardChart[] = [];

  @state()
  private _tables: DashboardTable[] = [];

  @state()
  private _showChartConfigurator = false;

  @state()
  private _editingChart?: DashboardChart;

  @state()
  private _showTableConfigurator = false;

  @state()
  private _editingTable?: DashboardTable;

  private _chartSortable?: Sortable;
  private _tableSortable?: Sortable;

  static styles = [
    tableStyles,
    css`
      :host {
        display: block;
      }
      .card {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      .card h3 {
        margin-top: 0;
      }
      .chart-grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: 200px;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      @media (min-width: 700px) {
        .chart-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      @media (min-width: 1200px) {
        .chart-grid {
          grid-template-columns: repeat(6, 1fr);
        }
      }
      .table-grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: 200px;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      @media (min-width: 700px) {
        .table-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      @media (min-width: 1200px) {
        .table-grid {
          grid-template-columns: repeat(6, 1fr);
        }
      }
      button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        background-color: var(--budgee-primary);
        color: white;
        border: none;
        border-radius: 4px;
        margin-bottom: 1rem;
      }
      button:hover {
        background-color: var(--budgee-primary-hover);
      }
      .button-bar {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.#refresh();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._chartSortable?.destroy();
    this._tableSortable?.destroy();
  }

  updated() {
    this.#initSortable(".chart-grid", "chart", (s) => {
      this._chartSortable = s;
    });
    this.#initSortable(".table-grid", "table", (s) => {
      this._tableSortable = s;
    });
  }

  async #refresh() {
    this._transactions = await Transactions.all();
    this._tags = await Tags.all();
    this._merchants = await Merchants.all();
    this._accounts = await Accounts.all();
    this._charts = await DashboardCharts.all();
    this._tables = await DashboardTables.all();

    if (this._charts.length === 0) {
      await DashboardCharts.create({
        title: "Monthly Overview",
        chartType: "bar",
        granularity: "month",
        colSpan: 6,
        position: 0,
      });
      this._charts = await DashboardCharts.all();
    }
  }

  #initSortable(
    selector: string,
    kind: "chart" | "table",
    setter: (s: Sortable | undefined) => void,
  ) {
    const existing = kind === "chart" ? this._chartSortable : this._tableSortable;
    const grid = this.shadowRoot?.querySelector(selector) as HTMLElement | null;
    if (!grid) {
      existing?.destroy();
      setter(undefined);
      return;
    }

    if (existing?.el === grid) return;

    existing?.destroy();
    setter(
      Sortable.create(grid, {
        animation: 150,
        onEnd: () => this.#persistOrder(kind),
      }),
    );
  }

  async #persistOrder(kind: "chart" | "table") {
    const selector = kind === "chart" ? ".chart-grid" : ".table-grid";
    const attr = kind === "chart" ? "data-chart-id" : "data-table-id";
    const grid = this.shadowRoot?.querySelector(selector);
    if (!grid) return;

    const cards = grid.querySelectorAll(`[${attr}]`);
    const ids: string[] = [];
    cards.forEach((card) => {
      const id = card.getAttribute(attr);
      if (id) ids.push(id);
    });

    if (kind === "chart") {
      await DashboardCharts.reorder(ids);
    } else {
      await DashboardTables.reorder(ids);
    }
    await this.#refresh();
  }

  async #onChartSaved(e: CustomEvent) {
    const detail = e.detail;
    if (detail.id) {
      await DashboardCharts.update(detail.id, {
        title: detail.title,
        chartType: detail.chartType,
        granularity: detail.granularity,
        startDate: detail.startDate,
        endDate: detail.endDate,
        tagId: detail.tagId,
        merchantId: detail.merchantId,
        colSpan: detail.colSpan,
        rowSpan: detail.rowSpan,
        excludedTagIds: detail.excludedTagIds,
        excludedMerchantIds: detail.excludedMerchantIds,
      });
    } else {
      await DashboardCharts.create({
        ...detail,
        position: this._charts.length,
      });
    }
    this._showChartConfigurator = false;
    this._editingChart = undefined;
    await this.#refresh();
  }

  #onChartEdit(e: CustomEvent) {
    this._editingChart = e.detail.chart;
    this._showChartConfigurator = true;
  }

  async #onChartResized(e: CustomEvent) {
    const { id, colSpan, rowSpan } = e.detail;
    await DashboardCharts.update(id, {
      ...(colSpan !== undefined && { colSpan }),
      ...(rowSpan !== undefined && { rowSpan }),
    });
    await this.#refresh();
  }

  async #onChartDeleted(e: CustomEvent) {
    await DashboardCharts.remove(e.detail.id);
    await this.#refresh();
  }

  async #onTableSaved(e: CustomEvent) {
    const detail = e.detail;
    if (detail.id) {
      await DashboardTables.update(detail.id, {
        title: detail.title,
        model: detail.model,
        columns: detail.columns,
        colSpan: detail.colSpan,
        rowSpan: detail.rowSpan,
      });
    } else {
      await DashboardTables.create({
        ...detail,
        position: this._tables.length,
      });
    }
    this._showTableConfigurator = false;
    this._editingTable = undefined;
    await this.#refresh();
  }

  #onTableEdit(e: CustomEvent) {
    this._editingTable = e.detail.table;
    this._showTableConfigurator = true;
  }

  async #onTableResized(e: CustomEvent) {
    const { id, colSpan, rowSpan } = e.detail;
    await DashboardTables.update(id, {
      ...(colSpan !== undefined && { colSpan }),
      ...(rowSpan !== undefined && { rowSpan }),
    });
    await this.#refresh();
  }

  async #onTableDeleted(e: CustomEvent) {
    await DashboardTables.remove(e.detail.id);
    await this.#refresh();
  }

  render() {
    if (this._transactions === null) {
      return html`
        <h3>Dashboard</h3>
        <p>Loading…</p>
      `;
    }

    if (this._transactions.length === 0) {
      return html`
        <h3>Dashboard</h3>
        <p>No transactions to display.</p>
      `;
    }

    return html`
      <h3>Dashboard</h3>

      ${
        this._charts.length > 0
          ? html`
            <div class="chart-grid">
              ${this._charts.map(
                (chart) => html`
                <dashboard-chart-card
                  data-chart-id=${chart.id}
                  style="grid-column: span ${chart.colSpan ?? 1}; grid-row: span ${chart.rowSpan ?? 1}"
                  .config=${chart}
                  .transactions=${this._transactions}
                  .tags=${this._tags}
                  .merchants=${this._merchants}
                  @chart-edit=${this.#onChartEdit}
                  @chart-resized=${this.#onChartResized}
                  @chart-deleted=${this.#onChartDeleted}
                ></dashboard-chart-card>
              `,
              )}
            </div>
          `
          : nothing
      }

      ${
        this._tables.length > 0
          ? html`
            <div class="table-grid">
              ${this._tables.map(
                (table) => html`
                <dashboard-table-card
                  data-table-id=${table.id}
                  style="grid-column: span ${table.colSpan ?? 1}; grid-row: span ${table.rowSpan ?? 1}"
                  .config=${table}
                  .transactions=${this._transactions!}
                  .tags=${this._tags}
                  .merchants=${this._merchants}
                  .accounts=${this._accounts}
                  @table-edit=${this.#onTableEdit}
                  @table-resized=${this.#onTableResized}
                  @table-deleted=${this.#onTableDeleted}
                ></dashboard-table-card>
              `,
              )}
            </div>
          `
          : nothing
      }

      <div class="button-bar">
        <button @click=${() => {
          this._showChartConfigurator = true;
          this._editingChart = undefined;
        }}>
          Add Chart
        </button>
        <button @click=${() => {
          this._showTableConfigurator = true;
          this._editingTable = undefined;
        }}>
          Add Table
        </button>
      </div>

      ${
        this._showChartConfigurator
          ? html`
            <budgee-modal
              heading=${this._editingChart ? "Edit Chart" : "Add Chart"}
              @modal-close=${() => {
                this._showChartConfigurator = false;
                this._editingChart = undefined;
              }}
            >
              <chart-configurator
                .transactions=${this._transactions}
                .tags=${this._tags}
                .merchants=${this._merchants}
                .editingChart=${this._editingChart}
                @chart-saved=${this.#onChartSaved}
              ></chart-configurator>
            </budgee-modal>
          `
          : nothing
      }

      ${
        this._showTableConfigurator
          ? html`
            <budgee-modal
              heading=${this._editingTable ? "Edit Table" : "Add Table"}
              @modal-close=${() => {
                this._showTableConfigurator = false;
                this._editingTable = undefined;
              }}
            >
              <table-configurator
                .editingTable=${this._editingTable}
                @table-saved=${this.#onTableSaved}
              ></table-configurator>
            </budgee-modal>
          `
          : nothing
      }
    `;
  }
}
