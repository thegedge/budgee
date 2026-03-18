<script lang="ts">
  import { Temporal } from "@js-temporal/polyfill";
  import Sortable from "sortablejs";
  import { Account } from "../../models/Account";
  import { DashboardChart } from "../../models/DashboardChart";
  import { DashboardTable } from "../../models/DashboardTable";
  import { Merchant } from "../../models/Merchant";
  import { Tag } from "../../models/Tag";
  import { Transaction } from "../../models/Transaction";
  import type { Granularity } from "../../charting/aggregateBy";
  import { type TimeRange } from "../shared/TimeRangePicker.svelte";
  import { useSubscription } from "../../lib/subscribe.svelte";
  import TimeRangePicker from "../shared/TimeRangePicker.svelte";
  import SkeletonLoader from "../shared/SkeletonLoader.svelte";
  import Modal from "../shared/Modal.svelte";
  import DashboardChartCard from "./DashboardChartCard.svelte";
  import DashboardTableCard from "./DashboardTableCard.svelte";
  import TableConfigurator from "./TableConfigurator.svelte";
  import ChartConfigurator from "../charts/ChartConfigurator.svelte";
  import "../styles/button.css";
  import "../styles/table.css";

  let { columns = 12, rows = 12 }: { columns?: number; rows?: number } = $props();

  let transactions = $state<Transaction[] | null>(null);
  let tags = $state<Tag[]>([]);
  let merchants = $state<Merchant[]>([]);
  let accounts = $state<Account[]>([]);
  let charts = $state<DashboardChart[]>([]);
  let tables = $state<DashboardTable[]>([]);
  let timeRange = $state<TimeRange>(null);

  let showChartConfigurator = $state(false);
  let editingChart = $state<DashboardChart | undefined>(undefined);
  let showTableConfigurator = $state(false);
  let editingTable = $state<DashboardTable | undefined>(undefined);

  let chartGrid = $state<HTMLElement | undefined>(undefined);
  let tableGrid = $state<HTMLElement | undefined>(undefined);
  let chartSortable: Sortable | undefined;
  let tableSortable: Sortable | undefined;

  async function refresh() {
    transactions = await Transaction.all();
    tags = await Tag.all();
    merchants = await Merchant.all();
    accounts = await Account.all();
    charts = await DashboardChart.all();
    tables = await DashboardTable.all();

    if (charts.length === 0) {
      await DashboardChart.create({
        title: "Monthly Overview",
        chartType: "bar",
        granularity: "month",
        colSpan: columns,
        position: 0,
      });
      charts = await DashboardChart.all();
    }
  }

  useSubscription(
    [
      Transaction.subscribe,
      Tag.subscribe,
      Merchant.subscribe,
      Account.subscribe,
      DashboardChart.subscribe,
      DashboardTable.subscribe,
    ],
    refresh,
  );

  let filteredTransactions = $derived.by((): Transaction[] | null => {
    if (transactions === null) return null;
    if (timeRange === null) return transactions;
    const cutoff = Temporal.Now.plainDateISO().subtract(timeRange).toString();
    return transactions.filter((t) => t.date >= cutoff);
  });

  async function persistOrder(kind: "chart" | "table", grid: HTMLElement) {
    const attr = kind === "chart" ? "data-chart-id" : "data-table-id";
    const cards = grid.querySelectorAll(`[${attr}]`);
    const ids: string[] = [];
    cards.forEach((card) => {
      const id = card.getAttribute(attr);
      if (id) ids.push(id);
    });

    if (kind === "chart") {
      await DashboardChart.reorder(ids);
    } else {
      await DashboardTable.reorder(ids);
    }
  }

  $effect(() => {
    if (chartGrid) {
      if (chartSortable?.el === chartGrid) return;
      if (chartSortable?.el?.isConnected) chartSortable.destroy();
      chartSortable = Sortable.create(chartGrid, {
        animation: 150,
        onEnd: () => { if (chartGrid) persistOrder("chart", chartGrid); },
      });
    } else {
      if (chartSortable?.el?.isConnected) chartSortable.destroy();
      chartSortable = undefined;
    }
  });

  $effect(() => {
    if (tableGrid) {
      if (tableSortable?.el === tableGrid) return;
      if (tableSortable?.el?.isConnected) tableSortable.destroy();
      tableSortable = Sortable.create(tableGrid, {
        animation: 150,
        onEnd: () => { if (tableGrid) persistOrder("table", tableGrid); },
      });
    } else {
      if (tableSortable?.el?.isConnected) tableSortable.destroy();
      tableSortable = undefined;
    }
  });

  async function onChartSaved(detail: {
    id?: string;
    title: string;
    chartType: DashboardChart["chartType"];
    granularity: Granularity;
    legendPosition?: DashboardChart["legendPosition"];
    filters?: DashboardChart["filters"];
  }) {
    const chartData = $state.snapshot(detail);
    if (chartData.id) {
      await DashboardChart.update(chartData.id, {
        title: chartData.title,
        chartType: chartData.chartType,
        granularity: chartData.granularity as DashboardChart["granularity"],
        legendPosition: chartData.legendPosition,
        filters: chartData.filters,
      });
    } else {
      await DashboardChart.create({
        title: chartData.title,
        chartType: chartData.chartType,
        granularity: chartData.granularity as DashboardChart["granularity"],
        legendPosition: chartData.legendPosition,
        filters: chartData.filters,
        colSpan: columns,
        position: charts.length,
      });
    }
    showChartConfigurator = false;
    editingChart = undefined;
  }

  async function onTableSaved(detail: {
    id?: string;
    title: string;
    model: DashboardTable["model"];
    columns: DashboardTable["columns"];
  }) {
    const tableData = $state.snapshot(detail);
    if (tableData.id) {
      await DashboardTable.update(tableData.id, {
        title: tableData.title,
        model: tableData.model,
        columns: tableData.columns,
      });
    } else {
      await DashboardTable.create({
        ...tableData,
        position: tables.length,
      });
    }
    showTableConfigurator = false;
    editingTable = undefined;
  }

  async function onChartResized(id: string, update: { colSpan?: number; rowSpan?: number }) {
    await DashboardChart.update(id, {
      ...(update.colSpan !== undefined && { colSpan: update.colSpan }),
      ...(update.rowSpan !== undefined && { rowSpan: update.rowSpan }),
    });
  }

  async function onChartDeleted(id: string) {
    await DashboardChart.remove(id);
  }

  async function onTableResized(id: string, update: { colSpan?: number; rowSpan?: number }) {
    await DashboardTable.update(id, {
      ...(update.colSpan !== undefined && { colSpan: update.colSpan }),
      ...(update.rowSpan !== undefined && { rowSpan: update.rowSpan }),
    });
  }

  async function onTableDeleted(id: string) {
    await DashboardTable.remove(id);
  }
