<script lang="ts">
  import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
  import type {
    ChartFilterCondition,
    ChartFilterField,
    ChartFilterOperator,
  } from "../../database/types";
  import type { Merchant } from "../../models/Merchant";
  import type { Tag } from "../../models/Tag";
  import "../styles/icon-button.css";
  import "../styles/input.css";

  const FIELDS: { value: ChartFilterField; label: string }[] = [
    { value: "tag", label: "Tag" },
    { value: "merchant", label: "Merchant" },
    { value: "amount", label: "Amount" },
    { value: "description", label: "Description" },
  ];

  const OPERATORS_BY_FIELD: Record<
    ChartFilterField,
    { value: ChartFilterOperator; label: string }[]
  > = {
    tag: [
      { value: "is", label: "is" },
      { value: "isNot", label: "is not" },
    ],
    merchant: [
      { value: "is", label: "is" },
      { value: "isNot", label: "is not" },
    ],
    amount: [
      { value: "lt", label: "<" },
      { value: "gt", label: ">" },
      { value: "lte", label: "<=" },
      { value: "gte", label: ">=" },
    ],
    description: [
      { value: "contains", label: "contains" },
      { value: "excludes", label: "excludes" },
    ],
  };

  let {
    condition = { field: "tag", operator: "is", value: "" } as ChartFilterCondition,
    index = 0,
    tags = [] as Tag[],
    merchants = [] as Merchant[],
    onFilterChanged,
    onFilterRemoved,
  }: {
    condition?: ChartFilterCondition;
    index?: number;
    tags?: Tag[];
    merchants?: Merchant[];
    onFilterChanged: (index: number, condition: ChartFilterCondition) => void;
    onFilterRemoved: (index: number) => void;
  } = $props();

  function emit(updated: ChartFilterCondition) {
    onFilterChanged(index, updated);
  }

  function onFieldChange(e: Event) {
    const field = (e.target as HTMLSelectElement).value as ChartFilterField;
    const operators = OPERATORS_BY_FIELD[field];
    emit({ field, operator: operators[0].value, value: "" });
  }

  function onOperatorChange(e: Event) {
    const operator = (e.target as HTMLSelectElement).value as ChartFilterOperator;
    emit({ ...condition, operator });
  }

  function onValueChange(e: Event) {
    const value = (e.target as HTMLSelectElement | HTMLInputElement).value;
    emit({ ...condition, value });
  }

  let operators = $derived(OPERATORS_BY_FIELD[condition.field]);
</script>

<div class="filter-row">
  <select onchange={onFieldChange}>
    {#each FIELDS as f}
      <option value={f.value} selected={condition.field === f.value}>{f.label}</option>
    {/each}
  </select>
  <select onchange={onOperatorChange}>
    {#each operators as op}
      <option value={op.value} selected={condition.operator === op.value}>{op.label}</option>
    {/each}
  </select>
  {#if condition.field === "tag"}
    <select onchange={onValueChange}>
      <option value="">--</option>
      {#each tags as t}
        <option value={t.id} selected={condition.value === t.id}>{t.name}</option>
      {/each}
    </select>
  {:else if condition.field === "merchant"}
    <select onchange={onValueChange}>
      <option value="">--</option>
      {#each merchants as m}
        <option value={m.id} selected={condition.value === m.id}>{m.name}</option>
      {/each}
    </select>
  {:else if condition.field === "amount"}
    <input
      type="number"
      placeholder="e.g. 0"
      value={condition.value}
      oninput={onValueChange}
    />
  {:else}
    <input
      type="text"
      placeholder="value"
      value={condition.value}
      oninput={onValueChange}
    />
  {/if}
  <button
    class="icon-btn icon-btn--danger"
    title="Remove filter"
    aria-label="Remove filter"
    onclick={() => onFilterRemoved(index)}
  >
    {@html trash2Icon}
  </button>
</div>

<style>
  .filter-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 0.25rem;

    & select,
    & input {
      padding: 4px 8px;
    }

    & input {
      flex: 1;
    }
  }
</style>
