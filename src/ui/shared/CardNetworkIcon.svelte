<script lang="ts">
  import { siVisa, siMastercard, siAmericanexpress, siDiscover } from "simple-icons";
  import type { CardNetwork } from "../../cardNetwork";

  let { network }: { network?: CardNetwork } = $props();

  const icons: Record<CardNetwork, { path: string; hex: string; title: string }> = {
    Visa: siVisa,
    Mastercard: siMastercard,
    Amex: siAmericanexpress,
    Discover: siDiscover,
  };

  let icon = $derived(network ? icons[network] : null);
</script>

{#if icon}
  <span class="badge" style="background:#{icon.hex}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label={icon.title} fill="white">
      <path d={icon.path} />
    </svg>
  </span>
{/if}

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.8em;
    height: 1.1em;
    border-radius: 0.2em;
    overflow: hidden;
    vertical-align: middle;
  }
  svg {
    width: 1.25em;
    height: 1.25em;
  }
</style>
