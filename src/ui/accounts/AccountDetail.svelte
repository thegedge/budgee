<script lang="ts">
  import { tick } from "svelte";
  import { Temporal } from "@js-temporal/polyfill";
  import { type PeriodGranularity, aggregateByPeriod } from "../../charting/aggregateBy";
  import { ACCOUNT_TYPES, type AccountType, accountTypeLabel } from "../../database/types";
  import { Account } from "../../models/Account";
  import { formatAmount } from "../../formatAmount";
  import { Transaction } from "../../models/Transaction";
  import { navigate } from "../navigate";
  import { useSubscription } from "../../lib/subscribe.svelte";
  import { useBusy } from "../../lib/busy.svelte";
  import { barChartData } from "../charts/barChartData";
  import { cachedDid } from "../../identity";
  import { isReadOnly, isShared } from "../shared/permissions";
  import { showToast } from "../shared/toast";
  import ChartWrapper from "../charts/ChartWrapper.svelte";
  import AccountName from "../shared/AccountName.svelte";
  import PaginatedTable from "../shared/PaginatedTable.svelte";
  import SharingCard from "../shared/SharingCard.svelte";
  import SkeletonLoader from "../shared/SkeletonLoader.svelte";
  import TimeRangePicker from "../shared/TimeRangePicker.svelte";
  import type { TimeRange } from "../shared/TimeRangePicker.svelte";
  import "../styles/table.css";

  let { accountId = "" }: { accountId?: string } = $props();

  let account = $state<Account | undefined>(undefined);
  let transactions = $state<Transaction[] | null>(null);
  let editingName = $state(false);
  let timeRange = $state<TimeRange>(null);
  let editInput = $state<HTMLInputElement | null>(null);

  const { busy, withBusy } = useBusy();

  useSubscription([Account.subscribe, Transaction.subscribe], async () => {
    if (!accountId) return;
    const prev = account;
    account = await Account.get(accountId);
    if (!account && prev && isShared(prev)) {
      showToast({ message: "Shared account is no longer available", type: "info" });
      navigate("/accounts");
      return;
    }
    await loadTransactions();
  });

  async function loadTransactions() {
    transactions = await Transaction.forAccount(accountId);
  }

  let displayName = $derived(account?.alias ?? account?.name ?? "Account");

  let filteredTransactions = $derived.by(() => {
    if (!transactions) return null;
    if (timeRange === null) return transactions;
    const cutoffStr = Temporal.Now.plainDateISO().subtract(timeRange).toString();
    return transactions.filter((t) => t.date >= cutoffStr);
  });

  let granularity = $derived.by((): PeriodGranularity => {
    if (timeRange === null) return "month";
    const relativeTo = Temporal.Now.plainDateISO();
    const months = timeRange.total({ unit: "months", relativeTo });
    if (months <= 1) return "day";
    if (months <= 12) return "week";
    return "month";
  });

  let allPeriodTotals = $derived.by((): [string, number][] => {
    const debits = (transactions ?? []).filter((t) => t.amount < 0);
    return [...aggregateByPeriod(debits, granularity).entries()].sort(([a], [b]) =>
      a.localeCompare(b),
    );
  });

  let periodTotals = $derived.by((): [string, number][] => {
    const debits = (filteredTransactions ?? []).filter((t) => t.amount < 0);
    return [...aggregateByPeriod(debits, granularity).entries()].sort(([a], [b]) =>
      a.localeCompare(b),
    );
  });

  let chartData = $derived(
    barChartData({ allEntries: allPeriodTotals, displayEntries: periodTotals, label: displayName }),
  );

  const chartOptions = { plugins: { legend: { display: false } } };


  async function startEditing() {
    editingName = true;
    await tick();
    editInput?.focus();
  }

  function onNameBlur() {
    if (busy) return;
    editingName = false;
  }

  async function saveName(e: KeyboardEvent) {
    if (e.key === "Escape") {
      editingName = false;
      return;
    }
    if (e.key !== "Enter") return;
    const input = e.target as HTMLInputElement;
    const name = input.value.trim();
    if (!name) return;
    await withBusy(async () => {
      await Account.update(accountId, { alias: name });
      account = await Account.get(accountId);
      editingName = false;
    });
  }

  async function onTypeChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    await withBusy(async () => {
      await Account.update(accountId, {
        type: (value || undefined) as AccountType | undefined,
      });
      account = await Account.get(accountId);
      await loadTransactions();
    });
  }
