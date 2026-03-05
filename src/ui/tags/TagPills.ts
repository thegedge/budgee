import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import type { Tag } from "../../models/Tag";
import { adaptTagColor } from "../../color/adaptTagColor";
import { contrastTextColor } from "../../color/contrastTextColor";
import { ICON_MAP } from "../shared/IconPicker";

declare global {
  interface HTMLElementTagNameMap {
    "tag-pills": TagPills;
  }
}

@customElement("tag-pills")
export class TagPills extends LitElement {
  @property({ type: Array })
  tags: Tag[] = [];

  @property({ type: Array })
  tagIds: string[] = [];

  static styles = css`
    :host {
      display: inline-flex;
      flex-wrap: wrap;
      gap: 0.25rem;
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
  `;

  #tagLabel(tagId: string) {
    const tag = this.tags.find((t) => t.id === tagId);
    if (!tag) return `#${tagId}`;
    const svg = tag.icon ? ICON_MAP[tag.icon] : null;
    return svg ? html`<span class="pill-icon">${unsafeSVG(svg)}</span> ${tag.name}` : tag.name;
  }

  render() {
    return html`${this.tagIds.map((tagId) => {
      const tag = this.tags.find((t) => t.id === tagId);
      const adapted = tag?.color ? adaptTagColor(tag.color) : null;
      const bg = adapted ?? "var(--budgee-primary)";
      const fg = adapted ? contrastTextColor(adapted) : "white";
      return html`<span class="tag-pill" style="background:${bg};color:${fg}">${this.#tagLabel(tagId)}</span>`;
    })}`;
  }
}
