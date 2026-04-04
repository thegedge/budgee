<script lang="ts">
  import ShareModal from "./ShareModal.svelte";
  import SharedBadge from "./SharedBadge.svelte";
  import SharedWithList from "./SharedWithList.svelte";
  import shareIcon from "lucide-static/icons/share-2.svg?raw";

  let { objectUri, ownerDid }: { objectUri: string; ownerDid: string | undefined } = $props();

  let showShareModal = $state(false);
</script>

<div class="sharing-card">
  <h3>Sharing</h3>
  <div class="sharing-row">
    {#if ownerDid}
      <SharedBadge {ownerDid} />
    {:else}
      <SharedWithList {objectUri} />
      <button class="share-btn" onclick={() => { showShareModal = true; }}>{@html shareIcon} Share</button>
    {/if}
  </div>
</div>

{#if showShareModal}
  <ShareModal
    {objectUri}
    onClose={() => { showShareModal = false; }}
  />
{/if}

<style>
  .sharing-card {
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    background: var(--budgee-surface);
    margin-bottom: 1rem;

    & h3 {
      margin-top: 0;
      margin-bottom: 0.5rem;
    }
  }
  .sharing-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .share-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: var(--budgee-primary, lch(72.1% 25.1 246.4));
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 4px 10px;
    color: white;
    font-size: 0.85rem;
  }
  .share-btn:hover {
    filter: brightness(0.9);
  }
  .share-btn :global(svg) {
    width: 1rem;
    height: 1rem;
  }
</style>
