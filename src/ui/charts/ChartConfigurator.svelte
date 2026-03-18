<script lang="ts">
  import type { Granularity } from "../../charting/aggregateBy";
  import type { ChartFilterCondition } from "../../database/types";
  import type { DashboardChart } from "../../models/DashboardChart";
  import type { Merchant } from "../../models/Merchant";
  import type { Tag } from "../../models/Tag";
  import type { Transaction } from "../../models/Transaction";
  import "../styles/button.css";
  import "../styles/input.css";
  import ChartFilterRow from "./ChartFilterRow.svelte";

  type ChartKind = DashboardChart["chartType"];

  const PIE_TYPES: ReadonlySet<ChartKind> = new Set(["pie", "doughnut"]);

  let {
    transactions: _transactions = [] as Transaction[],
    tags = [] as Tag[],
    merchants = [] as Merchant[],
    editingChart = undefined as DashboardChart | undefined,
    onChartSaved,
  }: {
    transactions?: Transaction[];
    tags?: Tag[];
    merchants?: Merchant[];
    editingChart?: DashboardChart;
    onChartSaved: (chart: {
      id?: string;
      title: string;
      chartType: ChartKind;
      granularity: Granularity;
      legendPosition: NonNullable<DashboardChart["legendPosition"]>;
      filters?: ChartFilterCondition[];
    }) => void;
  } = $props();

  let title = $state("");
  let chartType = $state<ChartKind>("bar");
  let granularity = $state<Granularity>("month");
  let filters = $state<ChartFilterCondition[]>([]);
  let excludedTagIds = $state<string[]>([]);
  let excludedMerchantIds = $state<string[]>([]);
  let legendPosition = $state<NonNullable<DashboardChart["legendPosition"]>>("top");
  let showExclusions = $state(false);
  let initialized = $state(false);

  $effect(() => {
    if (editingChart && !initialized) {
      title = editingChart.title;
      chartType = editingChart.chartType;
      granularity = editingChart.granularity;
      const allFilters = editingChart.filters ?? [];
      filters = allFilters.filter(
        (f) => !(f.operator === "isNot" && (f.field === "tag" || f.field === "merchant")),
      );
      excludedTagIds = allFilters
        .filter((f) => f.field === "tag" && f.operator === "isNot")
        .map((f) => f.value);
      excludedMerchantIds = allFilters
        .filter((f) => f.field === "merchant" && f.operator === "isNot")
        .map((f) => f.value);
      legendPosition = editingChart.legendPosition ?? "top";
      initialized = true;
    }
  });

  function onFilterChanged(index: number, condition: ChartFilterCondition) {
    filters = filters.map((f, i) => (i === index ? condition : f));
  }

  function onFilterRemoved(index: number) {
    filters = filters.filter((_, i) => i !== index);
  }

  function addFilter() {
    filters = [...filters, { field: "tag", operator: "is", value: "" }];
  }

  function onChartTypeChange(e: Event) {
    const next = (e.target as HTMLSelectElement).value as ChartKind;
    chartType = next;
    if (PIE_TYPES.has(next) && !["byTag", "byMerchant", "month"].includes(granularity)) {
      granularity = "byTag";
    }
  }

  function toggleExclusion(id: string, excluded: boolean) {
    if (granularity === "byTag") {
      excludedTagIds = excluded
        ? [...excludedTagIds, id]
        : excludedTagIds.filter((i) => i !== id);
    } else {
      excludedMerchantIds = excluded
        ? [...excludedMerchantIds, id]
        : excludedMerchantIds.filter((i) => i !== id);
    }
  }

  function onSave() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const validFilters: ChartFilterCondition[] = filters.filter((f) => f.value.trim());
    for (const id of excludedTagIds) {
      validFilters.push({ field: "tag", operator: "isNot", value: id });
    }
    for (const id of excludedMerchantIds) {
      validFilters.push({ field: "merchant", operator: "isNot", value: id });
    }

    onChartSaved({
      id: editingChart?.id,
      title: trimmedTitle,
      chartType,
      granularity,
      legendPosition,
      filters: validFilters.length > 0 ? validFilters : undefined,
    });

    title = "";
    initialized = false;
  }

  let exclusionItems = $derived(granularity === "byTag" ? tags : merchants);
  let excludedIds = $derived(granularity === "byTag" ? excludedTagIds : excludedMerchantIds);
  let exclusionLabel = $derived(granularity === "byTag" ? "tags" : "merchants");
  let showExclusionsPanel = $derived(
    granularity === "byTag" || granularity === "byMerchant",
  );