</script>

<div
  class="dashboard"
  style="--grid-columns: {columns}; --grid-row-height: {800 / rows}px"
>
  {#if transactions === null}
    <SkeletonLoader variant="card" rows={3} />
    <SkeletonLoader variant="table" rows={5} />
  {:else if transactions.length === 0}
    <h3>Dashboard</h3>
    <p>No transactions to display.</p>
  {:else}
    <div class="dashboard-header">
      <TimeRangePicker value={timeRange} onTimeRangeChange={(r) => { timeRange = r; }} />
    </div>

    {#if charts.length > 0}
      <div class="chart-grid" bind:this={chartGrid}>
        {#each charts as chart (chart.id)}
          <div data-chart-id={chart.id} style="grid-column: span {chart.colSpan ?? 1}; grid-row: span {chart.rowSpan ?? 1}">
            <DashboardChartCard
              config={chart}
              maxColumns={columns}
              maxRows={rows}
              transactions={filteredTransactions}
              {tags}
              {merchants}
              onChartEdit={(c) => { editingChart = c; showChartConfigurator = true; }}
              {onChartResized}
              {onChartDeleted}
            />
          </div>
        {/each}
      </div>
    {/if}

    {#if tables.length > 0}
      <div class="table-grid" bind:this={tableGrid}>
        {#each tables as table (table.id)}
          <div data-table-id={table.id} style="grid-column: span {table.colSpan ?? 1}; grid-row: span {table.rowSpan ?? 1}">
            <DashboardTableCard
              config={table}
              maxColumns={columns}
              maxRows={rows}
              transactions={transactions}
              {tags}
              {merchants}
              {accounts}
              onTableEdit={(t) => { editingTable = t; showTableConfigurator = true; }}
              {onTableResized}
              {onTableDeleted}
            />
          </div>
        {/each}
      </div>
    {/if}

    <div class="button-bar">
      <button onclick={() => { showChartConfigurator = true; editingChart = undefined; }}>
        Add Chart
      </button>
      <button onclick={() => { showTableConfigurator = true; editingTable = undefined; }}>
        Add Table
      </button>
    </div>

    {#if showChartConfigurator}
      <Modal
        heading={editingChart ? "Edit Chart" : "Add Chart"}
        onClose={() => { showChartConfigurator = false; editingChart = undefined; }}
      >
        <ChartConfigurator
          transactions={transactions ?? []}
          {tags}
          {merchants}
          {editingChart}
          {onChartSaved}
        />
      </Modal>
    {/if}

    {#if showTableConfigurator}
      <Modal
        heading={editingTable ? "Edit Table" : "Add Table"}
        onClose={() => { showTableConfigurator = false; editingTable = undefined; }}
      >
        <TableConfigurator
          {editingTable}
          onTableSaved={onTableSaved}
        />
      </Modal>
    {/if}
  {/if}
</div>

<style>
  .dashboard {
    display: block;
  }

  .chart-grid,
  .table-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: var(--grid-row-height);
    gap: 1rem;
    margin-bottom: 1rem;
  }

  @media (min-width: 700px) {
    .chart-grid,
    .table-grid {
      grid-template-columns: repeat(calc(var(--grid-columns) / 2), 1fr);
    }
  }

  @media (min-width: 1200px) {
    .chart-grid,
    .table-grid {
      grid-template-columns: repeat(var(--grid-columns), 1fr);
    }
  }

  button {
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
  }

  .dashboard-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
  }

  .button-bar {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
</style>
