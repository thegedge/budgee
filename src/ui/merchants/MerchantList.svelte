<script lang="ts">
  import { transactionStats } from "../../charting/transactionStats";
  import { formatAmount } from "../../formatAmount";
  import { Merchant } from "../../models/Merchant";
  import { Transaction } from "../../models/Transaction";
  import { navigate } from "../navigate";
  import { useSubscription } from "../../lib/subscribe.svelte";
  import EmptyState from "../shared/EmptyState.svelte";
  import PaginatedTable from "../shared/PaginatedTable.svelte";
  import SkeletonLoader from "../shared/SkeletonLoader.svelte";
  import "../styles/table.css";

  interface MerchantRow {
    merchant: Merchant;
    transactionCount: number | null;
    totalSpend: number | null;
  }

  let rows = $state<MerchantRow[] | null>(null);

  useSubscription([Merchant.subscribe, Transaction.subscribe], async () => {
    const merchants = await Merchant.all();
    rows = merchants.map((m) => ({
      merchant: m,
      transactionCount: null,
      totalSpend: null,
    }));
    const transactions = await Transaction.all();
    const stats = transactionStats(transactions, (tx) => [(tx as Transaction).merchantId]);
    rows = rows.map((row) => {
      const s = stats.get(row.merchant.id);
      return { ...row, transactionCount: s?.count ?? 0, totalSpend: s?.total ?? 0 };
    });
  });
</script>

{#if rows === null}
  <SkeletonLoader variant="table" rows={5} />
{:else if rows.length === 0}
  <EmptyState
    heading="No merchants yet"
    description="Merchants are created automatically when you assign them to transactions or rules."
  />
{:else}
  <PaginatedTable
    items={rows}
    defaultPageSize={25}
    storageKey="merchants"
    columns={[
      { label: "Name", sortKey: "name", class: "col-grow" },
      { label: "Transactions", sortKey: "count" },
      { label: "Total Spend", sortKey: "spend", class: "col-amount" },
    ]}
    comparators={{
      name: (a: MerchantRow, b: MerchantRow) => a.merchant.name.localeCompare(b.merchant.name),
      count: (a: MerchantRow, b: MerchantRow) => (a.transactionCount ?? 0) - (b.transactionCount ?? 0),
      spend: (a: MerchantRow, b: MerchantRow) => (a.totalSpend ?? 0) - (b.totalSpend ?? 0),
    }}
    filterFn={(row: MerchantRow, filter: string) => {
      const lower = filter.toLowerCase();
      if (row.merchant.name.toLowerCase().includes(lower)) return true;
      if (row.transactionCount != null && String(row.transactionCount).includes(lower)) return true;
      if (row.totalSpend != null && row.totalSpend.toFixed(2).includes(lower)) return true;
      return false;
    }}
    defaultSortCol="name"
    defaultSortDir="asc"
  >
    {#snippet renderRow(row: MerchantRow)}
      <tr class="clickable-row" onclick={() => navigate(`/merchants/${row.merchant.id}`)}>
        <td class="col-grow">{row.merchant.name}</td>
        <td>{row.transactionCount ?? "…"}</td>
        <td class="col-amount {row.totalSpend != null && row.totalSpend < 0 ? 'amount-negative' : 'amount-positive'}">
          {row.totalSpend != null ? formatAmount(row.totalSpend) : "…"}
        </td>
      </tr>
    {/snippet}
  </PaginatedTable>
{/if}
