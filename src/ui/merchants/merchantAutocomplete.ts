import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Merchant } from "../../database/types";

declare global {
  interface HTMLElementTagNameMap {
    "merchant-autocomplete": MerchantAutocomplete;
  }
}

@customElement("merchant-autocomplete")
export class MerchantAutocomplete extends LitElement {
  @property({ type: Array })
  merchants: Merchant[] = [];

  @property({ type: String })
  value = "";

  @state()
  private _highlightIndex = -1;

  @state()
  private _open = false;

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }
    .input-wrapper {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    input {
      padding: 4px 8px;
    }
    .status {
      font-size: 0.75rem;
      white-space: nowrap;
    }
    .status.existing {
      color: var(--budgee-success, lch(63.6% 33.6 180.1));
    }
    .status.new {
      color: var(--budgee-text-muted, lch(56.7% 0 none));
      font-style: italic;
    }
    .suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--budgee-surface, lch(100% 0 none));
      border: 1px solid var(--budgee-border, lch(89.2% 0 none));
      border-radius: 0 0 4px 4px;
      max-height: 150px;
      overflow-y: auto;
      z-index: 10;
      min-width: 180px;
    }
    .suggestion {
      padding: 4px 6px;
      cursor: pointer;
      font-size: 0.85rem;
    }
    .suggestion:hover,
    .suggestion.highlighted {
      background: var(--budgee-bg, lch(98.3% 0 none));
    }
  `;

  get #filtered(): Merchant[] {
    const q = this.value.toLowerCase().trim();
    if (!q) return [];
    return this.merchants.filter((m) => m.name.toLowerCase().includes(q));
  }

  #onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent("merchant-changed", { detail: { name: val } }));
    this._highlightIndex = -1;
    this._open = val.trim().length > 0;
  }

  #onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData?.getData("text") ?? "";
    const titleCase = text.toLowerCase().replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
    const input = e.target as HTMLInputElement;
    input.value = titleCase;
    this.dispatchEvent(new CustomEvent("merchant-changed", { detail: { name: titleCase } }));
    this._highlightIndex = -1;
    this._open = titleCase.trim().length > 0;
  }

  #onKeyDown(e: KeyboardEvent) {
    const filtered = this.#filtered;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      this._highlightIndex = Math.min(this._highlightIndex + 1, filtered.length - 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this._highlightIndex = Math.max(this._highlightIndex - 1, -1);
    } else if (
      e.key === "Enter" &&
      this._highlightIndex >= 0 &&
      this._highlightIndex < filtered.length
    ) {
      e.preventDefault();
      this.#select(filtered[this._highlightIndex]);
    } else if (e.key === "Escape") {
      this._open = false;
    }
  }

  #onFocus() {
    if (this.value.trim().length > 0) {
      this._open = true;
    }
  }

  #onBlur() {
    setTimeout(() => {
      this._open = false;
    }, 150);
  }

  #select(merchant: Merchant) {
    this.dispatchEvent(new CustomEvent("merchant-changed", { detail: { name: merchant.name } }));
    this._open = false;
    this._highlightIndex = -1;
  }

  get #isExisting(): boolean {
    const q = this.value.trim().toLowerCase();
    return q.length > 0 && this.merchants.some((m) => m.name.toLowerCase() === q);
  }

  render() {
    const filtered = this.#filtered;
    const isExisting = this.#isExisting;
    const showSuggestions = this._open && filtered.length > 0 && !isExisting;
    const trimmed = this.value.trim();

    return html`
      <div class="input-wrapper">
        <input
          type="text"
          placeholder="Merchant name (optional)"
          .value=${this.value}
          @input=${this.#onInput}
          @paste=${this.#onPaste}
          @keydown=${this.#onKeyDown}
          @focus=${this.#onFocus}
          @blur=${this.#onBlur}
        />
        ${
          trimmed
            ? isExisting
              ? html`
                  <span class="status existing">existing</span>
                `
              : html`
                  <span class="status new">new</span>
                `
            : nothing
        }
      </div>
      ${
        showSuggestions
          ? html`
          <div class="suggestions">
            ${filtered.map(
              (m, i) => html`
              <div
                class="suggestion ${i === this._highlightIndex ? "highlighted" : ""}"
                @click=${() => this.#select(m)}
              >
                ${m.name}
              </div>
            `,
            )}
          </div>
        `
          : nothing
      }
    `;
  }
}
