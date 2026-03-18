<script lang="ts">
  import type { RuleCondition } from "../../database/types";
  import { Account } from "../../models/Account";
  import type { Merchant } from "../../models/Merchant";
  import { MerchantRule, prepareTransaction } from "../../models/MerchantRule";
  import type { Tag } from "../../models/Tag";
  import { Transaction } from "../../models/Transaction";
  import { debounce } from "../../debounce";
  import { extractMerchant } from "../../import/extractMerchant";
  import MerchantAutocomplete from "../merchants/MerchantAutocomplete.svelte";
  import TagAutocomplete from "../tags/TagAutocomplete.svelte";
  import TagPills from "../tags/TagPills.svelte";
  import ConditionRow from "./ConditionRow.svelte";
  import "../styles/button.css";
  import "../styles/input.css";

  let { tags = [], merchants = [], rules = [], accounts = [], prefillDescription = "", editingRule = null, editingMerchantName = "", onRuleSaved, onRuleMerge }: {
    tags?: Tag[];
    merchants?: Merchant[];
    rules?: MerchantRule[];
    accounts?: Account[];
    prefillDescription?: string;
    editingRule?: MerchantRule | null;
    editingMerchantName?: string;
    onRuleSaved?: (detail: Record<string, unknown>) => void;
    onRuleMerge?: (detail: Record<string, unknown>) => void;
  } = $props();

  let prefillPristine = $state(false);
  let logic = $state<"and" | "or">("or");
  let conditions = $state<RuleCondition[]>([{ field: "description", operator: "equals", value: "" }]);
  let selectedTagIds = $state<string[]>([]);
  let merchantName = $state("");
  let pendingTagNames = $state<string[]>([]);
  let previewCount = $state<number | null>(null);

  const debouncedPreview = debounce(() => computePreview(), 300);

  async function computePreview() {
    const valid = validConditions();
    if (valid.length === 0) { previewCount = null; return; }
    const rule = new MerchantRule({ id: "", logic, conditions: valid, tagIds: [] });
    const transactions = await Transaction.all();
    const accountMap = Account.toLookup(accounts);
    let count = 0;
    for (const tx of transactions) {
      if (rule.matches(prepareTransaction(tx, accountMap))) count++;
    }
    previewCount = count;
  }

  $effect(() => {
    if (editingRule) {
      conditions = [...editingRule.conditions];
      logic = editingRule.logic;
      selectedTagIds = [...editingRule.tagIds];
      merchantName = editingMerchantName;
      pendingTagNames = [];
    } else if (prefillDescription) {
      conditions = [{ field: "description", operator: "equals", value: prefillDescription }];
      logic = "or";
      merchantName = extractMerchant(prefillDescription);
      prefillPristine = true;
      pendingTagNames = [];
    }
    // Defer preview to avoid reading conditions in the same effect that writes it
    debouncedPreview();
  });

  function onConditionChanged(index: number, condition: RuleCondition) {
    let updated = condition;
    if (prefillPristine && index === 0 && condition.operator === "equals" && condition.value !== conditions[0]?.value) {
      updated = { ...condition, operator: "contains" };
      prefillPristine = false;
    }
    conditions = conditions.map((c, i) => (i === index ? updated : c));
    debouncedPreview();
  }

  function onConditionRemoved(index: number) {
    conditions = conditions.filter((_, i) => i !== index);
    debouncedPreview();
  }

  function addCondition() {
    conditions = [...conditions, { field: "description", operator: "equals", value: "" }];
  }

  function onTagSelected(tag: Tag) {
    if (!selectedTagIds.includes(tag.id)) selectedTagIds = [...selectedTagIds, tag.id];
  }

  function onTagCreated(name: string) {
    if (!pendingTagNames.includes(name)) pendingTagNames = [...pendingTagNames, name];
  }

  function removeTag(tagId: string) { selectedTagIds = selectedTagIds.filter((id) => id !== tagId); }
  function removePendingTag(name: string) { pendingTagNames = pendingTagNames.filter((n) => n !== name); }

  function hasAction() {
    return merchantName.trim() !== "" || selectedTagIds.length > 0 || pendingTagNames.length > 0;
  }

  function validConditions() { return conditions.filter((c) => c.value.trim()); }

  function resetForm() {
    conditions = [{ field: "description", operator: "equals", value: "" }];
    selectedTagIds = [];
    merchantName = "";
    pendingTagNames = [];
    logic = "or";
  }

  function onSave(apply: boolean) {
    const valid = validConditions();
    if (valid.length === 0) return;
    onRuleSaved?.($state.snapshot({
      id: editingRule?.id,
      logic,
      conditions: valid,
      tagIds: selectedTagIds,
      newTagNames: pendingTagNames,
      merchantName: merchantName.trim() || undefined,
      apply,
    }));
    resetForm();
  }

  function onMerge(rule: MerchantRule, apply: boolean) {
    const valid = validConditions();
    if (valid.length === 0) return;
    onRuleMerge?.($state.snapshot({ existingRuleId: rule.id, conditions: valid, apply }));
    resetForm();
  }

  function existingRulesForMerchant(): MerchantRule[] {
    if (!merchantName.trim()) return [];
    const merchant = merchants.find((m) => m.name.toLowerCase() === merchantName.trim().toLowerCase());
    if (!merchant) return [];
    return rules.filter((r) => r.merchantId === merchant.id && r.id !== editingRule?.id);
  }

  function formatConditions(rule: MerchantRule): string {
    return rule.conditions.map((c) => `${c.operator} "${c.value}"`).join(rule.logic === "and" ? " AND " : " OR ");
  }

  let existingRules = $derived(existingRulesForMerchant());
