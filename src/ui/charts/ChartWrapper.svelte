<script lang="ts">
  import { Chart, type ChartData, type ChartOptions, type ChartType, registerables } from "chart.js";
  import { merge } from "chart.js/helpers";

  Chart.register(...registerables);
  Chart.defaults.animation = false;

  let {
    chartType = "bar" as ChartType,
    data = { labels: [], datasets: [] } as ChartData,
    options = {} as ChartOptions,
    ariaChartLabel = "Chart",
  }: {
    chartType?: ChartType;
    data?: ChartData;
    options?: ChartOptions;
    ariaChartLabel?: string;
  } = $props();

  let canvasEl: HTMLCanvasElement | undefined = $state();
  let chart: Chart | undefined;
  let builtChartType: ChartType | undefined;

  function mergedOptions(): ChartOptions {
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
      options,
    );
  }

  function buildChart(canvas: HTMLCanvasElement, type: ChartType): Chart | undefined {
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;
    Chart.defaults.color = getComputedStyle(document.documentElement)
      .getPropertyValue("--budgee-text")
      .trim();
    const isPie = type === "pie" || type === "doughnut";
    builtChartType = type;
    return new Chart(ctx, {
      type,
      data,
      options: mergedOptions(),
      plugins: isPie
        ? [
            {
              id: "squareChartArea",
              afterLayout(c) {
                const area = c.chartArea;
                const areaWidth = area.right - area.left;
                const areaHeight = area.bottom - area.top;
                if (areaWidth === areaHeight) return;

                const legend = c.legend;
                const legendPos = legend?.position;

                if (areaWidth > areaHeight) {
                  const offset = (areaWidth - areaHeight) / 2;
                  area.left += offset;
                  area.right -= offset;
                  if (legend && legendPos === "right") {
                    legend.left -= offset;
                    legend.right -= offset;
                  } else if (legend && legendPos === "left") {
                    legend.left += offset;
                    legend.right += offset;
                  }
                } else {
                  const offset = (areaHeight - areaWidth) / 2;
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

  // Lifecycle: mount/unmount and resize handling
  $effect(() => {
    if (!canvasEl) return;

    chart = buildChart(canvasEl, chartType);
    const wrapperEl = canvasEl.parentElement!;

    const resizeObserver = new ResizeObserver(() => {
      if (!chart) return;
      const width = wrapperEl.clientWidth;
      const height = wrapperEl.clientHeight;
      if (width === 0 || height === 0) return;
      const dpr = window.devicePixelRatio;
      const canvas = chart.canvas;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      (chart as unknown as { width: number }).width = width;
      (chart as unknown as { height: number }).height = height;
      chart.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      chart.update();
    });
    resizeObserver.observe(wrapperEl);

    return () => {
      resizeObserver.disconnect();
      chart?.destroy();
      chart = undefined;
      builtChartType = undefined;
    };
  });

  // Prop updates: recreate on chartType change, otherwise update in place
  $effect(() => {
    if (!chart || !canvasEl) return;
    if (builtChartType !== chartType) {
      chart.destroy();
      chart = buildChart(canvasEl, chartType);
      return;
    }
    chart.data = data;
    chart.options = mergedOptions();
    chart.update();
  });
</script>

<div class="chart-wrapper">
  <canvas bind:this={canvasEl} aria-label={ariaChartLabel}></canvas>
</div>

<style>
  .chart-wrapper {
    display: block;
    position: relative;
    flex: 1;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }
</style>
