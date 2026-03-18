<script lang="ts">
  let { variant = "table", rows = 5 }: { variant?: "table" | "card" | "text"; rows?: number } = $props();
</script>

{#if variant === "table"}
  <div class="skeleton" aria-live="polite" aria-label="Loading">
    {#each Array(rows) as _}
      <div class="table-row">
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>
    {/each}
  </div>
{:else if variant === "card"}
  <div class="skeleton card" aria-live="polite" aria-label="Loading">
    <div class="skeleton-line" style="width: 40%; height: 1.2rem"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line"></div>
  </div>
{:else}
  <div class="skeleton text" aria-live="polite" aria-label="Loading">
    {#each Array(rows) as _}
      <div class="skeleton-line"></div>
    {/each}
  </div>
{/if}

<style>
  .skeleton {
    display: block;
    animation: fade-in 0.15s ease-out 0.3s both;
  }
  .skeleton-line {
    height: 1rem;
    background: var(--budgee-border);
    border-radius: 4px;
    animation: pulse 1.5s ease-in-out infinite;
  }
  .table-row {
    display: flex;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--budgee-border);
  }
  .table-row .skeleton-line {
    flex: 1;
  }
  .table-row .skeleton-line:first-child {
    flex: 2;
  }
  .card {
    border: 1px solid var(--budgee-border);
    border-radius: 8px;
    padding: 1rem;
  }
  .card .skeleton-line {
    margin-bottom: 0.75rem;
  }
  .card .skeleton-line:last-child {
    margin-bottom: 0;
    width: 60%;
  }
  .text .skeleton-line {
    margin-bottom: 0.5rem;
  }
  .text .skeleton-line:last-child {
    width: 70%;
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
</style>
