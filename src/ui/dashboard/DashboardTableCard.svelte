<script lang="ts">
  import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
  import wrenchIcon from "lucide-static/icons/wrench.svg?raw";
  import { transactionStats } from "../../charting/transactionStats";
  import { formatAmount } from "../../formatAmount";
  import type { DashboardTableColumn } from "../../database/types";
  import type { Account } from "../../models/Account";
  import type { DashboardTable } from "../../models/DashboardTable";
  import type { Merchant } from "../../models/Merchant";
  import type { Tag } from "../../models/Tag";
  import type { Transaction } from "../../models/Transaction";
  import { navigate } from "../navigate";
  import { resizable } from "../../lib/resizable";
  import PaginatedTable from "../shared/PaginatedTable.svelte";
  import AccountName from "../shared/AccountName.svelte";
  import TagPills from "../tags/TagPills.svelte";
  import "../styles/icon-button.css";
  import "../styles/table.css";

  interface MerchantRow {
    merchant: Merchant;
    transactionCount: number;
    totalAmount: number;
  }

  interface TagRow {
    tag: Tag;
    transactionCount: number;
    totalAmount: number;
  }

  let {
    config,
    transactions = [],
    tags = [],
    merchants = [],
    accounts = [],
    maxColumns = 12,
    maxRows = 4,
    onTableEdit,
    onTableResized,
    onTableDeleted,
  }: {
    config: DashboardTable;
    transactions?: Transaction[];
    tags?: Tag[];
    merchants?: Merchant[];
    accounts?: Account[];
    maxColumns?: number;
    maxRows?: number;
    onTableEdit?: (table: DashboardTable) => void;
    onTableResized?: (id: string, update: { colSpan?: number; rowSpan?: number }) => void;
    onTableDeleted?: (id: string) => void;
  } = $props();

  function merchantName(merchantId: string | undefined): string {
    if (!merchantId) return "";
    return merchants.find((m) => m.id === merchantId)?.name ?? "";
  }

  function columnLabel(col: DashboardTableColumn): string {
    const labels: Record<DashboardTableColumn, string> = {
      date: "Date",
      amount: "Amount",
      description: "Description",
      merchant: "Merchant",
      tags: "Tags",
      account: "Account",
      name: "Name",
      transactionCount: "Transactions",
      totalAmount: "Total Amount",
    };
    return labels[col];
  }

  function columnClass(col: DashboardTableColumn): string {
    if (col === "amount" || col === "totalAmount") return "col-amount";
    if (col === "description" || col === "name") return "col-grow";
    return "";
  }

  let sortedTransactions = $derived([...transactions].sort((a, b) => b.date.localeCompare(a.date)));

  let merchantRows = $derived.by((): MerchantRow[] => {
    const stats = transactionStats(transactions, (tx) => [(tx as Transaction).merchantId]);
    return merchants.map((m) => {
      const s = stats.get(m.id);
      return { merchant: m, transactionCount: s?.count ?? 0, totalAmount: s?.total ?? 0 };
    });
  });

  let tagRows = $derived.by((): TagRow[] => {
    const stats = transactionStats(transactions, (tx) => (tx as Transaction).tagIds);
    return tags.map((t) => {
      const s = stats.get(t.id);
      return { tag: t, transactionCount: s?.count ?? 0, totalAmount: s?.total ?? 0 };
    });
  });

  let columns = $derived(config.columns);
  let columnDefs = $derived(columns.map((col) => ({ label: columnLabel(col), class: columnClass(col) })));
</script>

<div
  class="dashboard-table-card"
  use:resizable={{
    colSpan: config.colSpan,
    rowSpan: config.rowSpan,
    maxColumns,
    maxRows,
    onResized: (update) => onTableResized?.(config.id, update),
  }}
