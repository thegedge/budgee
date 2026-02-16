import { Router } from "@lit-labs/router";
import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import { importDatabase } from "../database/importDb";

import banknotesIcon from "lucide-static/icons/banknote.svg?raw";
import chartBarIcon from "lucide-static/icons/chart-column.svg?raw";
import arrowDownTrayIcon from "lucide-static/icons/download.svg?raw";
import landmarkIcon from "lucide-static/icons/landmark.svg?raw";
import adjustmentsHorizontalIcon from "lucide-static/icons/settings.svg?raw";
import buildingStorefrontIcon from "lucide-static/icons/store.svg?raw";
import tagIcon from "lucide-static/icons/tag.svg?raw";

import "./accounts/accountList";
import "./dashboard/dashboard";
import "./import/importer";
import "./merchants/merchantList";
import "./rules/ruleManager";
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
      render: ({ id }) =>
        html`<transaction-detail .transactionId=${Number(id)}></transaction-detail>`,
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
      render: ({ id }) => html`<account-detail .accountId=${Number(id)}></account-detail>`,
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
      render: ({ id }) => html`<merchant-detail .merchantId=${Number(id)}></merchant-detail>`,
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
      path: "/import",
      render: () =>
        html`
          <database-manager></database-manager>
        `,
    },
  ]);

  static styles = css`
    :host {
      display: flex;
      min-height: 100vh;
      color: var(--budgee-text);
      font-family: sans-serif;
    }

    svg.lucide {
      display: inline-block;
      width: 1rem;
      height: 1rem;
    }

    nav {
      display: flex;
      flex-direction: column;
      gap: 0;
      background: var(--budgee-surface);
      border-right: 1px solid var(--budgee-border);
      padding: 1rem 0;
      width: 180px;
      flex-shrink: 0;
    }

    nav a,
    nav button {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: var(--budgee-text-muted);
      font-size: 0.9rem;
      border-left: 3px solid transparent;
      background: none;
      border-top: none;
      border-right: none;
      border-bottom: none;
      cursor: pointer;
      font-family: inherit;
      text-align: left;
      transition:
        color 0.15s,
        border-color 0.15s;
    }

    nav a.active,
    nav a:hover,
    nav button:hover {
      color: var(--budgee-primary);
      border-left-color: var(--budgee-primary);
    }

    .container {
      flex: 1;
      min-width: 0;
      padding: 1.5rem 2rem;
    }

    @media (max-width: 768px) {
      :host {
        flex-direction: column;
      }

      nav {
        flex-direction: row;
        flex-wrap: wrap;
        width: auto;
        border-right: none;
        border-bottom: 1px solid var(--budgee-border);
        padding: 0 0.5rem;
      }

      nav a,
      nav button {
        border-left: none;
        border-bottom: 2px solid transparent;
        padding: 0.5rem 0.75rem;
      }

      nav a.active,
      nav a:hover,
      nav button:hover {
        border-left-color: transparent;
        border-bottom-color: var(--budgee-primary);
      }

      .container {
        padding: 1rem;
      }
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
    }

    .drop-overlay span {
      color: white;
      font-size: 1.5rem;
      font-weight: 600;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("dragover", this.#onDragOver);
    this.addEventListener("dragenter", this.#onDragEnter);
    this.addEventListener("dragleave", this.#onDragLeave);
    this.addEventListener("drop", this.#onDrop);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("dragover", this.#onDragOver);
    this.removeEventListener("dragenter", this.#onDragEnter);
    this.removeEventListener("dragleave", this.#onDragLeave);
    this.removeEventListener("drop", this.#onDrop);
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
      await importDatabase(file);
      window.location.reload();
    }
  };

  private navLink(href: string, label: string, icon: string) {
    const path = window.location.pathname;
    const active = href === "/" ? path === "/" : path.startsWith(href);
    return html`<a href=${href} class=${classMap({ active })}>${unsafeSVG(icon)} ${label}</a>`;
  }

  render() {
    return html`
      <nav>
        ${this.navLink("/", "Dashboard", chartBarIcon)}
        ${this.navLink("/transactions", "Transactions", banknotesIcon)}
        ${this.navLink("/accounts", "Accounts", landmarkIcon)}
        ${this.navLink("/merchants", "Merchants", buildingStorefrontIcon)}
        ${this.navLink("/tags", "Tags", tagIcon)}
        ${this.navLink("/rules", "Rules", adjustmentsHorizontalIcon)}
        ${this.navLink("/import", "Database", arrowDownTrayIcon)}
      </nav>
      <div class="container">
        ${this._router.outlet()}
      </div>
      ${
        this._dragOver
          ? html`
              <div class="drop-overlay"><span>Drop file to import</span></div>
            `
          : nothing
      }
    `;
  }
}
