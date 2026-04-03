<script lang="ts">
  import { Temporal } from "@js-temporal/polyfill";
  import { aggregateByPeriod } from "../../charting/aggregateBy";
  import { formatAmount } from "../../formatAmount";
  import { Merchant } from "../../models/Merchant";
  import { Transaction } from "../../models/Transaction";
  import { navigate } from "../navigate";
  import { useSubscription } from "../../lib/subscribe.svelte";
  import { barChartData } from "../charts/barChartData";
  import { cachedDid } from "../../identity";
  import ChartWrapper from "../charts/ChartWrapper.svelte";
  import PaginatedTable from "../shared/PaginatedTable.svelte";
  import ShareModal from "../shared/ShareModal.svelte";
  import SharedBadge from "../shared/SharedBadge.svelte";
  import SharedWithList from "../shared/SharedWithList.svelte";
  import SkeletonLoader from "../shared/SkeletonLoader.svelte";
  import TimeRangePicker from "../shared/TimeRangePicker.svelte";
  import type { TimeRange } from "../shared/TimeRangePicker.svelte";
  import shareIcon from "lucide-static/icons/share-2.svg?raw";
  import "../styles/table.css";

  let { merchantId }: { merchantId: string } = $props();

  let merchant = $state<Merchant | undefined>(undefined);
  let transactions = $state<Transaction[]>([]);
  let timeRange = $state<TimeRange>(null);
  let editingName = $state(false);
  let draftName = $state("");
  let nameInput = $state<HTMLInputElement | null>(null);
  let showShareModal = $state(false);

  useSubscription([Merchant.subscribe, Transaction.subscribe], () => load());

  $effect(() => {
    merchantId;
    load();
  });

  $effect(() => {
    if (editingName && nameInput) {
      nameInput.focus();
      nameInput.select();
    }
  });

  async function load() {
    if (!merchantId) return;
    const [m, txs] = await Promise.all([
      Merchant.get(merchantId),
      Transaction.forMerchant(merchantId),
    ]);
    merchant = m;
    transactions = txs;
  }

  let filteredTransactions = $derived.by(() => {
    if (timeRange === null) return transactions;
    const cutoffStr = Temporal.Now.plainDateISO().subtract(timeRange).toString();
    return transactions.filter((t) => t.date >= cutoffStr);
  });

  let allMonthlySpend = $derived.by((): [string, number][] => {
    const byMonth = new Map<string, number>();
    for (const tx of transactions) {
      if (tx.amount >= 0) continue;
      const month = tx.date.slice(0, 7);
      byMonth.set(month, (byMonth.get(month) ?? 0) + tx.amount);
    }
    return [...byMonth.entries()].sort(([a], [b]) => a.localeCompare(b));
  });

  let monthlySpend = $derived.by((): [string, number][] => {
    const debits = filteredTransactions.filter((t) => t.amount < 0);
    return [...aggregateByPeriod(debits, "month").entries()].sort(([a], [b]) => a.localeCompare(b));
  });

  let chartData = $derived(
    barChartData({
      allEntries: allMonthlySpend,
      displayEntries: monthlySpend,
      label: merchant?.name ?? "Merchant",
    }),
  );


  function startEditingName() {
    editingName = true;
    draftName = merchant?.name ?? "";
  }

  function handleNameKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      const trimmed = draftName.trim();
      if (trimmed && merchant) {
        Merchant.update(merchant.id, { name: trimmed });
      }
      editingName = false;
    } else if (e.key === "Escape") {
      editingName = false;
    }
  }
</script>

{#if !merchant}
  <SkeletonLoader variant="card" rows={3} />
  <SkeletonLoader variant="table" rows={5} />
{:else}
  <a class="back-link" href="/merchants" onclick={(e) => { e.preventDefault(); navigate("/merchants"); }}>&larr; Back to merchants</a>

  <div class="header">
    <h2>
      {#if editingName}
        <input
          class="name-input"
          bind:this={nameInput}
          value={draftName}
          oninput={(e) => { draftName = (e.target as HTMLInputElement).value; }}
          onkeydown={handleNameKeydown}
        />
      {:else}
        {merchant.name}
        {#if !merchant._owner}
          <button class="edit-name-btn" onclick={startEditingName}>✎</button>
        {/if}
      {/if}
    </h2>
  </div>

  <div class="sharing-row">
    {#if merchant._owner}
      <SharedBadge ownerDid={merchant._owner} />
    {:else}
      <SharedWithList objectUri="at://{cachedDid()}/io.mygard.finance.merchant/{merchantId}" />
      <button class="share-btn" onclick={() => { showShareModal = true; }}>{@html shareIcon}</button>
    {/if}
  </div>

  {#if showShareModal}
    <ShareModal
      objectUri="at://{cachedDid()}/io.mygard.finance.merchant/{merchantId}"
      onClose={() => { showShareModal = false; }}
    />
  {/if}

  <div class="section">
    <h3>
      Monthly Spend
      <TimeRangePicker value={timeRange} onTimeRangeChange={(r) => { timeRange = r; }} />
    </h3>
    {#if monthlySpend.length > 0}
      <ChartWrapper chartType="bar" data={chartData} />
    {:else}
      <p>No transactions in this period.</p>
    {/if}
  </div>

  <div class="section-transactions">
    <h3>Transactions</h3>
    <PaginatedTable
      items={filteredTransactions}
      defaultPageSize={25}
      storageKey="merchant-transactions"
      columns={["Date", { label: "Description", class: "col-grow" }, "Amount"]}
    >
      {#snippet renderRow(t: Transaction)}
        <tr onclick={() => navigate(`/transactions/${t.id}`)}>
          <td>{t.date}</td>
          <td class="col-grow">{t.description}</td>
          <td class={t.amount < 0 ? "amount-negative" : "amount-positive"}>
            {formatAmount(t.amount)}
          </td>
        </tr>
      {/snippet}
    </PaginatedTable>
  </div>
{/if}

<style>
  a.back-link {
    color: var(--budgee-primary);
    text-decoration: underline;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    display: inline-block;
  }
  .header {
    margin-bottom: 1rem;

    & h2 {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
  .section {
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    background: var(--budgee-surface);
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    & :global(.chart-wrapper) {
      flex: 1;
      min-height: 200px;
    }

    & h3 {
      margin-top: 0;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
  }
  .section-transactions {
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    background: var(--budgee-surface);
    margin-bottom: 1rem;

    & h3 {
      margin-top: 0;
    }
  }
  .edit-name-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.75em;
    opacity: 0.5;
    padding: 0 0.25em;

    &:hover {
      opacity: 1;
    }
  }
  .name-input {
    font: inherit;
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    padding: 0 0.25em;
    width: 100%;
    box-sizing: border-box;
  }
  .sharing-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
  }
  .share-btn {
    display: inline-flex;
    align-items: center;
    background: none;
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    cursor: pointer;
    padding: 4px;
    color: var(--budgee-text-muted);
  }
  .share-btn:hover {
    color: var(--budgee-text);
    border-color: var(--budgee-text-muted);
  }
  .share-btn :global(svg) {
    width: 1rem;
    height: 1rem;
  }
</style>
