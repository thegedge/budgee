import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { Transaction } from "../../models/Transaction";
import { Merchant } from "../../models/Merchant";
import { Tag } from "../../models/Tag";
import { Account } from "../../models/Account";
import { navigate } from "../navigate";

interface SearchResult {
  type: "transaction" | "merchant" | "tag" | "account";
  id: string;
  label: string;
  detail?: string;
  href: string;
}

declare global {
  interface HTMLElementTagNameMap {
    "budgee-global-search": GlobalSearch;
  }
}

@customElement("budgee-global-search")
export class GlobalSearch extends LitElement {
  @state() private _open = false;
  @state() private _query = "";
  @state() private _results: SearchResult[] = [];
  @state() private _activeIndex = 0;

  #debounceTimer?: ReturnType<typeof setTimeout>;

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 15vh;
      background: var(--budgee-overlay);
    }

    .panel {
      background: var(--budgee-surface);
      border: 1px solid var(--budgee-border);
      border-radius: 8px;
      width: min(90vw, 500px);
      max-height: 60vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 32px lch(0% 0 none / 0.2);
    }

    input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: none;
      border-bottom: 1px solid var(--budgee-border);
      background: transparent;
      color: var(--budgee-text);
      font-size: 1rem;
      outline: none;
      box-sizing: border-box;
    }

    .results {
      overflow-y: auto;
      max-height: 50vh;
    }

    .group-label {
      padding: 0.4rem 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--budgee-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .result {
      padding: 0.5rem 1rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .result:hover,
    .result.active {
      background: var(--budgee-row-hover);
    }

    .result-label {
      font-size: 0.9rem;
    }

    .result-detail {
      font-size: 0.8rem;
      color: var(--budgee-text-muted);
    }

    .empty {
      padding: 2rem 1rem;
      text-align: center;
      color: var(--budgee-text-muted);
      font-size: 0.9rem;
    }

    .hint {
      padding: 0.5rem 1rem;
      border-top: 1px solid var(--budgee-border);
      font-size: 0.75rem;
      color: var(--budgee-text-muted);
      display: flex;
      gap: 1rem;
    }

    kbd {
      background: var(--budgee-bg);
      border: 1px solid var(--budgee-border);
      border-radius: 3px;
      padding: 0 4px;
      font-size: 0.7rem;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("keydown", this.#onGlobalKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this.#onGlobalKeydown);
  }

  #onGlobalKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      this.#open();
    }
  };

  #open() {
    this._open = true;
    this._query = "";
    this._results = [];
    this._activeIndex = 0;
    this.updateComplete.then(() => {
      this.shadowRoot?.querySelector("input")?.focus();
    });
  }

  #close() {
    this._open = false;
    this._query = "";
    this._results = [];
  }

  #onInput(e: Event) {
    this._query = (e.target as HTMLInputElement).value;
    this._activeIndex = 0;
    clearTimeout(this.#debounceTimer);
    if (this._query.trim()) {
      this.#debounceTimer = setTimeout(() => this.#search(), 150);
    } else {
      this._results = [];
    }
  }

  async #search() {
    const q = this._query.trim().toLowerCase();
    if (!q) return;

    const results: SearchResult[] = [];

    const [transactions, merchants, tags, accounts] = await Promise.all([
      Transaction.all(),
      Merchant.all(),
      Tag.all(),
      Account.all(),
    ]);

    for (const m of merchants) {
      if (m.name.toLowerCase().includes(q)) {
        results.push({ type: "merchant", id: m.id, label: m.name, href: `/merchants/${m.id}` });
      }
    }

    for (const t of tags) {
      if (t.name.toLowerCase().includes(q)) {
        results.push({ type: "tag", id: t.id, label: t.name, href: "/tags" });
      }
    }

    for (const a of accounts) {
      if (a.name.toLowerCase().includes(q)) {
        results.push({ type: "account", id: a.id, label: a.name, href: `/accounts/${a.id}` });
      }
    }

    let txCount = 0;
    for (const tx of transactions) {
      if (txCount >= 5) break;
      if (tx.description.toLowerCase().includes(q)) {
        results.push({
          type: "transaction",
          id: tx.id,
          label: tx.description,
          detail: `${tx.date} · ${tx.amount.toFixed(2)}`,
          href: `/transactions/${tx.id}`,
        });
        txCount++;
      }
    }

    this._results = results;
  }

  #onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      this.#close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      this._activeIndex = Math.min(this._activeIndex + 1, this._results.length - 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this._activeIndex = Math.max(this._activeIndex - 1, 0);
    } else if (e.key === "Enter" && this._results[this._activeIndex]) {
      this.#navigate(this._results[this._activeIndex]);
    }
  }

  #navigate(result: SearchResult) {
    this.#close();
    navigate(result.href);
  }

  #onBackdropClick(e: Event) {
    if (e.target === e.currentTarget) {
      this.#close();
    }
  }

  #groupedResults() {
    const groups = new Map<string, SearchResult[]>();
    for (const r of this._results) {
      const list = groups.get(r.type) ?? [];
      list.push(r);
      groups.set(r.type, list);
    }
    return groups;
  }

  #typeLabel(type: string): string {
    const labels: Record<string, string> = {
      merchant: "Merchants",
      tag: "Tags",
      account: "Accounts",
      transaction: "Transactions",
    };
    return labels[type] ?? type;
  }

  render() {
    if (!this._open) return nothing;

    const groups = this.#groupedResults();
    let globalIndex = 0;

    return html`
      <div @click=${this.#onBackdropClick}>
        <div class="panel" role="dialog" aria-modal="true" aria-label="Search">
          <input
            type="text"
            placeholder="Search transactions, merchants, tags, accounts…"
            .value=${this._query}
            @input=${this.#onInput}
            @keydown=${this.#onKeydown}
            aria-label="Search"
          />
          <div class="results">
            ${
              this._results.length === 0 && this._query.trim()
                ? html`
                    <div class="empty">No results found</div>
                  `
                : ""
            }
            ${[...groups.entries()].map(
              ([type, items]) => html`
                <div class="group-label">${this.#typeLabel(type)}</div>
                ${items.map((r) => {
                  const idx = globalIndex++;
                  return html`
                    <div
                      class=${classMap({ result: true, active: idx === this._activeIndex })}
                      @click=${() => this.#navigate(r)}
                      @mouseenter=${() => {
                        this._activeIndex = idx;
                      }}
                    >
                      <span class="result-label">${r.label}</span>
                      ${r.detail ? html`<span class="result-detail">${r.detail}</span>` : ""}
                    </div>
                  `;
                })}
              `,
            )}
          </div>
          <div class="hint">
            <span><kbd>↑↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Open</span>
            <span><kbd>Esc</kbd> Close</span>
          </div>
        </div>
      </div>
    `;
  }
}
