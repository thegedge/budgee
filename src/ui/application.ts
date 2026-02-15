import { LitElement, css, html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { customElement } from "lit/decorators.js";
import { Router } from "@lit-labs/router";

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
          <trans-importer></trans-importer>
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
      color: var(--budgee-text);
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
  `;

  private navLink(href: string, label: string) {
    const path = window.location.pathname;
    const active = href === "/" ? path === "/" : path.startsWith(href);
    return html`<a href=${href} class=${classMap({ active })}>${label}</a>`;
  }

  render() {
    return html`
      <nav>
        ${this.navLink("/", "Dashboard")}
        ${this.navLink("/transactions", "Transactions")}
        ${this.navLink("/merchants", "Merchants")}
        ${this.navLink("/tags", "Tags")}
        ${this.navLink("/rules", "Rules")}
        ${this.navLink("/import", "Import / Export")}
      </nav>
      <div class="container">
        ${this._router.outlet()}
      </div>
    `;
  }
}
