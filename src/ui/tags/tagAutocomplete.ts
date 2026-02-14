import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Tag } from "../../database/types";

declare global {
  interface HTMLElementTagNameMap {
    "tag-autocomplete": TagAutocomplete;
  }
}

@customElement("tag-autocomplete")
export class TagAutocomplete extends LitElement {
  @property({ type: Array })
  tags: Tag[] = [];

  @property({ type: Array })
  excludeIds: number[] = [];

  @state()
  private _query = "";

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
      padding: 2px 6px;
      font-size: 0.85rem;
      border: 1px solid var(--budgee-border, #e0e0e0);
      border-radius: 4px;
      width: 120px;
    }
    .suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--budgee-surface, #fff);
      border: 1px solid var(--budgee-border, #e0e0e0);
      border-radius: 0 0 4px 4px;
      max-height: 150px;
      overflow-y: auto;
      z-index: 10;
      min-width: 120px;
    }
    .suggestion {
      padding: 4px 6px;
      cursor: pointer;
      font-size: 0.85rem;
    }
    .suggestion:hover,
    .suggestion.highlighted {
      background: var(--budgee-bg, #fafafa);
    }
    .suggestion.create {
      font-style: italic;
      color: var(--budgee-text-muted, #888);
    }
  `;

  get #filtered(): Tag[] {
    const q = this._query.toLowerCase();
    return this.tags.filter(
      (t) => !this.excludeIds.includes(t.id!) && t.name.toLowerCase().includes(q),
    );
  }

  get #showCreate(): boolean {
    const q = this._query.trim();
    if (!q) return false;
    return !this.tags.some((t) => t.name.toLowerCase() === q.toLowerCase());
  }

  #onInput(e: Event) {
    this._query = (e.target as HTMLInputElement).value;
    this._highlightIndex = -1;
    this._open = this._query.length > 0;
  }

  #onKeyDown(e: KeyboardEvent) {
    const filtered = this.#filtered;
    const totalItems = filtered.length + (this.#showCreate ? 1 : 0);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this._highlightIndex = Math.min(this._highlightIndex + 1, totalItems - 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this._highlightIndex = Math.max(this._highlightIndex - 1, -1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (this._highlightIndex >= 0 && this._highlightIndex < filtered.length) {
        this.#selectTag(filtered[this._highlightIndex]);
      } else if (
        this.#showCreate &&
        (this._highlightIndex === filtered.length || this._highlightIndex === -1)
      ) {
        this.#createTag();
      } else if (filtered.length === 1 && !this.#showCreate) {
        this.#selectTag(filtered[0]);
      } else if (this.#showCreate) {
        this.#createTag();
      }
    } else if (e.key === "Escape") {
      this.#close();
    }
  }

  #onFocus() {
    if (this._query.length > 0) {
      this._open = true;
    }
  }

  #onBlur() {
    // Delay to allow click on suggestion to fire first
    setTimeout(() => {
      this._open = false;
    }, 150);
  }

  #selectTag(tag: Tag) {
    this.dispatchEvent(new CustomEvent("tag-selected", { detail: { tag } }));
    this.#close();
  }

  #createTag() {
    const name = this._query.trim();
    if (!name) return;
    this.dispatchEvent(new CustomEvent("tag-created", { detail: { name } }));
    this.#close();
  }

  #close() {
    this._query = "";
    this._highlightIndex = -1;
    this._open = false;
  }

  render() {
    const filtered = this.#filtered;

    return html`
      <input
        type="text"
        placeholder="Add tag..."
        .value=${this._query}
        @input=${this.#onInput}
        @keydown=${this.#onKeyDown}
        @focus=${this.#onFocus}
        @blur=${this.#onBlur}
      />
      ${
        this._open && (filtered.length > 0 || this.#showCreate)
          ? html`
            <div class="suggestions">
              ${filtered.map(
                (tag, i) => html`
                <div
                  class="suggestion ${i === this._highlightIndex ? "highlighted" : ""}"
                  @click=${() => this.#selectTag(tag)}
                >
                  ${tag.name}
                </div>
              `,
              )}
              ${
                this.#showCreate
                  ? html`
                    <div
                      class="suggestion create ${filtered.length === this._highlightIndex ? "highlighted" : ""}"
                      @click=${this.#createTag}
                    >
                      Create "${this._query.trim()}"
                    </div>
                  `
                  : nothing
              }
            </div>
          `
          : nothing
      }
    `;
  }
}
