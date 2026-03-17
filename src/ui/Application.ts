import { LitElement, css, html, nothing } from "lit";
import type { Subscription } from "rxjs";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import { db, isDemoMode } from "../database/Db";
import { importDatabase } from "../database/importDb";
import { startReplication, syncStatus$ } from "../database/replication";
import { SchemaVersionError } from "../database/Db";
import { fetchIdentity, type User } from "../identity";
import { ConfirmDialog } from "./shared/ConfirmDialog";
import { showErrorOverlay } from "./shared/DatabaseErrorOverlay";
import { setupGlobalErrorHandler } from "./globalErrorHandler";
import { hideLoadingOverlay, showLoadingOverlay } from "./shared/LoadingOverlay";
import "./shared/GlobalSearch";
import "./shared/ToastManager";
import { navigate, stripBasePath, withBasePath } from "./navigate";
import { Router } from "./Router";

import banknotesIcon from "lucide-static/icons/banknote.svg?raw";
import birdIcon from "lucide-static/icons/bird.svg?raw";
import chartBarIcon from "lucide-static/icons/chart-column.svg?raw";
import landmarkIcon from "lucide-static/icons/landmark.svg?raw";
import listFilterIcon from "lucide-static/icons/list-filter.svg?raw";
import adjustmentsHorizontalIcon from "lucide-static/icons/settings.svg?raw";
import buildingStorefrontIcon from "lucide-static/icons/store.svg?raw";
import tagIcon from "lucide-static/icons/tag.svg?raw";

import "./accounts/AccountList";
import "./dashboard/Dashboard";
import "./merchants/MerchantList";
import "./rules/RuleManager";
import "./settings/Settings";
import "./SyncStatusIndicator";
import "./tags/TagManager";
import "./transactions/TransactionList";

declare global {
  interface HTMLElementTagNameMap {
    "budgee-app": Application;
  }
}

@customElement("budgee-app")
export class Application extends LitElement {
  @state()
  private _dragOver = false;

  @state()
  private _showShortcuts = false;

  identity: User | null = null;

  #dragCounter = 0;
  #cancelReplication?: () => void;
  #syncSub?: Subscription;
  #reconnectTimer?: ReturnType<typeof setTimeout>;

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
        await import("./transactions/TransactionDetail");
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
        await import("./accounts/AccountDetail");
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
        await import("./merchants/MerchantDetail");
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
      sync-status-indicator {
        position: sticky;
        bottom: 0;
        background: var(--budgee-surface);
      }

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
      background: var(--budgee-overlay);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      pointer-events: none;

      color: white;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .demo-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9000;
      --color: var(--budgee-warning, lch(80% 80 85));
      color: light-dark(lch(15% 35 85), lch(85% 35 85));
      background: color-mix(in lch, var(--color) 25%, transparent);
      text-align: center;
      padding: 0.35rem 1rem;
      font-size: 0.85rem;
      font-weight: 600;

