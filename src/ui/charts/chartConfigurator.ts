import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Granularity } from "../../database/aggregations";
import type { DashboardChart, Merchant, Tag, Transaction } from "../../database/types";

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
  private _endDate = "";

  @state()
  private _tagId?: number;

  @state()
  private _merchantId?: number;

  @state()
  private _colSpan: NonNullable<DashboardChart["colSpan"]> = 1;

  @state()
  private _excludedTagIds: number[] = [];

  @state()
  private _excludedMerchantIds: number[] = [];

  @state()
  private _showExclusions = false;

  @state()
  private _initialized = false;

  static styles = css`
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
      padding: 4px 12px;
      cursor: pointer;
      background-color: var(--budgee-primary);
      color: white;
      border: none;
      border-radius: 4px;
      margin-right: 0.5rem;
    }
    button:hover {
      background-color: var(--budgee-primary-hover);
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
      this._colSpan = this.editingChart.colSpan ?? 1;
      this._excludedTagIds = this.editingChart.excludedTagIds ?? [];
      this._excludedMerchantIds = this.editingChart.excludedMerchantIds ?? [];
      this._initialized = true;
    }
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
          colSpan: this._colSpan,
          excludedTagIds: this._excludedTagIds.length > 0 ? this._excludedTagIds : undefined,
          excludedMerchantIds:
            this._excludedMerchantIds.length > 0 ? this._excludedMerchantIds : undefined,
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
                ?checked=${excludedIds.includes(item.id!)}
                @change=${(e: Event) => this.#toggleExclusion(item.id!, (e.target as HTMLInputElement).checked)}
              />
              ${item.name}
            </label>
          `,
          )}
        </div>
      </details>
    `;
  }

  #toggleExclusion(id: number, excluded: boolean) {
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
        <label>${PIE_TYPES.has(this._chartType) ? "Split by:" : "Granularity:"}</label>
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
              <option value="byTag" ?selected=${this._granularity === "byTag"}>By Tag</option>
              <option value="byMerchant" ?selected=${this._granularity === "byMerchant"}>By Merchant</option>
            `
          }
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
        <label>Size:</label>
        <select @change=${(e: Event) => {
          this._colSpan = Number((e.target as HTMLSelectElement).value) as NonNullable<
            DashboardChart["colSpan"]
          >;
        }}>
          <option value="1" ?selected=${this._colSpan === 1}>1 col</option>
          <option value="2" ?selected=${this._colSpan === 2}>2 col</option>
          <option value="3" ?selected=${this._colSpan === 3}>3 col</option>
          <option value="4" ?selected=${this._colSpan === 4}>4 col</option>
          <option value="5" ?selected=${this._colSpan === 5}>5 col</option>
          <option value="6" ?selected=${this._colSpan === 6}>6 col</option>
        </select>
      </div>
      ${this.#renderExclusions()}
      <button @click=${this.#onSave}>${this.editingChart ? "Update Chart" : "Save to Dashboard"}</button>
    `;
  }
}
