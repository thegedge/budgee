<script lang="ts">
  import { transactionStats } from "../../charting/transactionStats";
  import { accountTypeLabel } from "../../database/types";
  import { formatAmount } from "../../formatAmount";
  import { Account } from "../../models/Account";
  import { Transaction } from "../../models/Transaction";
  import { navigate } from "../navigate";
  import { useSubscription } from "../../lib/subscribe.svelte";
  import AccountName from "../shared/AccountName.svelte";
  import EmptyState from "../shared/EmptyState.svelte";
  import PaginatedTable from "../shared/PaginatedTable.svelte";
  import SkeletonLoader from "../shared/SkeletonLoader.svelte";

  interface AccountRow {
    account: Account;
    transactionCount: number | null;
    balance: number | null;
  }

  let rows = $state<AccountRow[] | null>(null);

  useSubscription([Account.subscribe, Transaction.subscribe], async () => {
    const accounts = await Account.all();
    rows = accounts.map((a) => ({
      account: a,
      transactionCount: null,
      balance: null,
    }));
    await loadTransactionStats();
  });

  async function loadTransactionStats() {
    const transactions = await Transaction.all();
    const stats = transactionStats(transactions, (tx) => [(tx as Transaction).accountId]);
    rows = rows!.map((row) => {
      const s = stats.get(row.account.id);
      return { ...row, transactionCount: s?.count ?? 0, balance: s?.total ?? 0 };
    });
  }
</script>

{#if rows === null}
  <SkeletonLoader variant="table" rows={5} />
{:else if rows.length === 0}
  <EmptyState
    heading="No accounts yet"
    description="Accounts are created when you import transactions from a CSV."
  />
{:else}
  <PaginatedTable
    items={rows}
    defaultPageSize={25}
    storageKey="accounts"
    columns={[
      { label: "Name", sortKey: "name", class: "col-grow" },
      { label: "Type", sortKey: "type" },
      { label: "Transactions", sortKey: "count" },
      { label: "Balance", sortKey: "balance", class: "col-amount" },
    ]}
    comparators={{
      name: (a: AccountRow, b: AccountRow) =>
        (a.account.alias ?? a.account.name).localeCompare(b.account.alias ?? b.account.name),
      type: (a: AccountRow, b: AccountRow) =>
        (a.account.type ?? "").localeCompare(b.account.type ?? ""),
      count: (a: AccountRow, b: AccountRow) =>
        (a.transactionCount ?? 0) - (b.transactionCount ?? 0),
      balance: (a: AccountRow, b: AccountRow) => (a.balance ?? 0) - (b.balance ?? 0),
    }}
    filterFn={(row: AccountRow, filter: string) => {
      const lower = filter.toLowerCase();
      if (row.account.name.toLowerCase().includes(lower)) return true;
      if (row.account.alias?.toLowerCase().includes(lower)) return true;
      if (row.account.type?.toLowerCase().includes(lower)) return true;
      if (row.transactionCount != null && String(row.transactionCount).includes(lower)) return true;
      if (row.balance != null && row.balance.toFixed(2).includes(lower)) return true;
      return false;
    }}
    defaultSortCol="name"
    defaultSortDir="asc"
  >
    {#snippet renderRow(row: AccountRow)}
      <tr class="clickable-row" onclick={() => navigate(`/accounts/${row.account.id}`)}>
        <td class="col-grow">
          <AccountName name={row.account.name} alias={row.account.alias} />
        </td>
        <td>{row.account.type ? accountTypeLabel(row.account.type) : ""}</td>
        <td>{row.transactionCount ?? "…"}</td>
        <td
          class="col-amount {row.balance != null && row.balance < 0
            ? 'amount-negative'
            : row.balance != null
              ? 'amount-positive'
              : ''}"
        >
          {row.balance != null ? formatAmount(row.balance) : "…"}
        </td>
      </tr>
    {/snippet}
  </PaginatedTable>
{/if}