>
  <div data-resize-handle="horizontal"></div>
  <div data-resize-handle="vertical"></div>
  <div data-resize-handle="corner"></div>
  <div class="header">
    <h4>{config.title}</h4>
    <div class="actions">
      <button
        class="icon-btn"
        title="Edit"
        aria-label="Edit"
        onclick={() => onTableEdit?.(config)}
      >{@html wrenchIcon}</button>
      <button
        class="icon-btn icon-btn--danger"
        title="Delete"
        aria-label="Delete"
        onclick={() => onTableDeleted?.(config.id)}
      >{@html trash2Icon}</button>
    </div>
  </div>

  {#if config.model === "transactions"}
    <PaginatedTable
      items={sortedTransactions}
      defaultPageSize={10}
      storageKey="dashboard-table-{config.id}"
      columns={columnDefs}
    >
      {#snippet renderRow(t: Transaction)}
        <tr>
          {#each columns as col}
            {#if col === "date"}
              <td>{t.date}</td>
            {:else if col === "amount"}
              <td class="col-amount {t.amount < 0 ? 'amount-negative' : 'amount-positive'}">{formatAmount(t.amount)}</td>
            {:else if col === "description"}
              <td class="col-grow">{t.description}</td>
            {:else if col === "merchant"}
              <td>{merchantName(t.merchantId)}</td>
            {:else if col === "tags"}
              <td><TagPills {tags} tagIds={t.tagIds} /></td>
            {:else if col === "account"}
              {@const acct = accounts.find((a) => a.id === t.accountId)}
              {#if acct}
                <td>
                  <a
                    class="entity-link"
                    href="/accounts/{acct.id}"
                    onclick={(e) => { e.preventDefault(); navigate(`/accounts/${acct.id}`); }}
                  >
                    <AccountName name={acct.name} alias={acct.alias} />
                  </a>
                </td>
              {:else}
                <td></td>
              {/if}
            {:else}
              <td></td>
            {/if}
          {/each}
        </tr>
      {/snippet}
    </PaginatedTable>
  {:else if config.model === "merchants"}
    <PaginatedTable
      items={merchantRows}
      defaultPageSize={10}
      storageKey="dashboard-table-{config.id}"
      columns={columnDefs}
    >
      {#snippet renderRow(row: MerchantRow)}
        <tr>
          {#each columns as col}
            {#if col === "name"}
              <td class="col-grow">{row.merchant.name}</td>
            {:else if col === "transactionCount"}
              <td>{row.transactionCount}</td>
            {:else if col === "totalAmount"}
              <td class="col-amount {row.totalAmount < 0 ? 'amount-negative' : 'amount-positive'}">{formatAmount(row.totalAmount)}</td>
            {:else}
              <td></td>
            {/if}
          {/each}
        </tr>
      {/snippet}
    </PaginatedTable>
  {:else if config.model === "tags"}
    <PaginatedTable
      items={tagRows}
      defaultPageSize={10}
      storageKey="dashboard-table-{config.id}"
      columns={columnDefs}
    >
      {#snippet renderRow(row: TagRow)}
        <tr>
          {#each columns as col}
            {#if col === "name"}
              <td class="col-grow">{row.tag.name}</td>
            {:else if col === "transactionCount"}
              <td>{row.transactionCount}</td>
            {:else if col === "totalAmount"}
              <td class="col-amount {row.totalAmount < 0 ? 'amount-negative' : 'amount-positive'}">{formatAmount(row.totalAmount)}</td>
            {:else}
              <td></td>
            {/if}
          {/each}
        </tr>
      {/snippet}
    </PaginatedTable>
  {/if}
</div>

<style>
  .dashboard-table-card {
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    background: var(--budgee-surface);
    height: 100%;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  h4 {
    margin: 0;
  }

  .actions {
    display: flex;
    gap: 0.25rem;
  }

  [data-resize-handle="horizontal"] {
    position: absolute;
    right: 0;
    top: 0;
    width: 6px;
    height: 100%;
    cursor: col-resize;
    background: transparent;
    transition: background 0.15s;

    &:hover,
    :global([data-resizing]) & {
      background: var(--budgee-primary);
    }
  }

  [data-resize-handle="vertical"] {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 6px;
    cursor: row-resize;
    background: transparent;
    transition: background 0.15s;

    &:hover,
    :global([data-resizing-vertical]) & {
      background: var(--budgee-primary);
    }
  }

  [data-resize-handle="corner"] {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 12px;
    height: 12px;
    cursor: nwse-resize;
    background: transparent;
    z-index: 1;

    &:hover,
    :global([data-resizing-corner]) & {
      background: var(--budgee-primary);
    }
  }
</style>
