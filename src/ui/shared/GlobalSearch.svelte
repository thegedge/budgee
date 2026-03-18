<script lang="ts">
  import { formatAmount } from "../../formatAmount";
  import { Transaction } from "../../models/Transaction";
  import { Merchant } from "../../models/Merchant";
  import { Tag } from "../../models/Tag";
  import { Account } from "../../models/Account";
  import { navigate } from "../navigate";
  import AccountName from "./AccountName.svelte";

  interface SearchResult {
    type: "transaction" | "merchant" | "tag" | "account";
    id: string;
    label: string;
    detail?: string;
    href: string;
    accountName?: string;
    accountAlias?: string;
  }

  let isOpen = $state(false);
  let query = $state("");
  let results = $state<SearchResult[]>([]);
  let activeIndex = $state(0);
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;
  let backdropEl = $state<HTMLElement | undefined>(undefined);

  function open() {
    isOpen = true;
    query = "";
    results = [];
    activeIndex = 0;
  }

  function close() {
    isOpen = false;
    query = "";
    results = [];
  }

  function onInput(e: Event) {
    query = (e.target as HTMLInputElement).value;
    activeIndex = 0;
    clearTimeout(debounceTimer);
    if (query.trim()) {
      debounceTimer = setTimeout(() => search(), 150);
    } else {
      results = [];
    }
  }

  async function search() {
    const q = query.trim().toLowerCase();
    if (!q) return;

    const found: SearchResult[] = [];
    const [transactions, merchants, tags, accounts] = await Promise.all([
      Transaction.all(),
      Merchant.all(),
      Tag.all(),
      Account.all(),
    ]);

    for (const m of merchants) {
      if (m.name.toLowerCase().includes(q)) {
        found.push({ type: "merchant", id: m.id, label: m.name, href: `/merchants/${m.id}` });
      }
    }
    for (const t of tags) {
      if (t.name.toLowerCase().includes(q)) {
        found.push({ type: "tag", id: t.id, label: t.name, href: "/tags" });
      }
    }
    for (const a of accounts) {
      if (a.name.toLowerCase().includes(q) || a.alias?.toLowerCase().includes(q)) {
        found.push({
          type: "account", id: a.id, label: a.alias ?? a.name, href: `/accounts/${a.id}`,
          accountName: a.name, accountAlias: a.alias,
        });
      }
    }
    let txCount = 0;
    for (const tx of transactions) {
      if (txCount >= 5) break;
      if (tx.description.toLowerCase().includes(q)) {
        found.push({
          type: "transaction", id: tx.id, label: tx.description,
          detail: `${tx.date} \u00B7 ${formatAmount(tx.amount)}`,
          href: `/transactions/${tx.id}`,
        });
        txCount++;
      }
    }
    results = found;
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") { e.preventDefault(); activeIndex = Math.min(activeIndex + 1, results.length - 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); }
    else if (e.key === "Enter" && results[activeIndex]) navigateTo(results[activeIndex]);
  }

  function navigateTo(result: SearchResult) {
    close();
    navigate(result.href);
  }

  function groupedResults(): Map<string, SearchResult[]> {
    const groups = new Map<string, SearchResult[]>();
    for (const r of results) {
      const list = groups.get(r.type) ?? [];
      list.push(r);
      groups.set(r.type, list);
    }
    return groups;
  }

  const typeLabels: Record<string, string> = {
    merchant: "Merchants",
    tag: "Tags",
    account: "Accounts",
    transaction: "Transactions",
  };

  $effect(() => {
    function onGlobalKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        open();
      }
    }
    document.addEventListener("keydown", onGlobalKeydown);
    return () => document.removeEventListener("keydown", onGlobalKeydown);
  });

  // Handle backdrop clicks via event listener to avoid a11y warning on static div
  $effect(() => {
    if (!backdropEl) return;
    const el = backdropEl;
    function handleClick(e: MouseEvent) {
      if (e.target === el) close();
    }
    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  });
</script>

{#if isOpen}
  <div class="backdrop" bind:this={backdropEl}>
    <div class="panel" role="dialog" aria-modal="true" aria-label="Search">
      <input
        type="text"
        placeholder="Search transactions, merchants, tags, accounts\u2026"
        value={query}
        oninput={onInput}
        onkeydown={onKeydown}
        aria-label="Search"
      />
      <div class="results" role="listbox" aria-label="Search results">
        {#if results.length === 0 && query.trim()}
          <div class="empty">No results found</div>
        {/if}
        {#each [...groupedResults().entries()] as [type, items]}
          {@const baseIdx = results.indexOf(items[0])}
          <div class="group-label" role="presentation">{typeLabels[type] ?? type}</div>
          {#each items as r, i}
            <div
              class="result"
              class:active={baseIdx + i === activeIndex}
              role="option"
              tabindex="-1"
              aria-selected={baseIdx + i === activeIndex}
              onclick={() => navigateTo(r)}
              onkeydown={(e) => { if (e.key === "Enter") navigateTo(r); }}
              onmouseenter={() => { activeIndex = baseIdx + i; }}
            >
              <span class="result-label">
                {#if r.accountName}
                  <AccountName name={r.accountName} alias={r.accountAlias} />
                {:else}
                  {r.label}
                {/if}
              </span>
              {#if r.detail}
                <span class="result-detail">{r.detail}</span>
              {/if}
            </div>
          {/each}
        {/each}
      </div>
      <div class="hint">
        <span><kbd>\u2191\u2193</kbd> Navigate</span>
        <span><kbd>\u21B5</kbd> Open</span>
        <span><kbd>Esc</kbd> Close</span>
      </div>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 15vh;
    background: var(--budgee-overlay);
  }
  .panel {
    background: var(--budgee-surface);
    border: 1px solid var(--budgee-border);
    border-radius: 8px;
    width: min(90vw, 500px);
    max-height: 60vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 32px lch(0% 0 none / 0.2);
  }
  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    border-bottom: 1px solid var(--budgee-border);
    background: transparent;
    color: var(--budgee-text);
    font-size: 1rem;
    outline: none;
    box-sizing: border-box;
  }
  .results { overflow-y: auto; max-height: 50vh; }
  .group-label {
    padding: 0.4rem 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--budgee-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .result {
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .result:hover, .result.active { background: var(--budgee-row-hover); }
  .result-label { font-size: 0.9rem; }
  .result-detail { font-size: 0.8rem; color: var(--budgee-text-muted); }
  .empty { padding: 2rem 1rem; text-align: center; color: var(--budgee-text-muted); font-size: 0.9rem; }
  .hint {
    padding: 0.5rem 1rem;
    border-top: 1px solid var(--budgee-border);
    font-size: 0.75rem;
    color: var(--budgee-text-muted);
    display: flex;
    gap: 1rem;
  }
  kbd {
    background: var(--budgee-bg);
    border: 1px solid var(--budgee-border);
    border-radius: 3px;
    padding: 0 4px;
    font-size: 0.7rem;
  }
</style>
