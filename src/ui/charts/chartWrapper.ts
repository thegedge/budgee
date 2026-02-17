import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Chart, type ChartData, type ChartOptions, type ChartType, registerables } from "chart.js";

Chart.register(...registerables);

declare global {
  interface HTMLElementTagNameMap {
    "chart-wrapper": ChartWrapper;
  }
}

@customElement("chart-wrapper")
export class ChartWrapper extends LitElement {
  @property({ type: String })
  chartType: ChartType = "bar";

  @property({ type: Object })
  data: ChartData = { labels: [], datasets: [] };

  @property({ type: Object })
  options: ChartOptions = {};

  private _chart?: Chart;

  static styles = css`
    :host {
      display: block;
      position: relative;
    }
  `;

  render() {
    return html`
      <canvas></canvas>
    `;
  }

  firstUpdated() {
    this.#createChart();
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has("data") || changed.has("chartType") || changed.has("options")) {
      if (this._chart) {
        if (changed.has("chartType")) {
          this._chart.destroy();
          this.#createChart();
        } else {
          this._chart.data = this.data;
          if (changed.has("options")) {
            this._chart.options = this.options;
          }
          this._chart.update();
        }
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._chart?.destroy();
    this._chart = undefined;
  }

  #createChart() {
    const canvas = this.shadowRoot!.querySelector("canvas")!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    this._chart = new Chart(ctx, {
      type: this.chartType,
      data: this.data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...this.options,
      },
    });
  }
}
