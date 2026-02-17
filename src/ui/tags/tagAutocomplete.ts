import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { contrastTextColor } from "../../data/contrastTextColor";
import type { Tag } from "../../database/types";
import { ICON_MAP } from "../shared/iconPicker";

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
  selectedTagIds: string[] = [];

  @property({ type: Array })
  excludeIds: string[] = [];

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
    .input-wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 2px;
      padding: 2px 4px;
      border: 1px solid var(--budgee-border);
      border-radius: 12px;
      min-width: 120px;
      cursor: text;
      background: var(--budgee-surface);
    }
    .input-wrapper:focus-within {
      outline: 2px solid var(--budgee-primary);
      outline-offset: -1px;
    }
    .tag-pill {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: var(--budgee-primary);
      color: white;
      padding: 1px 6px;
      border-radius: 8px;
      font-size: 0.75rem;
      cursor: pointer;
      white-space: nowrap;
    }
    .pill-icon {
      display: inline-flex;
      align-items: center;
    }
    .pill-icon svg {
      width: 0.75rem;
      height: 0.75rem;
    }
    input {
      border: none;
      outline: none;
      padding: 2px 4px;
      font-size: 0.85rem;
      flex: 1;
      min-width: 60px;
      background: transparent;
    }
    .suggestions {
      position: fixed;
      background: var(--budgee-surface);
      border: 1px solid var(--budgee-border);
      border-radius: 0 0 4px 4px;
      max-height: 150px;
      overflow-y: auto;
      z-index: 1100;
      min-width: 120px;
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
    .suggestion.create {
      font-style: italic;
      color: var(--budgee-text-muted);
    }
  `;

  updated(changed: Map<string, unknown>) {
    if (changed.has("_open") && this._open) {
      this.updateComplete.then(() => this.#positionDropdown());
    }
  }

  get #filtered(): Tag[] {
    const q = this._query.toLowerCase();
    return this.tags
      .filter(
        (t) =>
          !this.selectedTagIds.includes(t.id) &&
          !this.excludeIds.includes(t.id) &&
          t.name.toLowerCase().includes(q),
      )
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1;
        const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1;
        return aStarts - bStarts || a.name.localeCompare(b.name);
      });
  }

  get #showCreate(): boolean {
    const q = this._query.trim();
    if (!q) return false;
    return !this.tags.some((t) => t.name.toLowerCase() === q.toLowerCase());
  }

  #tagLabel(tagId: string) {
    const tag = this.tags.find((t) => t.id === tagId);
    if (!tag) return `#${tagId}`;
    const svg = tag.icon ? ICON_MAP[tag.icon] : null;
    return svg ? html`<span class="pill-icon">${unsafeSVG(svg)}</span> ${tag.name}` : tag.name;
  }

  #removeTag(tagId: string) {
    this.dispatchEvent(new CustomEvent("tag-removed", { detail: { tagId } }));
  }

  #positionDropdown() {
    const input = this.shadowRoot?.querySelector("input");
    const dropdown = this.shadowRoot?.querySelector(".suggestions") as HTMLElement | null;
    if (!input || !dropdown) return;
    const rect = input.getBoundingClientRect();
    dropdown.style.top = `${rect.bottom}px`;
    dropdown.style.left = `${rect.left}px`;
    dropdown.style.width = `${rect.width}px`;
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
    this.updateComplete.then(() => {
      this.shadowRoot?.querySelector("input")?.focus();
    });
  }

  render() {
    const filtered = this.#filtered;

    return html`
      <div class="input-wrapper" @click=${() => this.shadowRoot?.querySelector("input")?.focus()}>
        ${this.selectedTagIds.map((tagId) => {
          const tag = this.tags.find((t) => t.id === tagId);
          const bg = tag?.color ?? "var(--budgee-primary)";
          const fg = tag?.color ? contrastTextColor(tag.color) : "white";
          return html`
          <span class="tag-pill" style="background:${bg};color:${fg}" @click=${(e: Event) => {
            e.stopPropagation();
            this.#removeTag(tagId);
          }}>
            ${this.#tagLabel(tagId)} &times;
          </span>
        `;
        })}
        <input
          type="text"
          placeholder=${this.selectedTagIds.length > 0 ? "" : "Add tag..."}
          .value=${this._query}
          @input=${this.#onInput}
          @keydown=${this.#onKeyDown}
          @focus=${this.#onFocus}
          @blur=${this.#onBlur}
        />
      </div>
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