      a {
        color: inherit;
        margin-left: 0.5rem;
      }
    }

    :host(.demo-mode) {
      padding-top: 2rem;
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
    if (isDemoMode) this.classList.add("demo-mode");
    this.#initTheme();
    document.addEventListener("keydown", this.#onGlobalKeydown);
    this.addEventListener("dragover", this.#onDragOver);
    this.addEventListener("dragenter", this.#onDragEnter);
    this.addEventListener("dragleave", this.#onDragLeave);
    this.addEventListener("drop", this.#onDrop);
    setupGlobalErrorHandler();
    void (async () => {
      const user = await fetchIdentity();
      this.identity = user;
      if (user) console.info("Identified as:", user.login);
      db(user?.login).catch((error: unknown) => {
        console.error(error);
        const isDatabaseError = error instanceof SchemaVersionError;
        const message = isDatabaseError
          ? "The database schema is incompatible with this version of the app and can't be opened. You can export the raw data for safekeeping, then delete the database to get unstuck."
          : error instanceof Error
            ? error.message
            : String(error);
        showErrorOverlay(message, { isDatabaseError });
      });
    })();
    if (!isDemoMode) {
      this.#connectReplication();
      this.#syncSub = syncStatus$.subscribe((status) => {
        if (status === "error" && !this.#reconnectTimer) {
          this.#reconnectTimer = setTimeout(() => {
            this.#reconnectTimer = undefined;
            this.#connectReplication();
          }, 5000);
        }
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this.#onGlobalKeydown);
    this.removeEventListener("dragover", this.#onDragOver);
    this.removeEventListener("dragenter", this.#onDragEnter);
    this.removeEventListener("dragleave", this.#onDragLeave);
    this.removeEventListener("drop", this.#onDrop);
    this.#cancelReplication?.();
    this.#syncSub?.unsubscribe();
    clearTimeout(this.#reconnectTimer);
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
        this.#cancelReplication = await startReplication(url, this.identity?.login ?? null);
      } catch (e) {
        console.error("Failed to start replication:", e);
      }
    }
  }

  #onGlobalKeydown = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const isInput =
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" ||
      target.isContentEditable;
    if (e.key === "?" && !isInput && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      this._showShortcuts = !this._showShortcuts;
    }
  };

  #initTheme() {
    try {
      const theme = localStorage.getItem("budgee-theme");
      if (theme === "light" || theme === "dark") {
        document.documentElement.dataset.theme = theme;
      } else {
        delete document.documentElement.dataset.theme;
      }
    } catch {
      // localStorage unavailable
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
      navigate("/transactions");
      await this.updateComplete;
      document.dispatchEvent(new CustomEvent("budgee-import-csv", { detail: { file } }));
    } else if (file.name.endsWith(".json")) {
      const confirmed = await ConfirmDialog.show({
        heading: "Import Database",
        message: "This will replace all existing data. Are you sure?",
        confirmLabel: "Import",
        danger: true,
      });
      if (!confirmed) return;
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
    const path = stripBasePath(window.location.pathname);
    const active = href === "/" ? path === "/" : path.startsWith(href);
    const prefixedHref = withBasePath(href);
    const fullHref = isDemoMode
      ? `${prefixedHref}${prefixedHref.includes("?") ? "&" : "?"}demo=1`
      : prefixedHref;
    return html`<a href=${fullHref} class=${classMap({ active })}>${unsafeSVG(icon)} ${label}</a>`;
  }

  #demoExitHref() {
    const url = new URL(window.location.href);
    url.searchParams.delete("demo");
    return url.pathname + url.search;
  }

  #onDemoExit(e: Event) {
    e.preventDefault();
    window.location.href = this.#demoExitHref();
  }

  render() {
    return html`
      ${isDemoMode ? html`<div class="demo-banner">Demo Mode — changes won't be saved <a href=${this.#demoExitHref()} @click=${this.#onDemoExit}>Exit demo</a></div>` : nothing}
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
      <budgee-global-search></budgee-global-search>
      <budgee-toast-manager></budgee-toast-manager>
      ${
        this._showShortcuts
          ? html`<budgee-modal heading="Keyboard Shortcuts" @modal-close=${() => {
              this._showShortcuts = false;
            }}>
            <table style="width:100%;border-collapse:collapse">
              <tbody>
                <tr><td style="padding:0.4rem 0"><kbd style="background:var(--budgee-bg);border:1px solid var(--budgee-border);border-radius:3px;padding:2px 6px">⌘K</kbd></td><td style="padding:0.4rem 0.5rem">Open search</td></tr>
                <tr><td style="padding:0.4rem 0"><kbd style="background:var(--budgee-bg);border:1px solid var(--budgee-border);border-radius:3px;padding:2px 6px">?</kbd></td><td style="padding:0.4rem 0.5rem">Show shortcuts</td></tr>
                <tr><td style="padding:0.4rem 0"><kbd style="background:var(--budgee-bg);border:1px solid var(--budgee-border);border-radius:3px;padding:2px 6px">Esc</kbd></td><td style="padding:0.4rem 0.5rem">Close modal</td></tr>
              </tbody>
            </table>
          </budgee-modal>`
          : nothing
      }
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
