import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

const OPTIONS = [
  { value: 1, label: "1M" },
  { value: 6, label: "6M" },
  { value: 12, label: "1Y" },
  { value: 0, label: "All" },
];

export type TimeRange = (typeof OPTIONS)[number]["value"];

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

  @property({ type: Number })
  value: TimeRange = 0;

  render() {
    return OPTIONS.map(
      ({ value, label }) =>
        html`<button
          class=${this.value === value ? "active" : ""}
          @click=${() => this.#select(value)}
        >${label}</button>`,
    );
  }

  #select(value: TimeRange) {
    this.value = value;
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }
}
