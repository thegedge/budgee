import { Router } from "@lit-labs/router";
import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import { waitForDb } from "../database/db";
import { importDatabase } from "../database/importDb";
import { migrateDatabase } from "../database/migrations";
import { startReplication } from "../database/replication";
import { hideLoadingOverlay, showLoadingOverlay } from "./shared/loadingOverlay";

import banknotesIcon from "lucide-static/icons/banknote.svg?raw";
import birdIcon from "lucide-static/icons/bird.svg?raw";
import chartBarIcon from "lucide-static/icons/chart-column.svg?raw";
import landmarkIcon from "lucide-static/icons/landmark.svg?raw";
import listFilterIcon from "lucide-static/icons/list-filter.svg?raw";
import adjustmentsHorizontalIcon from "lucide-static/icons/settings.svg?raw";
import buildingStorefrontIcon from "lucide-static/icons/store.svg?raw";
import tagIcon from "lucide-static/icons/tag.svg?raw";

import "./accounts/accountList";
import "./dashboard/dashboard";
import "./merchants/merchantList";
import "./rules/ruleManager";
import "./settings/settings";
import "./shared/syncStatusIndicator";
import "./tags/tagManager";
import "./transactions/transactionList";

declare global {
  interface HTMLElementTagNameMap {
    "budgee-app": Application;
  }
}

@customElement("budgee-app")
export class Application extends LitElement {
  @state()
  private _dragOver = false;

  #dragCounter = 0;
  #cancelReplication?: () => void;

  private _router = new Router(this, [
    {
      path: "/",
      render: () =>
        html`
          <budgee-dashboard></budgee-dashboard>
        `,
    },
    {
      path: "/transactions",
      render: () =>
        html`
          <transaction-list></transaction-list>
        `,
    },
    {
      path: "/transactions/:id",
      render: ({ id }) => html`<transaction-detail .transactionId=${id}></transaction-detail>`,
      enter: async () => {
        await import("./transactions/transactionDetail");
        return true;
      },
    },
    {
      path: "/accounts",
      render: () =>
        html`
          <account-list></account-list>
        `,
    },
    {
      path: "/accounts/:id",
      render: ({ id }) => html`<account-detail .accountId=${id}></account-detail>`,
      enter: async () => {
        await import("./accounts/accountDetail");
        return true;
      },
    },
    {
      path: "/merchants",
      render: () =>
        html`
          <merchant-list></merchant-list>
        `,
    },
    {
      path: "/merchants/:id",
      render: ({ id }) => html`<merchant-detail .merchantId=${id}></merchant-detail>`,
      enter: async () => {
        await import("./merchants/merchantDetail");
        return true;
      },
    },
    {
      path: "/tags",
      render: () =>
        html`
          <tag-manager></tag-manager>
        `,
    },
    {
      path: "/rules",
      render: () =>
        html`
          <rule-manager></rule-manager>
        `,
    },
    {
      path: "/settings",
      render: () =>
        html`
          <budgee-settings @budgee-sync-settings-changed=${() => this.#connectReplication()}></budgee-settings>
        `,
    },
  ]);

