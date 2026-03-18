<script lang="ts">
  import type { Merchant } from "../../models/Merchant";
  import AutocompleteInput from "../shared/AutocompleteInput.svelte";

  let { merchants = [], value = "", onMerchantChanged }: {
    merchants?: Merchant[];
    value?: string;
    onMerchantChanged?: (name: string) => void;
  } = $props();

  let merchantNames = $derived(merchants.map((m) => m.name));
  let isExisting = $derived.by(() => {
    const q = value.trim().toLowerCase();
    return q.length > 0 && merchants.some((m) => m.name.toLowerCase() === q);
  });
  let trimmed = $derived(value.trim());

  function onValueChanged(val: string) {
    onMerchantChanged?.(val);
  }
</script>

<div class="merchant-autocomplete">
  <div class="input-wrapper">
    <AutocompleteInput
      items={merchantNames}
      {value}
      placeholder="Merchant name (optional)"
      {onValueChanged}
    />
    {#if trimmed}
      {#if isExisting}
        <span class="status existing">existing</span>
      {:else}
        <span class="status new">new</span>
      {/if}
    {/if}
  </div>
</div>

<style>
  .merchant-autocomplete { display: inline-block; position: relative; }
  .input-wrapper { display: flex; align-items: center; gap: 0.4rem; }
  .status { font-size: 0.75rem; white-space: nowrap; }
  .status.existing { color: var(--budgee-success); }
  .status.new { color: var(--budgee-text-muted); font-style: italic; }
</style>
