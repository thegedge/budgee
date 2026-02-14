import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { aggregateByPeriod, filterTransactions } from "../../database/aggregations";
import type { Granularity } from "../../database/aggregations";
import type { DashboardChart, Merchant, Tag, Transaction } from "../../database/types";
import type { ChartData } from "chart.js";
import "./chartWrapper";

declare global {
  interface HTMLElementTagNameMap {
    "chart-configurator": ChartConfigurator;
  }
}

type ChartKind = DashboardChart["chartType"];

@customElement("chart-configurator")
export class ChartConfigurator extends LitElement {
  @property({ type: Array })
  transactions: Transaction[] = [];

  @property({ type: Array })
  tags: Tag[] = [];

  @property({ type: Array })
  merchants: Merchant[] = [];

  @property({ type: Object })
  editingChart?: DashboardChart;

  @state()
  private _title = "";

  @state()
  private _chartType: ChartKind = "bar";

  @state()
  private _granularity: Granularity = "month";

  @state()
  private _startDate = "";

  @state()
  private _endDate = "";

  @state()
  private _tagId?: number;

  @state()
  private _merchantId?: number;

  @state()
  private _showPreview = false;

  @state()
  private _initialized = false;

  static styles = css`
    :host {
      display: block;
      border: 1px solid var(--budgee-border, #e0e0e0);
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      background: var(--budgee-surface, #fff);
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
      padding: 4px 12px;
      cursor: pointer;
      background-color: var(--budgee-primary, #7eb8da);
      color: white;
      border: none;
      border-radius: 4px;
      margin-right: 0.5rem;
    }
    button:hover {
      background-color: var(--budgee-primary-hover, #5a9cbf);
    }
    .preview {
      margin-top: 1rem;
    }
  `;

  updated(changed: Map<string, unknown>) {
    if (changed.has("editingChart") && this.editingChart && !this._initialized) {
      this._title = this.editingChart.title;
      this._chartType = this.editingChart.chartType;
      this._granularity = this.editingChart.granularity;
      this._startDate = this.editingChart.startDate ?? "";
      this._endDate = this.editingChart.endDate ?? "";
      this._tagId = this.editingChart.tagId;
      this._merchantId = this.editingChart.merchantId;
      this._initialized = true;
    }
  }

  get #chartData(): ChartData {
    const filtered = filterTransactions(this.transactions, {
      tagId: this._tagId,
      merchantId: this._merchantId,
      startDate: this._startDate || undefined,
      endDate: this._endDate || undefined,
    });

    const aggregated = aggregateByPeriod(filtered, this._granularity);
    const entries = [...aggregated.entries()].sort(([a], [b]) => a.localeCompare(b));

    return {
      labels: entries.map(([key]) => key),
      datasets: [
        {
          label: this._title || "Amount",
          data: entries.map(([, val]) => val),
          backgroundColor: "rgba(126, 184, 218, 0.5)",
          borderColor: "#7eb8da",
          borderWidth: 1,
        },
      ],
    };
  }

  #onSave() {
    const title = this._title.trim();
    if (!title) return;

    this.dispatchEvent(
      new CustomEvent("chart-saved", {
        detail: {
          id: this.editingChart?.id,
          title,
          chartType: this._chartType,
          granularity: this._granularity,
          startDate: this._startDate || undefined,
          endDate: this._endDate || undefined,
          tagId: this._tagId,
          merchantId: this._merchantId,
        },
      }),
    );

    this._title = "";
    this._showPreview = false;
    this._initialized = false;
  }

  render() {
    return html`
      <h4>${this.editingChart ? "Edit Chart" : "Add Chart"}</h4>
      <div class="form-grid">
        <label>Title:</label>
        <input
          type="text"
          .value=${this._title}
          @input=${(e: Event) => {
            this._title = (e.target as HTMLInputElement).value;
          }}
        />
        <label>Type:</label>
        <select @change=${(e: Event) => {
          this._chartType = (e.target as HTMLSelectElement).value as ChartKind;
        }}>
          <option value="bar" ?selected=${this._chartType === "bar"}>Bar</option>
          <option value="line" ?selected=${this._chartType === "line"}>Line</option>
          <option value="pie" ?selected=${this._chartType === "pie"}>Pie</option>
          <option value="doughnut" ?selected=${this._chartType === "doughnut"}>Doughnut</option>
        </select>
        <label>Granularity:</label>
        <select @change=${(e: Event) => {
          this._granularity = (e.target as HTMLSelectElement).value as Granularity;
        }}>
          <option value="day" ?selected=${this._granularity === "day"}>Day</option>
          <option value="month" ?selected=${this._granularity === "month"}>Month</option>
          <option value="year" ?selected=${this._granularity === "year"}>Year</option>
        </select>
        <label>Start date:</label>
        <input
          type="date"
          .value=${this._startDate}
          @input=${(e: Event) => {
            this._startDate = (e.target as HTMLInputElement).value;
          }}
        />
        <label>End date:</label>
        <input
          type="date"
          .value=${this._endDate}
          @input=${(e: Event) => {
            this._endDate = (e.target as HTMLInputElement).value;
          }}
        />
        <label>Tag:</label>
        <select @change=${(e: Event) => {
          const v = (e.target as HTMLSelectElement).value;
          this._tagId = v ? Number(v) : undefined;
        }}>
          <option value="">All</option>
          ${this.tags.map((t) => html`<option value=${t.id!} ?selected=${this._tagId === t.id}>${t.name}</option>`)}
        </select>
        <label>Merchant:</label>
        <select @change=${(e: Event) => {
          const v = (e.target as HTMLSelectElement).value;
          this._merchantId = v ? Number(v) : undefined;
        }}>
          <option value="">All</option>
          ${this.merchants.map((m) => html`<option value=${m.id!} ?selected=${this._merchantId === m.id}>${m.name}</option>`)}
        </select>
      </div>
      <button @click=${() => {
        this._showPreview = true;
      }}>Preview</button>
      <button @click=${this.#onSave}>${this.editingChart ? "Update Chart" : "Save to Dashboard"}</button>
      ${
        this._showPreview
          ? html`
            <div class="preview">
              <chart-wrapper
                .chartType=${this._chartType}
                .data=${this.#chartData}
              ></chart-wrapper>
            </div>
          `
          : ""
      }
    `;
  }
}
