<script lang="ts">
  import type { ChartData } from "chart.js";
  import { Transaction } from "../../models/Transaction";
  import { Tag } from "../../models/Tag";
  import { Merchant } from "../../models/Merchant";
  import { formatAmount } from "../../formatAmount";
  import { cachedDid } from "../../identity";
  import ShareModal from "../shared/ShareModal.svelte";
  import SharedBadge from "../shared/SharedBadge.svelte";
  import SharedWithList from "../shared/SharedWithList.svelte";
  import { movingMedian } from "../../charting/movingMedian";
  import { movingWindowSize } from "../../charting/movingWindowSize";
  import { navigate } from "../navigate";
  import { cssVar } from "../cssVar";
  import { useBusy } from "../../lib/busy.svelte";
  import { useSubscription } from "../../lib/subscribe.svelte";
  import SkeletonLoader from "../shared/SkeletonLoader.svelte";
  import TagAutocomplete from "../tags/TagAutocomplete.svelte";
  import ChartWrapper from "../charts/ChartWrapper.svelte";
  import shareIcon from "lucide-static/icons/share-2.svg?raw";
  import "../styles/button.css";
  import "../styles/table.css";

  interface MonthlySpend {
    month: string;
    total: number;
  }

  let { transactionId = "" }: { transactionId?: string } = $props();

  let transaction = $state<Transaction | undefined>(undefined);
  let tags = $state<Tag[]>([]);
  let merchant = $state<Merchant | undefined>(undefined);
  let relatedTransactions = $state<Transaction[]>([]);
  let monthlySpend = $state<MonthlySpend[]>([]);
  let showShareModal = $state(false);

  const { busy, withBusy } = useBusy();

  useSubscription([Transaction.subscribe, Tag.subscribe, Merchant.subscribe], load);

  async function load() {
    if (!transactionId) return;

    transaction = await Transaction.get(transactionId);
    tags = await Tag.all();

    if (transaction?.merchantId) {
      merchant = await Merchant.get(transaction.merchantId);
    } else {
      merchant = undefined;
    }

    if (transaction) {
      await loadRelated();
      await loadMonthlySpend();
    }
  }

  async function loadRelated() {
    if (!transaction?.merchantId) {
      relatedTransactions = [];
      return;
    }
    const all = await Transaction.forMerchant(transaction.merchantId);
    relatedTransactions = all.filter((t) => t.id !== transaction!.id).slice(0, 10);
  }

  async function loadMonthlySpend() {
    if (!transaction?.merchantId) {
      monthlySpend = [];
      return;
    }
    const all = await Transaction.forMerchant(transaction.merchantId);
    const byMonth = new Map<string, number>();
    for (const tx of all) {
      if (tx.amount >= 0) continue;
      const month = tx.date.slice(0, 7);
      byMonth.set(month, (byMonth.get(month) ?? 0) + tx.amount);
    }
    monthlySpend = [...byMonth.entries()]
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([month, total]) => ({ month, total }));
  }

  async function onTagSelected(tag: Tag) {
    if (!transaction) return;
    if (transaction.tagIds.includes(tag.id)) return;
    await withBusy(async () => {
      const updatedTagIds = [...transaction!.tagIds, tag.id];
      await Transaction.update(transaction!.id, { tagIds: updatedTagIds });
      transaction = { ...transaction!, tagIds: updatedTagIds };
    });
  }

  async function onTagCreated(name: string) {
    if (!transaction) return;
    await withBusy(async () => {
      const tag = await Tag.create(name);
      const updatedTagIds = [...transaction!.tagIds, tag.id];
      await Transaction.update(transaction!.id, { tagIds: updatedTagIds });
      transaction = { ...transaction!, tagIds: updatedTagIds };
      tags = await Tag.all();
    });
  }

  async function removeTag(tagId: string) {
    if (!transaction) return;
    await withBusy(async () => {
      const updatedTagIds = transaction!.tagIds.filter((id) => id !== tagId);
      await Transaction.update(transaction!.id, { tagIds: updatedTagIds });
      transaction = { ...transaction!, tagIds: updatedTagIds };
    });
  }

  async function onMemoBlur(e: Event) {
    if (!transaction) return;
    await withBusy(async () => {
      const memo = (e.target as HTMLTextAreaElement).value;
      await Transaction.update(transaction!.id, { memo });
      transaction = { ...transaction!, memo };
    });
  }

  let merchantChartData = $derived.by((): ChartData => {
    const entries = [...monthlySpend].reverse();
    const values = entries.map((e) => e.total);
    const window = movingWindowSize(values.length);
    return {
      labels: entries.map((e) => e.month),
      datasets: [
        {
          label: merchant?.name ?? "Merchant",
          data: values,
          backgroundColor: cssVar("--budgee-primary", 0.5),
          borderColor: cssVar("--budgee-primary"),
          borderWidth: 1,
        },
        ...(values.length >= 2
          ? [
              {
                type: "line" as const,
                label: `Moving Avg (${window}-mo)`,
                data: movingMedian(values, window),
                borderColor: cssVar("--budgee-text-muted", 0.5),
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false,
                tension: 0.3,
              } as ChartData["datasets"][number],
            ]
          : []),
      ],
    };
  });

  function createRule(tx: Transaction) {
    const params = new URLSearchParams({ description: tx.description });
    navigate(`/rules?${params}`);
  }
