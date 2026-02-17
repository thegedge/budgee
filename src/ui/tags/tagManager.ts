import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
import { colorToHex } from "../../data/tagColor";
import { iconButtonStyles } from "../iconButtonStyles";
import { Tags } from "../../data/tags";
import type { Tag } from "../../database/types";
import { BusyMixin, busyStyles } from "../shared/busyMixin";
import "../shared/iconPicker";
import "../shared/paginatedTable";
import type { FilterChangeDetail, PageChangeDetail } from "../shared/paginatedTable";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "tag-manager": TagManager;
  }
}

type SortDir = "asc" | "desc";

@customElement("tag-manager")
export class TagManager extends BusyMixin(LitElement) {
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

  static styles = [
    busyStyles,
    tableStyles,
    iconButtonStyles,
    css`
      :host {
        display: block;
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        margin-bottom: 1rem;
        background: var(--budgee-surface);
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
        background-color: var(--budgee-primary);
        color: white;
        border: none;
        border-radius: 4px;
      }
      button:hover {
        background-color: var(--budgee-primary-hover);
      }
      .error {
        color: var(--budgee-danger-hover);
        font-size: 0.85rem;
      }
      .col-icon,
      .col-color,
      .col-remove {
        width: 1%;
        white-space: nowrap;
      }
      .color-swatch {
        width: 2rem;
        height: 1.5rem;
        border: none;
        padding: 0;
        cursor: pointer;
        border-radius: 4px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.#refreshTags();
  }

  async #refreshTags() {
    this._tags = await Tags.all();
  }

  async #addTag() {
    const name = this._newTagName.trim();
    if (!name) return;

    this._error = "";

    const existing = await Tags.byName(name);
    if (existing) {
      this._error = `Tag "${name}" already exists.`;
      return;
    }

    await this.withBusy(async () => {
      await Tags.create(name);
      this._newTagName = "";
      await this.#refreshTags();
    });
  }

  async #deleteTag(id: string) {
    await this.withBusy(async () => {
      await Tags.remove(id);
      await this.#refreshTags();
    });
  }

  async #saveTagIcon(tag: Tag, icon: string) {
    await this.withBusy(async () => {
      await Tags.update(tag._id!, { icon: icon || undefined });
      await this.#refreshTags();
    });
  }

  #toHex(color?: string): string {
    return color ? colorToHex(color) : "#7eb8da";
  }

  async #saveTagColor(tag: Tag, color: string) {
    await this.withBusy(async () => {
      await Tags.update(tag._id!, { color });
      await this.#refreshTags();
    });
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
                  <th class="col-color">Color</th>
                  <th class="sortable" @click=${this.#onNameSortClick}>Name${indicator}</th>
                  <th class="col-remove"></th>
                </tr>
              </thead>
              <tbody>
                ${pageTags.map(
                  (tag) => html`
                  <tr>
                    <td class="col-icon">
                      <icon-picker
                        .value=${tag.icon ?? ""}
                        @icon-selected=${(e: CustomEvent<{ icon: string }>) =>
                          this.#saveTagIcon(tag, e.detail.icon)}
                      ></icon-picker>
                    </td>
                    <td class="col-color">
                      <input
                        type="color"
                        class="color-swatch"
                        .value=${this.#toHex(tag.color)}
                        @change=${(e: Event) =>
                          this.#saveTagColor(tag, (e.target as HTMLInputElement).value)}
                      />
                    </td>
                    <td>
                      ${tag.name}
                    </td>
                    <td class="col-remove">
                      <button class="icon-btn icon-btn--danger" aria-label="Remove tag" @click=${() => this.#deleteTag(tag._id!)}>
                        ${unsafeSVG(trash2Icon)}
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
