import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { exportDatabase } from "../../database/exportDb";
import { importDatabase } from "../../database/importDb";
import { BusyMixin, busyStyles } from "../shared/busyMixin";
import { hideLoadingOverlay, showLoadingOverlay } from "../shared/loadingOverlay";

declare global {
  interface HTMLElementTagNameMap {
    "database-manager": DatabaseManager;
  }
}

@customElement("database-manager")
export class DatabaseManager extends BusyMixin(LitElement) {
  static styles = [
    busyStyles,
    css`
      :host {
        display: block;
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
      }
      button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        background-color: var(--budgee-primary);
        color: white;
        border: none;
        border-radius: 4px;
      }
      button:hover {
        background-color: var(--budgee-primary-hover);
      }
    `,
  ];

  async #onDatabaseImport(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;

    if (!confirm("This will replace all existing data. Are you sure?")) {
      input.value = "";
      return;
    }

    await this.withBusy(async () => {
      showLoadingOverlay("Importing database...");
      try {
        await importDatabase(input.files![0]);
        input.value = "";
        window.location.reload();
      } finally {
        hideLoadingOverlay();
      }
    });
  }

  render() {
    return html`
      <h2>Import Database</h2>
      <p>Restore from a full JSON backup. This will replace all existing data.</p>
      <input type="file" accept=".json" @change=${this.#onDatabaseImport} />

      <h2>Export Database</h2>
      <p>Download a full backup of your data as JSON.</p>
      <button @click=${exportDatabase}>Export</button>
    `;
  }
}
