import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

declare global {
  interface HTMLElementTagNameMap {
    "budgee-empty-state": EmptyState;
  }
}

@customElement("budgee-empty-state")
export class EmptyState extends LitElement {
  @property() icon = "";
  @property() heading = "";
  @property() description = "";

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      text-align: center;
    }
    .icon {
      color: var(--budgee-text-muted);
      margin-bottom: 1rem;
    }
    .icon svg {
      width: 48px;
      height: 48px;
    }
    h3 {
      margin: 0 0 0.5rem;
      color: var(--budgee-text);
    }
    p {
      margin: 0 0 1rem;
      color: var(--budgee-text-muted);
      max-width: 300px;
    }
  `;

  render() {
    return html`
      ${this.icon ? html`<div class="icon">${unsafeSVG(this.icon)}</div>` : ""}
      <h3>${this.heading}</h3>
      <p>${this.description}</p>
      <slot></slot>
    `;
  }
}
