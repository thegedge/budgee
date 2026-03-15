import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
import { Tag } from "../../models/Tag";
import { colorToHex } from "../../color/colorToHex";
import { buttonStyles } from "../buttonStyles";
import { showToast } from "../shared/toast";
import { iconButtonStyles } from "../iconButtonStyles";
import { inputStyles } from "../inputStyles";
import { BusyMixin, busyStyles } from "../shared/BusyMixin";
import { DataSubscriptionController } from "../DataSubscriptionController";
import "../shared/EmptyState";
import "../shared/IconPicker";
import "../shared/PaginatedTable";
import "../shared/SkeletonLoader";

declare global {
  interface HTMLElementTagNameMap {
    "tag-manager": TagManager;
  }
}

@customElement("tag-manager")
export class TagManager extends BusyMixin(LitElement) {
  @state()
  private _tags: Tag[] | null = null;

  @state()
  private _newTagName = "";

  @state()
  private _error = "";

  static styles = [
    buttonStyles,
    busyStyles,
    iconButtonStyles,
    inputStyles,
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

  constructor() {
    super();
    new DataSubscriptionController(this, [Tag.subscribe], () => this.#refreshTags());
  }

  async #refreshTags() {
    this._tags = await Tag.all();
  }

  async #addTag() {
    const name = this._newTagName.trim();
    if (!name) return;

    this._error = "";

    const existing = await Tag.byName(name);
    if (existing) {
      this._error = `Tag "${name}" already exists.`;
      return;
    }

    await this.withBusy(async () => {
      await Tag.create(name);
      this._newTagName = "";
      showToast({ message: "Tag created", type: "success" });
      await this.#refreshTags();
    });
  }

  async #deleteTag(id: string) {
    await this.withBusy(async () => {
      await Tag.remove(id);
      showToast({ message: "Tag deleted", type: "success" });
      await this.#refreshTags();
    });
  }

  async #saveTagIcon(tag: Tag, icon: string) {
    await this.withBusy(async () => {
      await Tag.update(tag.id, { icon: icon || undefined });
      await this.#refreshTags();
    });
  }

  #toHex(color?: string): string {
    return color ? colorToHex(color) : "#7eb8da";
  }

  async #saveTagColor(tag: Tag, color: string) {
    await this.withBusy(async () => {
      await Tag.update(tag.id, { color });
      await this.#refreshTags();
    });
  }

  #onInput(e: Event) {
    this._newTagName = (e.target as HTMLInputElement).value;
  }

  #onKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") this.#addTag();
  }

  render() {
    if (this._tags === null) {
      return html`
        <budgee-skeleton variant="table" rows="5"></budgee-skeleton>
      `;
    }

    return html`
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
      ${
        this._tags.length === 0
          ? html`
              <budgee-empty-state
                heading="No tags yet"
                description="Create a tag above to get started."
              ></budgee-empty-state>
            `
          : ""
      }
      ${
        this._tags.length === 0
          ? ""
          : html`
          <paginated-table
            .items=${this._tags}
            .defaultPageSize=${25}
            storageKey="tags"
            .columns=${[
              { label: "Icon", class: "col-icon" },
              { label: "Color", class: "col-color" },
              { label: "Name", sortKey: "name", class: "col-grow" },
              { class: "col-remove" },
            ]}
            .comparators=${{ name: (a: Tag, b: Tag) => a.name.localeCompare(b.name) }}
            .filterFn=${(tag: Tag, filter: string) => tag.name.toLowerCase().includes(filter.toLowerCase())}
            defaultSortCol="name"
            defaultSortDir="asc"
            .renderRow=${(tag: Tag) => html`
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
                <td class="col-grow">
                  ${tag.name}
                </td>
                <td class="col-remove">
                  <button class="icon-btn icon-btn--danger" title="Remove tag" aria-label="Remove tag" @click=${() => this.#deleteTag(tag.id)}>
                    ${unsafeSVG(trash2Icon)}
                  </button>
                </td>
              </tr>
            `}
          ></paginated-table>
        `
      }
    `;
  }
}