</script>

<div class="account-detail" class:busy>
  {#if !account}
    <SkeletonLoader variant="card" rows={3} />
    <SkeletonLoader variant="table" rows={5} />
  {:else}
    <span class="back-link" role="link" tabindex="0" onclick={() => navigate("/accounts")} onkeydown={(e) => e.key === "Enter" && navigate("/accounts")}>&larr; Back to accounts</span>

    <div class="header">
      <h2>
        {#if !isReadOnly(account) && editingName}
          <input
            class="edit-input"
            bind:this={editInput}
            value={displayName}
            onkeydown={saveName}
            onblur={onNameBlur}
          />
        {:else if !isReadOnly(account)}
          <span class="editable" role="button" tabindex="0" onclick={startEditing} onkeydown={(e) => e.key === "Enter" && startEditing()}>
            <AccountName name={account.name} alias={account.alias} />
          </span>
        {:else}
          <AccountName name={account.name} alias={account.alias} />
        {/if}
      </h2>
      {#if !isReadOnly(account)}
        <div class="meta">
          Type:
          <select onchange={onTypeChange}>
            <option value="" selected={!account.type}>Not set</option>
            {#each ACCOUNT_TYPES as t}
              <option value={t} selected={account.type === t}>{accountTypeLabel(t)}</option>
            {/each}
          </select>
        </div>
      {/if}
    </div>

    <SharingCard objectUri="at://{cachedDid()}/io.mygard.finance.account/{accountId}" ownerDid={account._owner} />

    {#if filteredTransactions === null}
      <SkeletonLoader variant="card" rows={3} />
      <SkeletonLoader variant="table" rows={5} />
    {:else}
      <div class="section-chart">
        <h3>
          Activity
          <TimeRangePicker value={timeRange} onTimeRangeChange={(r) => { timeRange = r; }} />
        </h3>
        {#if periodTotals.length > 0}
          <ChartWrapper chartType="bar" data={chartData} options={chartOptions} />
        {:else}
          <p>No transactions in this period.</p>
        {/if}
      </div>

      <div class="section-transactions">
        <h3>Transactions</h3>
        <PaginatedTable
          items={filteredTransactions}
          defaultPageSize={25}
          storageKey="account-transactions"
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
  {/if}
</div>

<style>
  .account-detail {
    display: block;
  }
  .account-detail.busy {
    pointer-events: none;
    cursor: wait;
    opacity: 0.6;
  }
  .back-link {
    color: var(--budgee-primary);
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    display: inline-block;
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
    margin-bottom: 0.25rem;
  }
  .meta {
    color: var(--budgee-text-muted);
    font-size: 0.9rem;
  }
  .editable {
    cursor: pointer;
    border-bottom: 1px dashed var(--budgee-text-muted);
  }
  .editable:hover {
    color: var(--budgee-primary);
  }
  .edit-input {
    font-size: inherit;
    font-family: inherit;
    padding: 2px 4px;
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    background: var(--budgee-surface);
    color: var(--budgee-text);
  }
  .section-chart {
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    background: var(--budgee-surface);
    display: flex;
    flex-direction: column;
    min-width: 0;
    margin-bottom: 1rem;
  }
  .section-chart h3 {
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .section-transactions {
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    background: var(--budgee-surface);
    margin-bottom: 1rem;
  }
  .section-transactions h3 {
    margin-top: 0;
  }
  .section-chart :global(.chart-wrapper) {
    max-height: 350px;
  }
  .section-transactions :global(tr) {
    cursor: pointer;
  }
  .section-transactions :global(tr:hover) {
    background-color: var(--budgee-bg);
  }
</style>
