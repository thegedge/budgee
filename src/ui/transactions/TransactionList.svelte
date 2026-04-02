<script lang="ts">
  import { Merchant } from "../../models/Merchant";
  import { Tag } from "../../models/Tag";
  import { Transaction } from "../../models/Transaction";
  import { formatAmount } from "../../formatAmount";
  import { importTransactions, type ImportMode } from "../../import/importTransactions";
  import type { ColumnMapping } from "../../import/parseCsv";
  import { showToast } from "../shared/toast";
  import { navigate } from "../navigate";
  import { useBusy } from "../../lib/busy.svelte";
  import { useSubscription } from "../../lib/subscribe.svelte";
  import { showConfirmDialog } from "../shared/confirmDialog";
  import { hideLoadingOverlay, showLoadingOverlay } from "../shared/loadingOverlay";
  import PaginatedTable from "../shared/PaginatedTable.svelte";
  import EmptyState from "../shared/EmptyState.svelte";
  import SkeletonLoader from "../shared/SkeletonLoader.svelte";
  import TagAutocomplete from "../tags/TagAutocomplete.svelte";
  import TagPills from "../tags/TagPills.svelte";
  import MerchantAutocomplete from "../merchants/MerchantAutocomplete.svelte";
  import Modal from "../shared/Modal.svelte";
  import TransactionImporter from "./TransactionImporter.svelte";
  import "../styles/button.css";
  import "../styles/input.css";
  import lockIcon from "lucide-static/icons/lock.svg?raw";

  type ImportDetail = {
    data: Record<string, string>[];
    mapping: ColumnMapping;
    accountId: string | undefined;
    importMode: ImportMode;
  };

  let transactions = $state<Transaction[] | null>(null);
  let tags = $state<Tag[]>([]);
  let tagMap = $state(new Map<string, Tag>());
  let merchants = $state(new Map<string, string>());
  let merchantList = $state<Merchant[]>([]);

  let selectedIds = $state(new Set<string>());
  let excludeTagIds = $state(new Set<string>());
  let noMerchant = $state(false);
  let bulkMerchantName = $state("");
  let showImporter = $state(false);
  let importFile = $state<File | undefined>(undefined);

  const { busy, withBusy } = useBusy();

  useSubscription([Transaction.subscribe, Tag.subscribe, Merchant.subscribe], refresh);

  $effect(() => {
    document.addEventListener("budgee-import-csv", onCsvDrop);
    return () => document.removeEventListener("budgee-import-csv", onCsvDrop);
  });

  function onCsvDrop(e: Event) {
    const file = (e as CustomEvent).detail.file as File;
    importFile = file;
    showImporter = true;
  }

  async function refresh() {
    const [txs, allTags, allMerchants] = await Promise.all([
      Transaction.all(),
      Tag.all(),
      Merchant.all(),
    ]);
    transactions = txs;
    tags = allTags;
    tagMap = new Map(allTags.map((t) => [t.id, t]));
    merchants = new Map(allMerchants.map((m) => [m.id, m.name]));
    merchantList = allMerchants;
  }

  function tagName(tagId: string): string {
    return tagMap.get(tagId)?.name ?? `#${tagId}`;
  }

  function merchantName(merchantId: string | undefined): string {
    if (!merchantId) return "";
    return merchants.get(merchantId) ?? "Unknown merchant";
  }

  function humanizeDate(dateStr: string): string {
    const [year, month, day] = dateStr.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  function toggleSelection(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    selectedIds = next;
  }

  function toggleSelectAll(pageTransactions: Transaction[]) {
    const pageIds = pageTransactions.map((t) => t.id);
    const allSelected = pageIds.every((id) => selectedIds.has(id));
    if (allSelected) {
      const next = new Set(selectedIds);
      for (const id of pageIds) next.delete(id);
      selectedIds = next;
    } else {
      selectedIds = new Set([...selectedIds, ...pageIds]);
    }
  }

  function clearSelection() {
    selectedIds = new Set();
    bulkMerchantName = "";
  }

  async function applyTagToSelected(tagId: string) {
    if (!transactions) return;
    await withBusy(async () => {
      const toUpdate = $state.snapshot(transactions!
        .filter((t) => selectedIds.has(t.id) && !t.tagIds.includes(tagId))
        .map((t) => ({ ...t, tagIds: [...t.tagIds, tagId] })));
      if (toUpdate.length > 0) {
        await Transaction.bulkPut(toUpdate);
      }
      showToast({ message: `Tag applied to ${toUpdate.length} transaction(s)`, type: "success" });
      clearSelection();
    });
  }

  async function bulkAddTag(tag: Tag) {
    await applyTagToSelected(tag.id);
  }

  async function bulkCreateTag(name: string) {
    const tag = await Tag.create(name);
    await applyTagToSelected(tag.id);
  }

  async function bulkSetMerchant() {
    const name = bulkMerchantName.trim();
    if (!name || !transactions) return;

    await withBusy(async () => {
      let merchant = merchantList.find((m) => m.name.toLowerCase() === name.toLowerCase());
      if (!merchant) {
        merchant = await Merchant.create(name);
      }

      const toUpdate = $state.snapshot(transactions!
        .filter((t) => selectedIds.has(t.id))
        .map((t) => ({ ...t, merchantId: merchant!.id })));
      if (toUpdate.length > 0) {
        await Transaction.bulkPut(toUpdate);
      }
      showToast({
        message: `Merchant assigned to ${toUpdate.length} transaction(s)`,
        type: "success",
      });
      clearSelection();
    });
  }

  async function bulkDelete() {
    if (!transactions) return;
    const count = selectedIds.size;
    const confirmed = await showConfirmDialog({
      heading: "Delete Transactions",
      message: `Delete ${count} selected transaction${count === 1 ? "" : "s"}? This cannot be undone.`,
      confirmLabel: "Delete",
      danger: true,
    });
    if (!confirmed) return;

    await withBusy(async () => {
      const ids = [...selectedIds];
      await Transaction.bulkRemove(ids);
      showToast({ message: `${ids.length} transaction(s) deleted`, type: "success" });
      clearSelection();
    });
  }

  function toggleExcludeTag(tagId: string) {
    const next = new Set(excludeTagIds);
    if (next.has(tagId)) {
      next.delete(tagId);
    } else {
      next.add(tagId);
    }
    excludeTagIds = next;
  }

  function onExcludeTagChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value;
    if (value) toggleExcludeTag(value);
    (e.target as HTMLSelectElement).value = "";
  }

  async function onImportStart(detail: ImportDetail) {
    showImporter = false;
    importFile = undefined;
    transactions = null;

    showLoadingOverlay("Importing transactions...");
    try {
      await importTransactions(detail.data, detail.mapping, {
        accountId: detail.accountId,
        importMode: detail.importMode,
      });
      await refresh();
    } finally {
      hideLoadingOverlay();
    }
  }

  const comparators = {
    date: (a: Transaction, b: Transaction) => a.date.localeCompare(b.date),
    merchant: (a: Transaction, b: Transaction) =>
      merchantName(a.merchantId).localeCompare(merchantName(b.merchantId)),
    description: (a: Transaction, b: Transaction) => a.description.localeCompare(b.description),
    amount: (a: Transaction, b: Transaction) => a.amount - b.amount,
    tags: (a: Transaction, b: Transaction) => {
      const aNames = a.tagIds.map((id) => tagName(id)).join(",");
      const bNames = b.tagIds.map((id) => tagName(id)).join(",");
      return aNames.localeCompare(bNames);
    },
  };

  function filterFn(t: Transaction, filter: string): boolean {
    if (noMerchant && t.merchantId) return false;
    if (t.tagIds.some((id) => excludeTagIds.has(id))) return false;
    if (!filter) return true;
    const lower = filter.toLowerCase();
    if (t.description.toLowerCase().includes(lower)) return true;
    if (t.tagIds.some((id) => tagName(id).toLowerCase().includes(lower))) return true;
    if (t.merchantId && merchants.get(t.merchantId)?.toLowerCase().includes(lower)) return true;
    if (t.date.includes(lower)) return true;
    if (t.amount.toFixed(2).includes(lower)) return true;
    return false;
  }

  let hasActiveFilters = $derived(excludeTagIds.size > 0 || noMerchant);

  let allSelected = $derived(
    (transactions ?? []).length > 0 &&
      (transactions ?? []).every((t) => selectedIds.has(t.id)),
  );
