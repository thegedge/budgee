import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "budgee-database-error-overlay": DatabaseErrorOverlay;
  }
}

@customElement("budgee-database-error-overlay")
class DatabaseErrorOverlay extends LitElement {
  @state()
  private _exporting = false;

  @state()
  private _deleting = false;

  static styles = css`
    :host {
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
      background: var(--budgee-surface, #1e1e2e);
      border: 1px solid var(--budgee-border, #444);
      border-radius: 12px;
      padding: 2rem;
      max-width: 480px;
      text-align: center;
    }

    h2 {
      margin: 0 0 1rem;
      font-size: 1.4rem;
    }

    p {
      color: var(--budgee-text-muted, #aaa);
      line-height: 1.5;
      margin: 0 0 1.5rem;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    button {
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .export-btn {
      background: var(--budgee-primary, #7c3aed);
      color: white;
    }

    .delete-btn {
      background: #dc2626;
      color: white;
    }
  `;

  render() {
    return html`
      <div class="card">
        <h2>Database Error</h2>
        <p>
          The database schema is incompatible with this version of the app and can't be opened. You
          can export the raw data for safekeeping, then delete the database to get unstuck.
        </p>
        <div class="actions">
          <button class="export-btn" ?disabled=${this._exporting} @click=${this.#exportData}>
            ${this._exporting ? "Exporting…" : "Export raw data"}
          </button>
          <button class="delete-btn" ?disabled=${this._deleting} @click=${this.#deleteAndReload}>
            ${this._deleting ? "Deleting…" : "Delete database and reload"}
          </button>
        </div>
      </div>
    `;
  }

  async #exportData() {
    this._exporting = true;
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
      this._exporting = false;
    }
  }

  async #deleteAndReload() {
    if (!confirm("This will permanently delete all local data. Are you sure?")) return;
    this._deleting = true;
    try {
      const allDbs = await indexedDB.databases();
      const budgeeDbs = allDbs.filter((db) => db.name?.startsWith("budgee"));
      await Promise.all(
        budgeeDbs.map(
          (db) =>
            new Promise<void>((resolve, reject) => {
              const req = indexedDB.deleteDatabase(db.name!);
              req.onsuccess = () => resolve();
              req.onerror = () => reject(req.error);
            }),
        ),
      );
      window.location.reload();
    } catch (e) {
      console.error("Delete failed:", e);
      alert("Delete failed. Check the browser console for details.");
      this._deleting = false;
    }
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

export function showDatabaseErrorOverlay() {
  const existing = document.querySelector("budgee-database-error-overlay");
  if (existing) return;
  document.body.appendChild(document.createElement("budgee-database-error-overlay"));
}
