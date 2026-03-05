import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "autocomplete-input": AutocompleteInput;
  }
}

@customElement("autocomplete-input")
export class AutocompleteInput extends LitElement {
  @property({ type: Array })
  items: string[] = [];

  @property({ type: String })
  value = "";

  @property({ type: String })
  placeholder = "";

  @state()
  private _highlightIndex = -1;

  @state()
  private _open = false;

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }
    input {
      padding: 4px 8px;
    }
    .suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--budgee-surface);
      border: 1px solid var(--budgee-border);
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
      background: var(--budgee-bg);
    }
  `;

  get #filtered(): string[] {
    const q = this.value.toLowerCase().trim();
    if (!q) return [];
    return this.items.filter((item) => item.toLowerCase().includes(q));
  }

  #onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent("value-changed", { detail: { value: val } }));
    this._highlightIndex = -1;
    this._open = val.trim().length > 0;
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

  #select(item: string) {
    this.dispatchEvent(new CustomEvent("value-changed", { detail: { value: item } }));
    this._open = false;
    this._highlightIndex = -1;
  }

  render() {
    const filtered = this.#filtered;
    const exactMatch =
      this.value.trim() &&
      filtered.some((item) => item.toLowerCase() === this.value.trim().toLowerCase());
    const showSuggestions = this._open && filtered.length > 0 && !exactMatch;

    return html`
      <input
        type="text"
        .placeholder=${this.placeholder}
        .value=${this.value}
        @input=${this.#onInput}
        @keydown=${this.#onKeyDown}
        @focus=${this.#onFocus}
        @blur=${this.#onBlur}
      />
      ${
        showSuggestions
          ? html`
          <div class="suggestions">
            ${filtered.map(
              (item, i) => html`
              <div
                class="suggestion ${i === this._highlightIndex ? "highlighted" : ""}"
                @click=${() => this.#select(item)}
              >
                ${item}
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