  static styles = css`
    :host {
      width: 100vw;
      max-width: 100vw;
      min-height: 100vh;

      display: grid;
      grid-template-areas:
        "app-name main"
        "nav main";
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr;
      gap: 0;

      color: var(--budgee-text);
      font-family: sans-serif;
    }

    svg.lucide {
      display: inline-block;
      width: 1rem;
      height: 1rem;
    }

    .app-name {
      grid-area: app-name;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--budgee-text);
      background: var(--budgee-surface);
      margin: 0;

      width: stretch;
      padding-block: 1rem;
      padding-inline-end: 0.5rem;
      border-right: 1px solid var(--budgee-border);

      svg.lucide {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    nav {
      grid-area: nav;
      display: flex;
      flex-direction: column;
      background: var(--budgee-surface);
      border-right: 1px solid var(--budgee-border);
      width: 220px;
      flex-shrink: 0;

      a,
      button {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.5rem 1rem;
        text-decoration: none;
        color: var(--budgee-text-muted);
        font-size: 0.9rem;
        border-left: 3px solid transparent;
        transition:
          color 0.15s,
          border-color 0.15s;

        &:hover {
          color: var(--budgee-primary);
        }

        &.active {
          color: var(--budgee-primary);
          border-left-color: var(--budgee-primary);
        }
      }
    }

    main {
      grid-area: main;
      padding: 1.5rem 2rem;
    }

    .drop-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      pointer-events: none;

      color: white;
      font-size: 1.5rem;
      font-weight: 600;
    }

    @media (max-width: 1024px) {
      :host {
        grid-template-areas:
          "app-name nav"
          "main main";
      }

      .app-name {
        width: auto;
        height: stretch;
        padding: 1rem;
        border-bottom: 1px solid var(--budgee-border);
      }

      nav {
        flex-direction: row;
        flex-wrap: wrap;
        width: auto;
        border-right: none;
        border-bottom: 1px solid var(--budgee-border);
        padding: 0 0.5rem;

        a,
        button {
          border-left: none;
          border-bottom: 2px solid transparent;
          padding: 0.5rem 0.75rem;

          &.active {
            border-bottom-color: var(--budgee-primary);
          }
        }
      }

      main {
        padding: 1rem;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("dragover", this.#onDragOver);
    this.addEventListener("dragenter", this.#onDragEnter);
    this.addEventListener("dragleave", this.#onDragLeave);
    this.addEventListener("drop", this.#onDrop);
    waitForDb()
      .then((dbs) => migrateDatabase(dbs))
      .catch(console.error);
    this.#connectReplication();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("dragover", this.#onDragOver);
    this.removeEventListener("dragenter", this.#onDragEnter);
    this.removeEventListener("dragleave", this.#onDragLeave);
    this.removeEventListener("drop", this.#onDrop);
    this.#cancelReplication?.();
  }

  async #connectReplication() {
    const cancel = this.#cancelReplication;
    this.#cancelReplication = undefined;
    await cancel?.();

    let url: string | null;
    try {
      url = localStorage.getItem("budgee-sync-url");
    } catch {
      return;
    }
    if (url) {
      try {
        this.#cancelReplication = await startReplication(url);
      } catch (e) {
        console.error("Failed to start replication:", e);
      }
    }
  }

  #onDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  #onDragEnter = (e: DragEvent) => {
    e.preventDefault();
    this.#dragCounter++;
    this._dragOver = true;
  };

  #onDragLeave = (_e: DragEvent) => {
    this.#dragCounter--;
    if (this.#dragCounter === 0) {
      this._dragOver = false;
    }
  };

  #onDrop = async (e: DragEvent) => {
    e.preventDefault();
    this.#dragCounter = 0;
    this._dragOver = false;

    const file = e.dataTransfer?.files[0];
    if (!file) return;

    if (file.name.endsWith(".csv")) {
      window.history.pushState({}, "", "/transactions");
      window.dispatchEvent(new PopStateEvent("popstate"));
      await this.updateComplete;
      document.dispatchEvent(new CustomEvent("budgee-import-csv", { detail: { file } }));
    } else if (file.name.endsWith(".json")) {
      if (!confirm("This will replace all existing data. Are you sure?")) return;
      showLoadingOverlay("Importing database...");
      try {
        await importDatabase(file);
        window.location.reload();
      } finally {
        hideLoadingOverlay();
      }
    }
  };

  private navLink(href: string, label: string, icon: string) {
    const path = window.location.pathname;
    const active = href === "/" ? path === "/" : path.startsWith(href);
    return html`<a href=${href} class=${classMap({ active })}>${unsafeSVG(icon)} ${label}</a>`;
  }

  render() {
    return html`
      <h1 class="app-name">${unsafeSVG(birdIcon)} Budgee</h1>
      <nav>
        ${this.navLink("/", "Dashboard", chartBarIcon)}
        ${this.navLink("/transactions", "Transactions", banknotesIcon)}
        ${this.navLink("/accounts", "Accounts", landmarkIcon)}
        ${this.navLink("/merchants", "Merchants", buildingStorefrontIcon)}
        ${this.navLink("/tags", "Tags", tagIcon)}
        ${this.navLink("/rules", "Rules", listFilterIcon)}
        ${this.navLink("/settings", "Settings", adjustmentsHorizontalIcon)}
        <div style="flex:1"></div>
        <sync-status-indicator></sync-status-indicator>
      </nav>
      <main>${this._router.outlet()}</main>
      ${
        this._dragOver
          ? html`
              <div class="drop-overlay">Drop file to import</div>
            `
          : nothing
      }
    `;
  }
}
