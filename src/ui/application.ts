import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@lit-labs/router";

import "./dashboard/dashboard";
import "./import/importer";
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
      display: block;
      color: var(--budgee-text);
      font-family: sans-serif;
    }

    nav {
      display: flex;
      gap: 0;
      background: var(--budgee-surface);
      border-bottom: 1px solid var(--budgee-border);
      padding: 0 1rem;
    }

    nav a {
      padding: 0.75rem 1rem;
      text-decoration: none;
      color: var(--budgee-text-muted);
      font-size: 0.9rem;
      border-bottom: 2px solid transparent;
      transition:
        color 0.15s,
        border-color 0.15s;
    }

    nav a:hover {
      color: var(--budgee-text);
      border-bottom-color: var(--budgee-primary);
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 1.5rem 1rem;
    }
  `;

  render() {
    return html`
      <nav>
        <a href="/">Dashboard</a>
        <a href="/transactions">Transactions</a>
        <a href="/tags">Tags</a>
        <a href="/rules">Rules</a>
        <a href="/import">Import</a>
      </nav>
      <div class="container">
        ${this._router.outlet()}
      </div>
    `;
  }
}
