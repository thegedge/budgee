import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { db } from "../../database/db";
import type { Tag } from "../../database/types";
import type { FilterChangeDetail, PageChangeDetail } from "../paginatedTable";
import "../paginatedTable";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "tag-manager": TagManager;
  }
}

type SortDir = "asc" | "desc";

@customElement("tag-manager")
export class TagManager extends LitElement {
  @state()
  private _tags: Tag[] = [];

  @state()
  private _newTagName = "";

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

  static styles = [
    tableStyles,
    css`
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
      .col-icon {
        width: min-content;
      }
      .col-remove {
        width: min-content;
      }
      .icon-btn {
        background: none;
        border: 1px solid var(--budgee-border, #e0e0e0);
        border-radius: 4px;
        padding: 4px;
        font-size: 1.2rem;
        cursor: pointer;
        color: inherit;
        width: 2.2rem;
        height: 2.2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .icon-btn:hover {
        background-color: var(--budgee-bg, #fafafa);
      }
      .icon-btn.placeholder {
        color: var(--budgee-text-muted, #888);
        font-size: 1rem;
      }
      .icon-edit {
        display: flex;
        gap: 0.25rem;
        align-items: center;
      }
      .icon-edit input {
        width: 3rem;
        flex: none;
        text-align: center;
        font-size: 1.1rem;
        padding: 2px 4px;
      }
    `,
  ];

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

    try {
      await db.tags.add({ name });
      this._newTagName = "";
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
                  <th class="col-icon">Icon</th>
                  <th class="sortable" @click=${this.#onNameSortClick}>Name${indicator}</th>
                  <th class="col-remove"></th>
                </tr>
              </thead>
              <tbody>
                ${pageTags.map(
                  (tag) => html`
                  <tr>
                    <td class="col-icon">
                      ${
                        this._editingTagId === tag.id
                          ? html`
                          <div class="icon-edit">
                            <input
                              type="text"
                              .value=${this._editingIcon}
                              placeholder="😀"
                              @input=${(e: Event) => {
                                this._editingIcon = (e.target as HTMLInputElement).value;
                              }}
                            />
                            <button @click=${() => this.#saveTagIcon(tag)}>Save</button>
                            <button class="delete-btn" @click=${() => {
                              this._editingTagId = null;
                            }}>Cancel</button>
                          </div>
                        `
                          : html`
                          <button
                            class="icon-btn ${tag.icon ? "" : "placeholder"}"
                            @click=${() => {
                              this._editingTagId = tag.id!;
                              this._editingIcon = tag.icon ?? "";
                            }}
                          >${tag.icon ? tag.icon : "?"}</button>
                        `
                      }
                    </td>
                    <td>${tag.name}</td>
                    <td class="col-remove">
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
