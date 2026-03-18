<script lang="ts">
  import { cardNetworkFromPrefix } from "../../cardNetwork";
  import CardNetworkIcon from "./CardNetworkIcon.svelte";

  let { name = "", alias }: { name?: string; alias?: string } = $props();

  let network = $derived(cardNetworkFromPrefix(name));
</script>

<span class="account-name">
  {#if network}
    <CardNetworkIcon {network} />
  {/if}
  {#if alias}
    <span>{alias}</span><span class="raw-name">{name}</span>
  {:else}
    <span>{name}</span>
  {/if}
</span>

<style>
  .account-name {
    display: inline-flex;
    align-items: center;
    gap: 0.35em;
  }
  .raw-name {
    font-size: 0.85em;
    color: var(--budgee-text-muted);
  }
</style>
