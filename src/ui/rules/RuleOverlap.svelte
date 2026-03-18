<script lang="ts">
  import type { MerchantRule } from "../../models/MerchantRule";
  import SkeletonLoader from "../shared/SkeletonLoader.svelte";
  import "../styles/table.css";

  export interface OverlapPair {
    ruleA: MerchantRule;
    ruleB: MerchantRule;
    count: number;
    samples: Set<string>;
  }

  let { overlaps = [], merchants = new Map<string, string>(), loading = false }: {
    overlaps?: OverlapPair[];
    merchants?: Map<string, string>;
    loading?: boolean;
  } = $props();

  function formatRule(rule: MerchantRule): string {
    const merchant = rule.merchantId ? (merchants.get(rule.merchantId) ?? "") : "";
    const conditions = rule.conditions
      .map((c) => (c.operator === "oneOf" ? `one of [${c.value}]` : `${c.operator} "${c.value}"`))
      .join(rule.logic === "and" ? " AND " : " OR ");
    return merchant ? `${merchant}: ${conditions}` : conditions;
  }
</script>

<div class="section">
  <h3>Rule Overlap</h3>
  {#if loading}
    <SkeletonLoader variant="table" rows={3} />
  {:else if overlaps.length === 0}
    <p>No overlapping rules found.</p>
  {:else}
    <p>{overlaps.length} overlapping rule pair{overlaps.length === 1 ? "" : "s"} found.</p>
    <table>
      <thead>
        <tr>
          <th>Rule A</th>
          <th>Rule B</th>
          <th>Overlapping Transactions</th>
          <th class="col-grow">Examples</th>
        </tr>
      </thead>
      <tbody>
        {#each overlaps as o}
          <tr>
            <td class="condition-summary">{formatRule(o.ruleA)}</td>
            <td class="condition-summary">{formatRule(o.ruleB)}</td>
            <td>{o.count}</td>
            <td class="samples col-grow">{[...o.samples].slice(0, 3).join("\n\n")}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  .section {
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    background: var(--budgee-surface);
    box-sizing: border-box;
    height: 100%;
  }
  .section h3 { margin-top: 0; }
  .condition-summary { font-size: 0.85rem; color: var(--budgee-text-muted); }
  .samples { font-size: 0.8rem; color: var(--budgee-text-muted); font-style: italic; white-space: pre-wrap; }
</style>
