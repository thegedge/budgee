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
  private _resizeObserver?: ResizeObserver;

  static styles = css`
    :host {
      display: block;
      position: relative;
    }
    .chart-container {
      position: relative;
      width: 100%;
      height: 100%;
    }
  `;

  render() {
    return html`
      <div class="chart-container">
        <canvas></canvas>
      </div>
    `;
  }

  updated(changed: Map<string, unknown>) {
    if (!this._chart) {
      this.#createChart();
      return;
    }

    if (changed.has("chartType")) {
      this._chart.destroy();
      this.#createChart();
    } else if (changed.has("data") || changed.has("options")) {
      this._chart.data = this.data;
      if (changed.has("options")) {
        this._chart.options = this.options;
      }
      this._chart.update();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._chart?.destroy();
    this._chart = undefined;
  }

  #createChart() {
    const container = this.shadowRoot!.querySelector<HTMLDivElement>(".chart-container")!;
    const canvas = container.querySelector("canvas")!;
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

    this._resizeObserver?.disconnect();
    this._resizeObserver = new ResizeObserver(() => {
      this._chart?.resize();
    });
    this._resizeObserver.observe(container);
  }
}