</script>

<div class="transaction-detail" class:busy>
  {#if !transaction}
    <SkeletonLoader variant="card" rows={3} />
    <SkeletonLoader variant="text" rows={4} />
  {:else}
    {@const tx = transaction}
    <span class="back-link" role="button" tabindex="0" onclick={() => navigate("/transactions")} onkeydown={(e) => e.key === "Enter" && navigate("/transactions")}>&larr; Back to transactions</span>

    <div class="header">
      <h2>{tx.description}</h2>
      <div class="amount {tx.amount < 0 ? 'amount-negative' : 'amount-positive'}">
        {formatAmount(tx.amount)}
      </div>
      <div class="meta">
        {tx.date}{#if merchant} &middot; {merchant.name}{:else if tx.merchantId} &middot; <span class="unknown-merchant">Unknown merchant</span>{/if}
      </div>
    </div>

    <div class="sharing-card">
      <h3>Sharing</h3>
      <div class="sharing-row">
        {#if tx._owner}
          <SharedBadge ownerDid={tx._owner} />
        {:else}
          <SharedWithList objectUri="at://{cachedDid()}/io.mygard.finance.transaction/{transactionId}" />
          <button class="share-btn" onclick={() => { showShareModal = true; }}>{@html shareIcon} Share</button>
        {/if}
      </div>
    </div>

    <div class="section">
      <h3>Tags</h3>
      {#if tx._owner}
        <div class="readonly-overlay">
          <TagAutocomplete
            {tags}
            selectedTagIds={tx.tagIds}
            onTagSelected={onTagSelected}
            onTagCreated={onTagCreated}
            onTagRemoved={(tagId) => removeTag(tagId)}
          />
        </div>
      {:else}
        <TagAutocomplete
          {tags}
          selectedTagIds={tx.tagIds}
          onTagSelected={onTagSelected}
          onTagCreated={onTagCreated}
          onTagRemoved={(tagId) => removeTag(tagId)}
        />
      {/if}
    </div>

    {#if !tx.merchantId && !tx._owner}
      <button class="create-rule" onclick={() => createRule(tx)}>
        Create Merchant Rule
      </button>
    {/if}

    <div class="section">
      <h3>Notes</h3>
      <textarea value={tx.memo ?? ""} onblur={onMemoBlur} placeholder="Add notes..." disabled={!!tx._owner}></textarea>
    </div>

    {#if relatedTransactions.length > 0}
      <div class="section">
        <h3>Related Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th class="col-amount">Amount</th>
            </tr>
          </thead>
          <tbody>
            {#each relatedTransactions as t}
              <tr>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td class="col-amount {t.amount < 0 ? 'amount-negative' : 'amount-positive'}">
                  {formatAmount(t.amount)}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    {#if monthlySpend.length > 0}
      <div class="section">
        <h3>Monthly Merchant Spend</h3>
        <ChartWrapper chartType="bar" data={merchantChartData} />
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th class="col-amount">Total</th>
            </tr>
          </thead>
          <tbody>
            {#each monthlySpend as { month, total }}
              <tr>
                <td>{month}</td>
                <td class="col-amount {total < 0 ? 'amount-negative' : 'amount-positive'}">
                  {formatAmount(total)}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    {#if showShareModal}
      <ShareModal
        objectUri="at://{cachedDid()}/io.mygard.finance.transaction/{transactionId}"
        onClose={() => { showShareModal = false; }}
      />
    {/if}
  {/if}
</div>

<style>
  .transaction-detail {
    display: block;
  }
  .transaction-detail.busy {
    pointer-events: none;
    cursor: wait;
    opacity: 0.6;
  }
  .header {
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    background: var(--budgee-surface);
  }
  .header h2 {
    margin-top: 0;
  }
  .amount {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .meta {
    color: var(--budgee-text-muted);
    font-size: 0.9rem;
  }
  .section {
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    background: var(--budgee-surface);
  }
  .section h3 {
    margin-top: 0;
  }
  textarea {
    width: 100%;
    min-height: 60px;
    padding: 8px;
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.9rem;
    resize: vertical;
    box-sizing: border-box;
  }
  .create-rule {
    display: inline-block;
    padding: 0.5rem 1rem;
    text-decoration: none;
    font-size: 0.9rem;
  }
  .back-link {
    color: var(--budgee-primary);
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    display: inline-block;
  }
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
  .unknown-merchant {
    color: var(--budgee-text-muted);
    font-style: italic;
  }
  .readonly-overlay {
    pointer-events: none;
    opacity: 0.6;
  }
</style>
