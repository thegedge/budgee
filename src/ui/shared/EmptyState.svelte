<script lang="ts">
  import type { Snippet } from "svelte";

  let { icon = "", heading = "", description = "", children }: {
    icon?: string;
    heading?: string;
    description?: string;
    children?: Snippet;
  } = $props();
</script>

<div class="empty-state">
  {#if icon}
    <div class="icon">{@html icon}</div>
  {/if}
  <h3>{heading}</h3>
  <p>{description}</p>
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    text-align: center;
  }
  .icon {
    color: var(--budgee-text-muted);
    margin-bottom: 1rem;
  }
  .icon :global(svg) {
    width: 48px;
    height: 48px;
  }
  h3 {
    margin: 0 0 0.5rem;
    color: var(--budgee-text);
  }
  p {
    margin: 0 0 1rem;
    color: var(--budgee-text-muted);
    max-width: 300px;
  }
</style>
