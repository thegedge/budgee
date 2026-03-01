import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Temporal } from "@js-temporal/polyfill";

const OPTIONS = [
  { value: Temporal.Duration.from({ months: 1 }), label: "1M" },
  { value: Temporal.Duration.from({ months: 6 }), label: "6M" },
  { value: Temporal.Duration.from({ years: 1 }), label: "1Y" },
  { value: null, label: "All" },
];

export type TimeRange = Temporal.Duration | null;

export class TimeRangeChangeEvent extends Event {
  timeRange: TimeRange;

  constructor(timeRange: TimeRange) {
    super("time-range-change", { bubbles: true });
    this.timeRange = timeRange;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "time-range-picker": TimeRangePicker;
  }
}

@customElement("time-range-picker")
export class TimeRangePicker extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: normal;
    }
    button {
      background: none;
      border: none;
      padding: 2px 6px;
      border-radius: 4px;
      cursor: pointer;
      color: var(--budgee-text-muted);
    }
    button:hover {
      color: var(--budgee-text);
    }
    button.active {
      color: var(--budgee-text);
      font-weight: 600;
      background: var(--budgee-bg);
    }
  `;

  @property({ attribute: false })
  value: TimeRange = null;

  render() {
    return OPTIONS.map(
      ({ value, label }) =>
        html`<button
          class=${this.#isActive(value) ? "active" : ""}
          @click=${() => this.#select(value)}
        >${label}</button>`,
    );
  }

  #isActive(option: TimeRange): boolean {
    if (this.value === null || option === null) return this.value === option;
    const relativeTo = Temporal.Now.plainDateISO();
    return Temporal.Duration.compare(this.value, option, { relativeTo }) === 0;
  }

  #select(value: TimeRange) {
    this.value = value;
    this.dispatchEvent(new TimeRangeChangeEvent(value));
  }
}