</script>

<div class="configurator">
  <h4>{editingChart ? "Edit Chart" : "Add Chart"}</h4>
  <div class="form-grid">
    <label for="cc-title">Title:</label>
    <input
      id="cc-title"
      type="text"
      value={title}
      oninput={(e) => { title = (e.target as HTMLInputElement).value; }}
    />
    <label for="cc-chart-type">Type:</label>
    <select id="cc-chart-type" onchange={onChartTypeChange}>
      <option value="bar" selected={chartType === "bar"}>Bar</option>
      <option value="line" selected={chartType === "line"}>Line</option>
      <option value="pie" selected={chartType === "pie"}>Pie</option>
      <option value="doughnut" selected={chartType === "doughnut"}>Doughnut</option>
    </select>
    <label for="cc-granularity">{PIE_TYPES.has(chartType) ? "Split by:" : "Group by:"}</label>
    <select id="cc-granularity" onchange={(e) => { granularity = (e.target as HTMLSelectElement).value as Granularity; }}>
      {#if PIE_TYPES.has(chartType)}
        <option value="byTag" selected={granularity === "byTag"}>Tag</option>
        <option value="byMerchant" selected={granularity === "byMerchant"}>Merchant</option>
        <option value="month" selected={granularity === "month"}>Month</option>
      {:else}
        <option value="day" selected={granularity === "day"}>Day</option>
        <option value="month" selected={granularity === "month"}>Month</option>
        <option value="year" selected={granularity === "year"}>Year</option>
        <option value="byTag" selected={granularity === "byTag"}>Tag</option>
        <option value="byMerchant" selected={granularity === "byMerchant"}>Merchant</option>
      {/if}
    </select>
  </div>
  <div class="filters">
    {#each filters as condition, i}
      <ChartFilterRow
        {condition}
        index={i}
        {tags}
        {merchants}
        {onFilterChanged}
        {onFilterRemoved}
      />
    {/each}
    <button class="add-filter" onclick={addFilter}>+ Add filter</button>
  </div>
  <div class="form-grid">
    <label for="cc-legend">Legend:</label>
    <select id="cc-legend" onchange={(e) => { legendPosition = (e.target as HTMLSelectElement).value as NonNullable<DashboardChart["legendPosition"]>; }}>
      <option value="top" selected={legendPosition === "top"}>Top</option>
      <option value="bottom" selected={legendPosition === "bottom"}>Bottom</option>
      <option value="left" selected={legendPosition === "left"}>Left</option>
      <option value="right" selected={legendPosition === "right"}>Right</option>
      <option value="hidden" selected={legendPosition === "hidden"}>Hidden</option>
    </select>
  </div>
  {#if showExclusionsPanel}
    <details
      class="exclusions"
      open={showExclusions}
      ontoggle={(e) => { showExclusions = (e.target as HTMLDetailsElement).open; }}
    >
      <summary>Exclude {exclusionLabel}</summary>
      <div class="checkbox-list">
        {#each exclusionItems as item}
          <label>
            <input
              type="checkbox"
              checked={excludedIds.includes(item.id)}
              onchange={(e) => toggleExclusion(item.id, (e.target as HTMLInputElement).checked)}
            />
            {item.name}
          </label>
        {/each}
      </div>
    </details>
  {/if}
  <button onclick={onSave}>{editingChart ? "Update Chart" : "Save to Dashboard"}</button>
</div>

<style>
  .configurator {
    display: block;
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    background: var(--budgee-surface);

    & h4 {
      margin-top: 0;
    }
  }

  .form-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 1rem;

    & input,
    & select {
      padding: 4px 8px;
    }
  }

  button {
    margin-right: 0.5rem;
  }

  .exclusions {
    margin-bottom: 1rem;

    & summary {
      cursor: pointer;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
  }

  .checkbox-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1rem;
    max-height: 200px;
    overflow-y: auto;

    & label {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.9rem;
    }
  }

  .filters {
    margin-bottom: 1rem;
  }

  .add-filter {
    font-size: 0.85rem;
  }
</style>
