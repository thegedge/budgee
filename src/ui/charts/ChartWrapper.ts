import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Chart, type ChartData, type ChartOptions, type ChartType, registerables } from "chart.js";
import { merge } from "chart.js/helpers";

Chart.register(...registerables);
Chart.defaults.animation = false;

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

  @property({ type: String, attribute: "aria-chart-label" })
  ariaChartLabel = "Chart";

  private _chart?: Chart;
  private _resizeObserver?: ResizeObserver;

  static styles = css`
    :host {
      display: block;
      position: relative;
      flex: 1;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
    }
  `;

  render() {
    return html`
      <canvas aria-label=${this.ariaChartLabel} role="img"></canvas>
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
        this._chart.options = this.#mergedOptions();
      }
      this._chart.update();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver(() => {
      if (!this._chart) return;
      const width = this.clientWidth;
      const height = this.clientHeight;
      if (width === 0 || height === 0) return;
      const dpr = window.devicePixelRatio;
      const canvas = this._chart.canvas;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      (this._chart as unknown as { width: number }).width = width;
      (this._chart as unknown as { height: number }).height = height;
      this._chart.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this._chart.update();
    });
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    this._chart?.destroy();
    this._chart = undefined;
  }

  #createChart() {
    const canvas = this.shadowRoot!.querySelector("canvas")!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    Chart.defaults.color = getComputedStyle(document.documentElement)
      .getPropertyValue("--budgee-text")
      .trim();
    const isPie = this.chartType === "pie" || this.chartType === "doughnut";
    this._chart = new Chart(ctx, {
      type: this.chartType,
      data: this.data,
      options: this.#mergedOptions(),
      plugins: isPie
        ? [
            {
              id: "squareChartArea",
              afterLayout(chart) {
                const area = chart.chartArea;
                const areaWidth = area.right - area.left;
                const areaHeight = area.bottom - area.top;
                if (areaWidth === areaHeight) return;

                const legend = chart.legend;
                const legendPos = legend?.position;

                if (areaWidth > areaHeight) {
                  const excess = areaWidth - areaHeight;
                  const offset = excess / 2;
                  area.left += offset;
                  area.right -= offset;
                  // Shift legend toward center too
                  if (legend && legendPos === "right") {
                    legend.left -= offset;
                    legend.right -= offset;
                  } else if (legend && legendPos === "left") {
                    legend.left += offset;
                    legend.right += offset;
                  }
                } else {
                  const excess = areaHeight - areaWidth;
                  const offset = excess / 2;
                  area.top += offset;
                  area.bottom -= offset;
                  if (legend && legendPos === "bottom") {
                    legend.top -= offset;
                    legend.bottom -= offset;
                  } else if (legend && legendPos === "top") {
                    legend.top += offset;
                    legend.bottom += offset;
                  }
                }
              },
            },
          ]
        : [],
    });
  }

  #mergedOptions(): ChartOptions {
    return merge(
      {
        responsive: false,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            labels: {
              sort: (a, b) => (a.text ?? "").localeCompare(b.text ?? ""),
            },
          },
        },
      } satisfies ChartOptions,
      this.options,
    );
  }
}