</script>

<div class="rule-editor">
  <div class="section-header">Conditions</div>
  <div class="form-grid">
    {#each conditions as condition, i}
      <ConditionRow {condition} index={i} {accounts} {onConditionChanged} {onConditionRemoved} />
    {/each}
  </div>
  {#if conditions.length > 1}
    <div class="form-row">
      <label for="rule-logic">Logic:</label>
      <select id="rule-logic" onchange={(e) => { logic = (e.target as HTMLSelectElement).value as "and" | "or"; debouncedPreview(); }}>
        <option value="and" selected={logic === "and"}>All match (AND)</option>
        <option value="or" selected={logic === "or"}>Any match (OR)</option>
      </select>
    </div>
  {/if}
  <button class="add-condition secondary" onclick={addCondition}>+ Add Condition</button>

  <div class="section-header">Actions</div>
  <div class="form-grid">
    <span class="field-label">Merchant:</span>
    <div class="field-value">
      <MerchantAutocomplete {merchants} value={merchantName} onMerchantChanged={(name) => { merchantName = name; }} />
    </div>
    <span class="field-label">Tags:</span>
    <div class="tags-row">
      {#each pendingTagNames as name}
        <button class="tag-badge" onclick={() => removePendingTag(name)}>{name} &times;</button>
      {/each}
      <TagAutocomplete {tags} {selectedTagIds} {onTagSelected} {onTagCreated} onTagRemoved={removeTag} />
    </div>
  </div>

  {#if existingRules.length > 0}
    <div class="existing-rules">
      <h5>Existing rules for this merchant</h5>
      {#each existingRules as rule}
        <div class="existing-rule-item">
          <span class="existing-rule-conditions">{formatConditions(rule)}</span>
          {#if rule.tagIds.length > 0}
            <TagPills {tags} tagIds={rule.tagIds} />
          {/if}
          <button class="merge-btn secondary" onclick={() => onMerge(rule, false)}>Merge</button>
          <button class="merge-btn secondary" onclick={() => onMerge(rule, true)}>Merge and apply</button>
        </div>
      {/each}
    </div>
  {:else}
    <div class="existing-rules spacer">
      <h5>Existing rules for this merchant</h5>
      <div class="existing-rule-item">
        <span class="existing-rule-conditions">placeholder</span>
        <button class="merge-btn">Merge</button>
      </div>
    </div>
  {/if}

  <p class="preview" style={previewCount === null ? "visibility: hidden" : ""}>{previewCount ?? 0} transaction{previewCount === 1 ? "" : "s"} would match</p>
  <div class="save-row">
    <button class="secondary" disabled={!hasAction()} onclick={() => onSave(false)}>{editingRule ? "Save" : "Create"}</button>
    <button disabled={!hasAction()} onclick={() => onSave(true)}>{editingRule ? "Save" : "Create"} and apply</button>
  </div>
</div>

<style>
  .rule-editor {
    display: block;
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    background: var(--budgee-surface);
  }
  .form-grid { display: grid; grid-template-columns: auto auto 1fr auto; gap: 0.25rem 0.5rem; align-items: center; margin-bottom: 0.5rem; }
  .form-grid .field-label { grid-column: 1 / 3; }
  .form-grid :global(.field-value) { grid-column: 3 / 5; }
  .form-row { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem; }
  select { padding: 4px 8px; }
  .add-condition { font-size: 0.85rem; margin-bottom: 0.5rem; }
  .tags-row { grid-column: 3 / 5; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
  .tag-badge { display: inline-block; background: var(--budgee-primary); color: white; padding: 2px 8px; border-radius: 8px; font-size: 0.8rem; cursor: pointer; }
  .section-header { font-weight: bold; font-size: 0.9rem; margin: 0 0 0.5rem; }
  .section-header:not(:first-child) { margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--budgee-border); }
  .existing-rules { margin-top: 0.75rem; margin-bottom: 0.75rem; padding: 0.5rem; background: var(--budgee-bg); border-radius: 4px; font-size: 0.85rem; }
  .existing-rules h5 { margin: 0 0 0.25rem; }
  .existing-rule-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0; }
  .existing-rule-conditions { color: var(--budgee-text-muted); }
  .merge-btn { font-size: 0.8rem; padding: 2px 8px; flex-shrink: 0; }
  .preview { font-size: 0.85rem; color: var(--budgee-text-muted); margin-bottom: 0.5rem; }
  .save-row { display: flex; justify-content: flex-end; gap: 0.5rem; }
  .spacer { visibility: hidden; }
</style>
