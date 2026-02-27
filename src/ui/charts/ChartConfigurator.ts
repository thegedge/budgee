import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { buttonStyles } from "../buttonStyles";
import type { Granularity } from "../../database/aggregations";
import type {
  ChartFilterCondition,
  DashboardChart,
  Merchant,
  Tag,
  Transaction,
} from "../../database/types";
import "./ChartFilterRow";

declare global {
  interface HTMLElementTagNameMap {
    "chart-configurator": ChartConfigurator;
  }
}

type ChartKind = DashboardChart["chartType"];

const PIE_TYPES: ReadonlySet<ChartKind> = new Set(["pie", "doughnut"]);

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
  private _filters: ChartFilterCondition[] = [];

  @state()
  private _excludedTagIds: string[] = [];

  @state()
  private _excludedMerchantIds: string[] = [];

  @state()
  private _legendPosition: NonNullable<DashboardChart["legendPosition"]> = "top";

  @state()
  private _showExclusions = false;

  @state()
  private _initialized = false;

  static styles = [
    buttonStyles,
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
        margin-bottom: 1rem;
      }
      input,
      select {
        padding: 4px 8px;
      }
      button {
        margin-right: 0.5rem;
      }
      .exclusions {
        margin-bottom: 1rem;
      }
      .exclusions summary {
        cursor: pointer;
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
      .checkbox-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem 1rem;
        max-height: 200px;
        overflow-y: auto;
      }
      .checkbox-list label {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.9rem;
      }
      .filters {
        margin-bottom: 1rem;
      }
      .add-filter {
        font-size: 0.85rem;
      }
    `,
  ];

  updated(changed: Map<string, unknown>) {
    if (changed.has("editingChart") && this.editingChart && !this._initialized) {
      this._title = this.editingChart.title;
      this._chartType = this.editingChart.chartType;
      this._granularity = this.editingChart.granularity;
      this._startDate = this.editingChart.startDate ?? "";
      this._filters = this.editingChart.filters ?? this.#migrateToFilters(this.editingChart);
      this._excludedTagIds = this.editingChart.excludedTagIds ?? [];
      this._excludedMerchantIds = this.editingChart.excludedMerchantIds ?? [];
      this._legendPosition = this.editingChart.legendPosition ?? "top";
      this._initialized = true;
    }
  }

  #migrateToFilters(chart: DashboardChart): ChartFilterCondition[] {
    const filters: ChartFilterCondition[] = [];
    if (chart.tagId) filters.push({ field: "tag", operator: "is", value: chart.tagId });
    if (chart.merchantId)
      filters.push({ field: "merchant", operator: "is", value: chart.merchantId });
    if (chart.direction === "debit") filters.push({ field: "amount", operator: "lt", value: "0" });
    else if (chart.direction === "credit")
      filters.push({ field: "amount", operator: "gt", value: "0" });
    if (chart.descriptionFilter) {
      filters.push({
        field: "description",
        operator: chart.descriptionFilterMode === "include" ? "contains" : "excludes",
        value: chart.descriptionFilter,
      });
    }
    return filters;
  }

  #onFilterChanged(e: CustomEvent) {
    const { index, condition } = e.detail as { index: number; condition: ChartFilterCondition };
    this._filters = this._filters.map((f, i) => (i === index ? condition : f));
  }

  #onFilterRemoved(e: CustomEvent) {
    const { index } = e.detail as { index: number };
    this._filters = this._filters.filter((_, i) => i !== index);
  }

  #addFilter() {
    this._filters = [...this._filters, { field: "tag", operator: "is", value: "" }];
  }

  #onSave() {
    const title = this._title.trim();
    if (!title) return;

    const validFilters = this._filters.filter((f) => f.value.trim());

    this.dispatchEvent(
      new CustomEvent("chart-saved", {
        detail: {
          id: this.editingChart?.id,
          title,
          chartType: this._chartType,
          granularity: this._granularity,
          startDate: this._startDate || undefined,
          excludedTagIds: this._excludedTagIds.length > 0 ? this._excludedTagIds : undefined,
          excludedMerchantIds:
            this._excludedMerchantIds.length > 0 ? this._excludedMerchantIds : undefined,
          legendPosition: this._legendPosition,
          filters: validFilters.length > 0 ? validFilters : undefined,
        },
      }),
    );

    this._title = "";
    this._initialized = false;
  }

  #renderExclusions() {
    if (this._granularity !== "byTag" && this._granularity !== "byMerchant") return "";

    const items = this._granularity === "byTag" ? this.tags : this.merchants;
    const excludedIds =
      this._granularity === "byTag" ? this._excludedTagIds : this._excludedMerchantIds;
    const label = this._granularity === "byTag" ? "tags" : "merchants";

    return html`
      <details class="exclusions" ?open=${this._showExclusions} @toggle=${(e: Event) => {
        this._showExclusions = (e.target as HTMLDetailsElement).open;
      }}>
        <summary>Exclude ${label}</summary>
        <div class="checkbox-list">
          ${items.map(
            (item) => html`
            <label>
              <input
                type="checkbox"
                ?checked=${excludedIds.includes(item.id)}
                @change=${(e: Event) => this.#toggleExclusion(item.id, (e.target as HTMLInputElement).checked)}
              />
              ${item.name}
            </label>
          `,
          )}
        </div>
      </details>
    `;
  }

  #toggleExclusion(id: string, excluded: boolean) {
    if (this._granularity === "byTag") {
      this._excludedTagIds = excluded
        ? [...this._excludedTagIds, id]
        : this._excludedTagIds.filter((i) => i !== id);
    } else {
      this._excludedMerchantIds = excluded
        ? [...this._excludedMerchantIds, id]
        : this._excludedMerchantIds.filter((i) => i !== id);
    }
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
          if (
            PIE_TYPES.has(this._chartType) &&
            !["byTag", "byMerchant", "month"].includes(this._granularity)
          ) {
            this._granularity = "byTag";
          }
        }}>
          <option value="bar" ?selected=${this._chartType === "bar"}>Bar</option>
          <option value="line" ?selected=${this._chartType === "line"}>Line</option>
          <option value="pie" ?selected=${this._chartType === "pie"}>Pie</option>
          <option value="doughnut" ?selected=${this._chartType === "doughnut"}>Doughnut</option>
        </select>
        <label>${PIE_TYPES.has(this._chartType) ? "Split by:" : "Group by:"}</label>
        <select @change=${(e: Event) => {
          this._granularity = (e.target as HTMLSelectElement).value as Granularity;
        }}>
          ${
            PIE_TYPES.has(this._chartType)
              ? html`
              <option value="byTag" ?selected=${this._granularity === "byTag"}>Tag</option>
              <option value="byMerchant" ?selected=${this._granularity === "byMerchant"}>Merchant</option>
              <option value="month" ?selected=${this._granularity === "month"}>Month</option>
            `
              : html`
              <option value="day" ?selected=${this._granularity === "day"}>Day</option>
              <option value="month" ?selected=${this._granularity === "month"}>Month</option>
              <option value="year" ?selected=${this._granularity === "year"}>Year</option>
              <option value="byTag" ?selected=${this._granularity === "byTag"}>Tag</option>
              <option value="byMerchant" ?selected=${this._granularity === "byMerchant"}>Merchant</option>
            `
          }
        </select>
        <label>Start date:</label>
        <input
          type="text"
          placeholder="e.g. 3 months ago"
          .value=${this._startDate}
          @input=${(e: Event) => {
            this._startDate = (e.target as HTMLInputElement).value;
          }}
        />
      </div>
      <div class="filters">
        ${this._filters.map(
          (condition, i) => html`
          <chart-filter-row
            .condition=${condition}
            .index=${i}
            .tags=${this.tags}
            .merchants=${this.merchants}
            @filter-changed=${this.#onFilterChanged}
            @filter-removed=${this.#onFilterRemoved}
          ></chart-filter-row>
        `,
        )}
        <button class="add-filter" @click=${this.#addFilter}>+ Add filter</button>
      </div>
      <div class="form-grid">
        <label>Legend:</label>
        <select @change=${(e: Event) => {
          this._legendPosition = (e.target as HTMLSelectElement).value as NonNullable<
            DashboardChart["legendPosition"]
          >;
        }}>
          <option value="top" ?selected=${this._legendPosition === "top"}>Top</option>
          <option value="bottom" ?selected=${this._legendPosition === "bottom"}>Bottom</option>
          <option value="left" ?selected=${this._legendPosition === "left"}>Left</option>
          <option value="right" ?selected=${this._legendPosition === "right"}>Right</option>
          <option value="hidden" ?selected=${this._legendPosition === "hidden"}>Hidden</option>
        </select>
      </div>
      ${this.#renderExclusions()}
      <button @click=${this.#onSave}>${this.editingChart ? "Update Chart" : "Save to Dashboard"}</button>
    `;
  }
}
