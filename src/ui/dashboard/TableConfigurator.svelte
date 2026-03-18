<script lang="ts">
  import type { DashboardTableColumn, DashboardTableModel } from "../../database/types";
  import type { DashboardTable } from "../../models/DashboardTable";
  import "../styles/button.css";
  import "../styles/input.css";

  let { editingTable, onTableSaved }: {
    editingTable?: DashboardTable;
    onTableSaved?: (detail: {
      id?: string;
      title: string;
      model: DashboardTableModel;
      columns: DashboardTableColumn[];
    }) => void;
  } = $props();

  const COLUMNS_BY_MODEL: Record<DashboardTableModel, { id: DashboardTableColumn; label: string }[]> = {
    transactions: [
      { id: "date", label: "Date" },
      { id: "amount", label: "Amount" },
      { id: "description", label: "Description" },
      { id: "merchant", label: "Merchant" },
      { id: "tags", label: "Tags" },
      { id: "account", label: "Account" },
    ],
    merchants: [
      { id: "name", label: "Name" },
      { id: "transactionCount", label: "Transaction Count" },
      { id: "totalAmount", label: "Total Amount" },
    ],
    tags: [
      { id: "name", label: "Name" },
      { id: "transactionCount", label: "Transaction Count" },
      { id: "totalAmount", label: "Total Amount" },
    ],
  };

  function defaultColumns(model: DashboardTableModel): DashboardTableColumn[] {
    return COLUMNS_BY_MODEL[model].map((c) => c.id);
  }

  let title = $state("");
  let model = $state<DashboardTableModel>("transactions");
  let columns = $state<DashboardTableColumn[]>(defaultColumns("transactions"));
  let initialized = $state(false);

  $effect(() => {
    if (editingTable && !initialized) {
      title = editingTable.title;
      model = editingTable.model;
      columns = [...editingTable.columns];
      initialized = true;
    }
  });

  let availableColumns = $derived(COLUMNS_BY_MODEL[model]);

  function onModelChange(newModel: DashboardTableModel) {
    model = newModel;
    columns = defaultColumns(newModel);
  }

  function toggleColumn(col: DashboardTableColumn, checked: boolean) {
    if (checked) {
      const ordered = COLUMNS_BY_MODEL[model].map((c) => c.id);
      columns = ordered.filter((c) => columns.includes(c) || c === col);
    } else {
      columns = columns.filter((c) => c !== col);
    }
  }

  function onSave() {
    const trimmed = title.trim();
    if (!trimmed || columns.length === 0) return;

    onTableSaved?.({
      id: editingTable?.id,
      title: trimmed,
      model,
      columns,
    });

    title = "";
    initialized = false;
  }
</script>

<div class="table-configurator">
  <h4>{editingTable ? "Edit Table" : "Add Table"}</h4>
  <div class="form-grid">
    <label for="tc-title">Title:</label>
    <input
      id="tc-title"
      type="text"
      bind:value={title}
    />
    <label for="tc-model">Model:</label>
    <select
      id="tc-model"
      onchange={(e) => onModelChange((e.target as HTMLSelectElement).value as DashboardTableModel)}
    >
      <option value="transactions" selected={model === "transactions"}>Transactions</option>
      <option value="merchants" selected={model === "merchants"}>Merchants</option>
      <option value="tags" selected={model === "tags"}>Tags</option>
    </select>
  </div>
  <span class="field-label">Columns:</span>
  <div class="checkbox-list">
    {#each availableColumns as col}
      <label>
        <input
          type="checkbox"
          checked={columns.includes(col.id)}
          onchange={(e) => toggleColumn(col.id, (e.target as HTMLInputElement).checked)}
        />
        {col.label}
      </label>
    {/each}
  </div>
  <button onclick={onSave}>{editingTable ? "Update Table" : "Save to Dashboard"}</button>
</div>

<style>
  .table-configurator {
    display: block;
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    background: var(--budgee-surface);
  }

  h4 {
    margin-top: 0;
  }

  .form-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;
    align-items: center;
    max-width: 400px;
    margin-bottom: 1rem;
  }

  input,
  select {
    padding: 4px 8px;
  }

  button {
    margin-right: 0.5rem;
  }

  .checkbox-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 1rem;
    margin-bottom: 1rem;
  }

  .checkbox-list label {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.9rem;
  }
</style>
