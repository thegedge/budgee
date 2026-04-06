<script lang="ts">
  import { deleteAllDatabases } from "../../database/Db";
  import { showConfirmDialog } from "./confirmDialog";

  let { error = "An unexpected error occurred.", isDatabaseError = false }: {
    error?: string;
    isDatabaseError?: boolean;
  } = $props();

  let exporting = $state(false);
  let deleting = $state(false);

  async function exportData() {
    exporting = true;
    try {
      const dump = await exportAllIndexedDBData();
      const blob = new Blob([JSON.stringify(dump, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `budgee-raw-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Export failed:", e);
      alert("Export failed. Check the browser console for details.");
    } finally {
      exporting = false;
    }
  }

  async function deleteAndReload() {
    const confirmed = await showConfirmDialog({
      heading: "Delete Database",
      message: "This will permanently delete all local data. Are you sure?",
      confirmLabel: "Delete",
      danger: true,
    });
    if (!confirmed) return;
    deleting = true;
    try {
      await deleteAllDatabases();
      window.location.reload();
    } catch (e) {
      console.error("Delete failed:", e);
      alert("Delete failed. Check the browser console for details.");
      deleting = false;
    }
  }

  async function exportAllIndexedDBData(): Promise<Record<string, Record<string, unknown[]>>> {
    const allDbs = await indexedDB.databases();
    const budgeeDbs = allDbs.filter((db) => db.name?.startsWith("budgee"));
    const result: Record<string, Record<string, unknown[]>> = {};

    for (const dbInfo of budgeeDbs) {
      const dbName = dbInfo.name!;
      const db = await new Promise<IDBDatabase>((resolve, reject) => {
        const req = indexedDB.open(dbName);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });

      const dbDump: Record<string, unknown[]> = {};
      const storeNames = Array.from(db.objectStoreNames);

      if (storeNames.length > 0) {
        const tx = db.transaction(storeNames, "readonly");
        for (const storeName of storeNames) {
          dbDump[storeName] = await new Promise<unknown[]>((resolve, reject) => {
            const req = tx.objectStore(storeName).getAll();
            req.onsuccess = () => resolve(req.result as unknown[]);
            req.onerror = () => reject(req.error);
          });
        }
      }

      db.close();
      result[dbName] = dbDump;
    }

    return result;
  }
</script>

<div class="overlay">
  <div class="card">
    <h2>{isDatabaseError ? "Database Error" : "Something Went Wrong"}</h2>
    <p>{error}</p>
    <div class="actions">
      {#if isDatabaseError}
        <button class="export-btn" disabled={exporting} onclick={exportData}>
          {exporting ? "Exporting\u2026" : "Export raw data"}
        </button>
        <button class="delete-btn" disabled={deleting} onclick={deleteAndReload}>
          {deleting ? "Deleting\u2026" : "Delete database and reload"}
        </button>
      {:else}
        <button class="reload-btn" onclick={() => window.location.reload()}>Reload</button>
      {/if}
    </div>
  </div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    font-family: sans-serif;
    color: white;
  }
  .card {
    background: #1e1e2e;
    color: white;
    border: 1px solid #444;
    border-radius: 12px;
    padding: 2rem;
    max-width: 480px;
    text-align: center;
  }
  h2 { margin: 0 0 1rem; font-size: 1.4rem; }
  p { color: var(--budgee-text-muted, #aaa); line-height: 1.5; margin: 0 0 1.5rem; }
  .actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  button {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
  }
  button:disabled { opacity: 0.5; cursor: not-allowed; }
  .export-btn { background: var(--budgee-primary, #7c3aed); color: white; }
  .delete-btn { background: var(--budgee-danger); color: white; }
  .reload-btn { background: var(--budgee-primary, #7c3aed); color: white; }
</style>