</script>

<div class="transaction-list" class:busy>
  {#if transactions === null}
    <SkeletonLoader variant="table" rows={8} />
  {:else if transactions.length === 0}
    <EmptyState heading="No transactions yet" description="Import a CSV file to get started.">
      {#snippet children()}
        <button class="import-toggle" onclick={() => { showImporter = true; }}>Import CSV</button>
      {/snippet}
    </EmptyState>
    {#if showImporter}
      <Modal heading="Import Transactions" onClose={() => { showImporter = false; importFile = undefined; }}>
        {#snippet children()}
          <TransactionImporter file={importFile} onImportStart={onImportStart} />
        {/snippet}
      </Modal>
    {/if}
  {:else}
    <button class="import-toggle" onclick={() => { showImporter = true; }}>Import CSV</button>

    {#if showImporter}
      <Modal heading="Import Transactions" onClose={() => { showImporter = false; }}>
        {#snippet children()}
          <TransactionImporter file={importFile} onImportStart={onImportStart} />
        {/snippet}
      </Modal>
    {/if}

    <div class="filter-bar">
      <div class="filter-group">
        <label for="exclude-tag">Exclude tag:</label>
        <select id="exclude-tag" onchange={onExcludeTagChange}>
          <option value="">Select…</option>
          {#each tags.filter((t) => !excludeTagIds.has(t.id)) as t}
            <option value={t.id}>{t.name}</option>
          {/each}
        </select>
      </div>
      <div class="filter-group">
        <label>
          <input type="checkbox" checked={noMerchant} onchange={() => { noMerchant = !noMerchant; }} />
          No merchant
        </label>
      </div>
      {#if hasActiveFilters}
        <div class="active-filters">
          {#each [...excludeTagIds] as id}
            <span class="filter-chip">
              Not: {tagName(id)}
              <button class="chip-remove" onclick={() => toggleExcludeTag(id)}>×</button>
            </span>
          {/each}
          {#if noMerchant}
            <span class="filter-chip">
              No merchant
              <button class="chip-remove" onclick={() => { noMerchant = false; }}>×</button>
            </span>
          {/if}
        </div>
      {/if}
    </div>

    {#if selectedIds.size > 0}
      <div class="bulk-bar">
        <span class="selected-count">{selectedIds.size} selected</span>
        <div class="bulk-action">
          <span class="bulk-label">Tag:</span>
          <TagAutocomplete
            {tags}
            selectedTagIds={[]}
            excludeIds={[]}
            onTagSelected={(tag) => bulkAddTag(tag)}
            onTagCreated={(name) => bulkCreateTag(name)}
          />
        </div>
        <div class="bulk-action">
          <span class="bulk-label">Merchant:</span>
          <MerchantAutocomplete
            merchants={merchantList}
            value={bulkMerchantName}
            onMerchantChanged={(name) => { bulkMerchantName = name; }}
          />
          <button onclick={bulkSetMerchant} disabled={!bulkMerchantName.trim()}>Set</button>
        </div>
        <button class="danger" onclick={bulkDelete}>Delete selected</button>
        <button onclick={clearSelection}>Clear selection</button>
      </div>
    {/if}

    {#snippet checkboxHeader()}
      <input
        type="checkbox"
        checked={allSelected}
        onchange={() => toggleSelectAll(transactions ?? [])}
        aria-label="Select all transactions"
      />
    {/snippet}

    <PaginatedTable
      items={transactions}
      defaultPageSize={50}
      storageKey="transactions"
      columns={[
        { headerSnippet: checkboxHeader, class: "col-checkbox" },
        { label: "Date", sortKey: "date", class: "col-date" },
        { label: "Merchant", sortKey: "merchant" },
        { label: "Description", sortKey: "description", class: "col-grow" },
        { label: "Amount", sortKey: "amount", class: "col-amount" },
        { label: "Tags", sortKey: "tags", class: "col-tags" },
      ]}
      {comparators}
      {filterFn}
      defaultSortCol="date"
      defaultSortDir="desc"
    >
      {#snippet renderRow(t: Transaction)}
        <tr class="clickable-row" onclick={() => navigate(`/transactions/${t.id}`)}>
          <td class="col-checkbox" onclick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={selectedIds.has(t.id)}
              onchange={() => toggleSelection(t.id)}
              disabled={!!t._owner}
            />
          </td>
          <td class="col-date">{humanizeDate(t.date)}</td>
          <td>
            {#if t.merchantId && merchants.has(t.merchantId)}
              <a
                class="entity-link"
                href="/merchants/{t.merchantId}"
                onclick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/merchants/${t.merchantId}`); }}
              >{merchants.get(t.merchantId!)}</a>
            {:else if t.merchantId}
              <span class="unknown-merchant">Unknown merchant</span>
            {/if}
          </td>
          <td class="col-grow">
            {t.description}
            {#if t._owner}
              <span class="shared-lock" aria-label="Shared record">{@html lockIcon}</span>
            {/if}
          </td>
          <td class="col-amount {t.amount < 0 ? 'amount-negative' : 'amount-positive'}">
            {formatAmount(t.amount)}
          </td>
          <td class="col-tags">
            <TagPills {tags} tagIds={t.tagIds} />
          </td>
        </tr>
      {/snippet}
    </PaginatedTable>
  {/if}
</div>

<style>
  .transaction-list {
    display: block;
  }
  .transaction-list.busy {
    pointer-events: none;
    cursor: wait;
    opacity: 0.6;
  }
  .col-amount {
    width: 8rem;
  }
  .col-date {
    white-space: nowrap;
  }
  .col-checkbox {
    width: min-content;
  }
  .bulk-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0.75rem;
    background: var(--budgee-bg);
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }
  .bulk-bar .selected-count {
    font-weight: 600;
    white-space: nowrap;
  }
  .bulk-bar .bulk-label {
    font-size: 0.85rem;
    white-space: nowrap;
  }
  .bulk-bar .bulk-action {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .bulk-bar button {
    padding: 4px 10px;
    cursor: pointer;
  }
  .filter-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
    font-size: 0.85rem;
  }
  .filter-group {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .filter-group select {
    padding: 2px 6px;
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    background: var(--budgee-surface);
    font-size: 0.85rem;
  }
  .active-filters {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }
  .filter-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 2px 8px;
    border-radius: 12px;
    background: var(--budgee-bg);
    border: 1px solid var(--budgee-border);
    font-size: 0.8rem;
  }
  .chip-remove {
    all: unset;
    cursor: pointer;
    font-size: 0.9rem;
    line-height: 1;
    padding: 0 2px;
  }
  .import-toggle {
    padding: 0.4rem 0.8rem;
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
  }
  .unknown-merchant {
    color: var(--budgee-text-muted);
    font-style: italic;
    font-size: 0.875rem;
  }
  .shared-lock {
    display: inline-flex;
    vertical-align: middle;
    margin-left: 0.3rem;
    color: var(--budgee-primary, lch(72.1% 25.1 246.4));
    opacity: 0.7;
  }
  .shared-lock :global(svg) {
    width: 0.85rem;
    height: 0.85rem;
  }
</style>
