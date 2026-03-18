<script lang="ts">
  import type { Snippet } from "svelte";

  let { variant = "info", children }: { variant?: "warning" | "danger" | "success" | "info"; children: Snippet } = $props();
</script>

<span class="badge {variant}">
  {@render children()}
</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    padding: 2px 7px;
    border-radius: 8px;
    white-space: nowrap;
  }
  .badge :global(svg) {
    width: 0.85rem;
    height: 0.85rem;
  }
  .warning {
    --color: var(--budgee-warning, lch(80% 80 85));
    color: light-dark(lch(15% 35 85), lch(85% 35 85));
    background: color-mix(in lch, var(--color) 25%, transparent);
  }
  .danger {
    --color: var(--budgee-danger, lch(72.8% 28.9 22.1));
    color: var(--color);
    background: color-mix(in lch, var(--color) 15%, transparent);
  }
  .success {
    --color: var(--budgee-success, lch(63.6% 33.6 180.1));
    color: var(--color);
    background: color-mix(in lch, var(--color) 15%, transparent);
  }
  .info {
    --color: var(--budgee-primary, lch(72.1% 25.1 246.4));
    color: var(--color);
    background: color-mix(in lch, var(--color) 15%, transparent);
  }
</style>
