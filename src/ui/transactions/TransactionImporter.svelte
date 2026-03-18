<script lang="ts">
  import { Account } from "../../models/Account";
  import type { ImportMode } from "../../import/importTransactions";
  import { type ColumnMapping, type CsvParseResult, parseCsv } from "../../import/parseCsv";
  import { useBusy } from "../../lib/busy.svelte";
  import "../styles/button.css";
  import "../styles/input.css";
  import "../styles/table.css";

  const MAPPING_FIELDS: { key: keyof ColumnMapping; label: string }[] = [
    { key: "date", label: "Date" },
    { key: "amount", label: "Debit" },
    { key: "credit", label: "Credit" },
    { key: "description", label: "Description" },
    { key: "account", label: "Account" },
  ];

  let {
    file = undefined,
    onImportStart,
  }: {
    file?: File;
    onImportStart?: (detail: {
      data: Record<string, string>[];
      mapping: ColumnMapping;
      accountId: string | undefined;
      importMode: ImportMode;
    }) => void;
  } = $props();

  let step = $state<"upload" | "mapping">("upload");
  let result = $state<CsvParseResult | undefined>(undefined);
  let mapping = $state<ColumnMapping>({});
  let accounts = $state<Account[]>([]);
  let accountName = $state("");
  let importMode = $state<ImportMode>("append");

  const { busy, withBusy } = useBusy();

  $effect(() => {
    if (file) {
      step = "mapping";
      loadFile(file);
    }
  });

  async function loadFile(f: File) {
    await withBusy(async () => {
      accounts = await Account.all();
      result = await parseCsv(f);
      mapping = { ...result.suggestedMapping };
      step = "mapping";
    });
  }

  async function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    await loadFile(input.files[0]);
  }

  function onMappingChange(key: keyof ColumnMapping, e: Event) {
    const value = (e.target as HTMLSelectElement).value || undefined;
    mapping = { ...mapping, [key]: value };
  }

  async function resolveAccountId(): Promise<string | undefined> {
    if (mapping.account) return undefined;

    const name = accountName.trim();
    if (!name) return undefined;

    const lower = name.toLowerCase();
    const existing = accounts.find(
      (a) => a.name.toLowerCase() === lower || a.alias?.toLowerCase() === lower,
    );
    if (existing) return existing.id;

    return (await Account.create({ name })).id;
  }

  async function onImport() {
    if (!result) return;

    const needsAccount = !mapping.account;
    const accountId = await resolveAccountId();
    if (needsAccount && accountId === undefined) return;

    onImportStart?.({
      data: result.data,
      mapping,
      accountId,
      importMode,
    });
  }
</script>

<div class="transaction-importer" class:busy>
  {#if step === "upload"}
    <label for="file-upload">Select a CSV file:</label>
    <input type="file" id="file-upload" accept=".csv" onchange={onFileChange} />
  {:else if result}
    {@const headers = result.meta.fields ?? []}
    {@const previewData = result.data.slice(0, 5)}

    <h4>Column Mapping</h4>
    <div class="mapping-form">
      {#each MAPPING_FIELDS as { key, label }}
        <label for="mapping-{key}">{label}:</label>
        <select id="mapping-{key}" onchange={(e) => onMappingChange(key, e)}>
          <option value="">-- Unmapped --</option>
          {#each headers as h}
            <option value={h} selected={mapping[key] === h}>{h}</option>
          {/each}
        </select>
      {/each}
    </div>

    {#if !mapping.account}
      <h4>Account</h4>
      <div class="mapping-form">
        <label for="importer-account">Account:</label>
        <input
          id="importer-account"
          type="text"
          list="account-options"
          value={accountName}
          oninput={(e) => { accountName = (e.target as HTMLInputElement).value; }}
          placeholder="Type or select an account"
        />
        <datalist id="account-options">
          {#each accounts as a}
            <option value={a.name}></option>
          {/each}
        </datalist>
      </div>
    {/if}

    <div class="mapping-form">
      <label for="importer-mode">Mode:</label>
      <select id="importer-mode" onchange={(e) => { importMode = (e.target as HTMLSelectElement).value as ImportMode; }}>
        <option value="append" selected={importMode === "append"}>Append to existing</option>
        <option value="replace" selected={importMode === "replace"}>Replace existing transactions</option>
      </select>
    </div>

    <button onclick={onImport}>Import</button>

    <h4>Preview</h4>
    <div class="preview">
      <table>
        <thead>
          <tr>
            {#each headers as h}
              <th>{h}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each previewData as row}
            <tr>
              {#each headers as h}
                <td>{row[h]}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<style>
  .transaction-importer {
    display: block;
  }
  .transaction-importer.busy {
    pointer-events: none;
    cursor: wait;
    opacity: 0.6;
  }
  .mapping-form {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;
    align-items: center;
    max-width: 400px;
  }
  select {
    padding: 4px 8px;
  }
  button {
    padding: 0.5rem 1rem;
  }
</style>
