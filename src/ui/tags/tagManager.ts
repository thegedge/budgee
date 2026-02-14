import { LitElement, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { db } from "../../database/db";
import type { Tag } from "../../database/types";
import type { FilterChangeDetail, PageChangeDetail } from "../paginatedTable";
import "../paginatedTable";

declare global {
  interface HTMLElementTagNameMap {
    "tag-manager": TagManager;
  }
}

type SortDir = "asc" | "desc";

const COMMON_ICONS = [
  "🍔",
  "🛒",
  "🏠",
  "🚗",
  "✈️",
  "💊",
  "🎮",
  "🎬",
  "☕",
  "🍺",
  "👕",
  "💇",
  "📚",
  "🐾",
  "💡",
  "🏋️",
  "🎵",
  "💰",
  "🏥",
  "⛽",
  "📱",
  "🎁",
  "🌿",
  "🔧",
];

@customElement("tag-manager")
export class TagManager extends LitElement {
  @state()
  private _tags: Tag[] = [];

  @state()
  private _newTagName = "";

  @state()
  private _newTagIcon = "";

  @state()
  private _error = "";

  @state()
  private _filter = "";

  @state()
  private _currentPage = 1;

  @state()
  private _pageSize = 25;

  @state()
  private _sortDir: SortDir = "asc";

  @state()
  private _editingTagId: number | null = null;

  @state()
  private _editingIcon = "";

  static styles = css`
    :host {
      display: block;
      border: 1px solid var(--budgee-border, #e0e0e0);
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      background: var(--budgee-surface, #fff);
    }
    .tag-form {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      align-items: center;
    }
    input {
      padding: 4px 8px;
      flex: 1;
    }
    button {
      padding: 4px 12px;
      cursor: pointer;
      background-color: var(--budgee-primary, #7eb8da);
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background-color: var(--budgee-primary-hover, #5a9cbf);
    }
    .delete-btn {
      background-color: var(--budgee-danger, #e8a0a0);
      font-size: 0.8rem;
      padding: 2px 8px;
    }
    .delete-btn:hover {
      background-color: var(--budgee-danger-hover, #d07070);
    }
    .error {
      color: var(--budgee-danger-hover, #d07070);
      font-size: 0.85rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      border: 1px solid var(--budgee-border, #e0e0e0);
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: var(--budgee-primary, #7eb8da);
      color: white;
    }
    th.sortable {
      cursor: pointer;
      user-select: none;
    }
    th.sortable:hover {
      background-color: var(--budgee-primary-hover, #5a9cbf);
    }
    tbody tr:nth-child(even) {
      background-color: var(--budgee-bg, #fafafa);
    }
    .icon-picker {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .icon-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
    .icon-btn {
      background: none;
      border: 1px solid var(--budgee-border, #e0e0e0);
      border-radius: 4px;
      padding: 4px;
      font-size: 1.1rem;
      cursor: pointer;
      color: inherit;
      min-width: 2rem;
    }
    .icon-btn:hover,
    .icon-btn.selected {
      background-color: var(--budgee-primary, #7eb8da);
    }
    .icon-input-row {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    .icon-input-row input {
      width: 4rem;
      flex: none;
      text-align: center;
      font-size: 1.1rem;
    }
    .icon-preview {
      font-size: 1rem;
    }
    .tag-icon {
      margin-right: 4px;
    }
    .edit-icon-btn {
      background: none;
      border: 1px solid var(--budgee-border, #e0e0e0);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 0.8rem;
      cursor: pointer;
      color: inherit;
    }
    .edit-icon-btn:hover {
      background-color: var(--budgee-bg, #fafafa);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.#refreshTags();
  }

  async #refreshTags() {
    this._tags = await db.tags.toArray();
  }

  async #addTag() {
    const name = this._newTagName.trim();
    if (!name) return;

    this._error = "";
    const tag: Tag = { name };
    if (this._newTagIcon) tag.icon = this._newTagIcon;

    try {
      await db.tags.add(tag);
      this._newTagName = "";
      this._newTagIcon = "";
      await this.#refreshTags();
    } catch {
      this._error = `Tag "${name}" already exists.`;
    }
  }

  async #deleteTag(id: number) {
    await db.tags.delete(id);
    await this.#refreshTags();
  }

  async #saveTagIcon(tag: Tag) {
    await db.tags.update(tag.id!, { icon: this._editingIcon || undefined });
    this._editingTagId = null;
    this._editingIcon = "";
    await this.#refreshTags();
  }

  #onInput(e: Event) {
    this._newTagName = (e.target as HTMLInputElement).value;
  }

  #onKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") this.#addTag();
  }

  #onPageChange(e: CustomEvent<PageChangeDetail>) {
    this._currentPage = e.detail.page;
    this._pageSize = e.detail.pageSize;
  }

  #onFilterChange(e: CustomEvent<FilterChangeDetail>) {
    this._filter = e.detail.filter;
    this._currentPage = 1;
  }

  #onNameSortClick() {
    this._sortDir = this._sortDir === "asc" ? "desc" : "asc";
    this._currentPage = 1;
  }

  #sorted(tags: Tag[]): Tag[] {
    const dir = this._sortDir === "asc" ? 1 : -1;
    return [...tags].sort((a, b) => a.name.localeCompare(b.name) * dir);
  }

  #renderIconPicker(selectedIcon: string, onSelect: (icon: string) => void) {
    return html`
      <div class="icon-picker">
        <div class="icon-grid">
          ${COMMON_ICONS.map(
            (emoji) => html`
            <button
              class="icon-btn ${selectedIcon === emoji ? "selected" : ""}"
              @click=${() => onSelect(selectedIcon === emoji ? "" : emoji)}
            >${emoji}</button>
          `,
          )}
        </div>
        <div class="icon-input-row">
          <span>Or type:</span>
          <input
            type="text"
            .value=${selectedIcon}
            placeholder="😀"
            @input=${(e: Event) => onSelect((e.target as HTMLInputElement).value)}
          />
          ${selectedIcon ? html`<span class="icon-preview">${selectedIcon}</span>` : nothing}
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <h3>Tags</h3>
      <div class="tag-form">
        <input
          type="text"
          placeholder="New tag name"
          .value=${this._newTagName}
          @input=${this.#onInput}
          @keydown=${this.#onKeyDown}
        />
        <button @click=${this.#addTag}>Add</button>
      </div>
      ${this.#renderIconPicker(this._newTagIcon, (icon) => {
        this._newTagIcon = icon;
      })}
      ${this._error ? html`<p class="error">${this._error}</p>` : ""}
      ${(() => {
        const lower = this._filter.toLowerCase();
        const filtered = lower
          ? this._tags.filter((t) => t.name.toLowerCase().includes(lower))
          : this._tags;
        const sorted = this.#sorted(filtered);
        const start = (this._currentPage - 1) * this._pageSize;
        const pageTags = sorted.slice(start, start + this._pageSize);
        const indicator = this._sortDir === "asc" ? " ▲" : " ▼";
        return html`
          <paginated-table
            .totalItems=${filtered.length}
            .defaultPageSize=${25}
            storageKey="tags"
            ?filterable=${true}
            @page-change=${this.#onPageChange}
            @filter-change=${this.#onFilterChange}
          >
            <table>
              <thead>
                <tr>
                  <th class="sortable" @click=${this.#onNameSortClick}>Name${indicator}</th>
                  <th>Icon</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${pageTags.map(
                  (tag) => html`
                  <tr>
                    <td>
                      ${tag.icon ? html`<span class="tag-icon">${tag.icon}</span>` : nothing}${tag.name}
                    </td>
                    <td>
                      ${
                        this._editingTagId === tag.id
                          ? html`
                          ${this.#renderIconPicker(this._editingIcon, (icon) => {
                            this._editingIcon = icon;
                          })}
                          <button @click=${() => this.#saveTagIcon(tag)}>Save</button>
                          <button class="delete-btn" @click=${() => {
                            this._editingTagId = null;
                          }}>Cancel</button>
                        `
                          : html`
                          <button
                            class="edit-icon-btn"
                            @click=${() => {
                              this._editingTagId = tag.id!;
                              this._editingIcon = tag.icon ?? "";
                            }}
                          >${tag.icon ? tag.icon : "Set icon"}</button>
                        `
                      }
                    </td>
                    <td>
                      <button class="delete-btn" @click=${() => this.#deleteTag(tag.id!)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                `,
                )}
              </tbody>
            </table>
          </paginated-table>
        `;
      })()}
    `;
  }
}
