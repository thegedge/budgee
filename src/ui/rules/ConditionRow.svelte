<script lang="ts">
  import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
  import type { RuleCondition, RuleOperator } from "../../database/types";
  import type { Account } from "../../models/Account";
  import AutocompleteInput from "../shared/AutocompleteInput.svelte";
  import "../styles/icon-button.css";
  import "../styles/input.css";

  type RuleField = RuleCondition["field"];

  const FIELDS: { value: RuleField; label: string }[] = [
    { value: "description", label: "description" },
    { value: "account", label: "account" },
  ];

  const OPERATORS: { value: RuleOperator; label: string }[] = [
    { value: "contains", label: "contains" },
    { value: "startsWith", label: "starts with" },
    { value: "equals", label: "equals" },
    { value: "oneOf", label: "one of" },
    { value: "regex", label: "regex" },
  ];

  let { condition, index = 0, accounts = [], onConditionChanged, onConditionRemoved }: {
    condition: RuleCondition;
    index?: number;
    accounts?: Account[];
    onConditionChanged?: (index: number, condition: RuleCondition) => void;
    onConditionRemoved?: (index: number) => void;
  } = $props();

  let multiSelectOpen = $state(false);

  let useAccountAutocomplete = $derived(condition.field === "account" && condition.operator === "equals");
  let useAccountMultiSelect = $derived(condition.field === "account" && condition.operator === "oneOf");
  let accountNames = $derived(accounts.map((a) => a.name));
  let selectedAccounts = $derived(
    new Set(condition.value.split(",").map((v) => v.trim()).filter(Boolean)),
  );

  function onFieldChange(e: Event) {
    onConditionChanged?.(index, { ...condition, field: (e.target as HTMLSelectElement).value as RuleField });
  }

  function onOperatorChange(e: Event) {
    onConditionChanged?.(index, { ...condition, operator: (e.target as HTMLSelectElement).value as RuleOperator });
  }

  function onValueInput(e: Event) {
    onConditionChanged?.(index, { ...condition, value: (e.target as HTMLInputElement).value });
  }

  function onAutocompleteValue(value: string) {
    onConditionChanged?.(index, { ...condition, value });
  }

  function toggleAccount(name: string) {
    const selected = new Set(condition.value.split(",").map((v) => v.trim()).filter(Boolean));
    if (selected.has(name)) selected.delete(name);
    else selected.add(name);
    onConditionChanged?.(index, { ...condition, value: [...selected].join(", ") });
  }

  $effect(() => {
    if (!multiSelectOpen) return;
    function onDocClick(_e: MouseEvent) {
      // Close if clicking outside
      multiSelectOpen = false;
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  });
</script>

<div class="condition-row" role="toolbar" tabindex="-1" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()}>
  <select onchange={onFieldChange}>
    {#each FIELDS as f}
      <option value={f.value} selected={condition.field === f.value}>{f.label}</option>
    {/each}
  </select>
  <select onchange={onOperatorChange}>
    {#each OPERATORS as op}
      <option value={op.value} selected={condition.operator === op.value}>{op.label}</option>
    {/each}
  </select>
  {#if useAccountMultiSelect}
    <div class="multi-select">
      <button type="button" class="multi-select-toggle" onclick={() => { multiSelectOpen = !multiSelectOpen; }}>
        {selectedAccounts.size === 0 ? "select accounts" : `${selectedAccounts.size} account${selectedAccounts.size === 1 ? "" : "s"}`}
        <span class="chevron"><svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
      </button>
      {#if multiSelectOpen}
        <div class="multi-select-dropdown">
          {#each accountNames as name}
            <label class="multi-select-option">
              <input type="checkbox" checked={selectedAccounts.has(name)} onchange={() => toggleAccount(name)} />
              {name}
            </label>
          {/each}
        </div>
      {/if}
    </div>
  {:else if useAccountAutocomplete}
    <AutocompleteInput items={accountNames} value={condition.value} placeholder="account name" dropdown={true} onValueChanged={onAutocompleteValue} />
  {:else}
    <input type="text" placeholder={condition.operator === "oneOf" ? "value1, value2, ..." : "value"} value={condition.value} oninput={onValueInput} />
  {/if}
  <button class="icon-btn icon-btn--danger" title="Remove condition" aria-label="Remove condition" onclick={() => onConditionRemoved?.(index)}>
    {@html trash2Icon}
  </button>
</div>

<style>
  .condition-row { display: contents; }
  select, input { padding: 4px 8px; }
  .multi-select { position: relative; }
  .multi-select-toggle {
    display: flex; align-items: center; gap: 4px;
    padding: 4px 8px; border: 1px solid var(--budgee-border); border-radius: 4px;
    background: var(--budgee-surface); cursor: pointer; color: var(--budgee-text);
    width: 100%; box-sizing: border-box;
  }
  .multi-select-toggle .chevron { margin-left: auto; display: flex; align-items: center; color: var(--budgee-text-muted); }
  .multi-select-toggle .chevron svg { width: 12px; height: 12px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  .multi-select-dropdown {
    position: absolute; top: 100%; left: 0; right: 0;
    background: var(--budgee-surface); border: 1px solid var(--budgee-border);
    border-radius: 0 0 4px 4px; max-height: 150px; overflow-y: auto; z-index: 10; min-width: 180px;
  }
  .multi-select-option { display: flex; align-items: center; gap: 4px; padding: 4px 6px; cursor: pointer; font-size: 0.85rem; }
  .multi-select-option:hover { background: var(--budgee-bg); }
</style>
