import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { db } from "../../database/db";
import type { Tag } from "../../database/types";

declare global {
  interface HTMLElementTagNameMap {
    "tag-manager": TagManager;
  }
}

@customElement("tag-manager")
export class TagManager extends LitElement {
  @state()
  private _tags: Tag[] = [];

  @state()
  private _newTagName = "";

  @state()
  private _error = "";

  static styles = css`
    :host {
      display: block;
      border: 1px solid #ccc;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
    .tag-form {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    input {
      padding: 4px 8px;
      flex: 1;
    }
    button {
      padding: 4px 12px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
    }
    .delete-btn {
      background-color: #dc3545;
      font-size: 0.8rem;
      padding: 2px 8px;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 0;
      border-bottom: 1px solid #eee;
    }
    .error {
      color: #dc3545;
      font-size: 0.85rem;
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

  #onInput(e: Event) {
    this._newTagName = (e.target as HTMLInputElement).value;
  }

  #onKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") this.#addTag();
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
      <ul>
        ${this._tags.map(
          (tag) => html`
          <li>
            <span>${tag.name}</span>
            <button class="delete-btn" @click=${() => this.#deleteTag(tag.id!)}>Remove</button>
          </li>
        `,
        )}
      </ul>
    `;
  }
}
