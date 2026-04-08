<script lang="ts">
  import { getAuth } from "../../auth.svelte";
  import { db } from "../../database/Db";

  const DISMISS_KEY = "budgee-backup-nudge-dismissed";
  const NUDGE_THRESHOLD = 100;

  let dismissed = $state(false);
  let txCount = $state(0);

  $effect(() => {
    try {
      dismissed = localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      dismissed = false;
    }

    void db().then(async (dbs) => {
      txCount = await dbs.transactions.count();
    });
  });

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // localStorage unavailable
    }
    dismissed = true;
  }

  let visible = $derived(
    getAuth().status === "local" && txCount >= NUDGE_THRESHOLD && !dismissed,
  );
</script>

{#if visible}
  <div class="backup-nudge" role="status">
    <span>You have unsaved data. <a href="/setup">Set up backup</a> to keep your budget safe.</span>
    <button onclick={dismiss} aria-label="Dismiss">×</button>
  </div>
{/if}

<style>
  .backup-nudge {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5rem 1rem;
    background: color-mix(in lch, var(--budgee-primary, lch(55% 40 250)) 10%, transparent);
    border-bottom: 1px solid color-mix(in lch, var(--budgee-primary, lch(55% 40 250)) 30%, transparent);
    font-size: 0.85rem;
    color: var(--budgee-text);
  }
  .backup-nudge a {
    color: var(--budgee-primary);
    font-weight: 600;
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    color: var(--budgee-text-muted);
    padding: 0 0.25rem;
    line-height: 1;
    flex-shrink: 0;
  }
  button:hover { color: var(--budgee-text); }
</style>
