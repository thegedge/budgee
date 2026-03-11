import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "ui-badge": Badge;
  }
}

@customElement("ui-badge")
export class Badge extends LitElement {
  @property({ type: String, reflect: true })
  variant: "warning" | "danger" | "success" | "info" = "info";

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      padding: 2px 7px;
      border-radius: 8px;
      white-space: nowrap;
    }
    :host([variant="warning"]) {
      --color: var(--budgee-warning, lch(80% 80 85));
      color: light-dark(lch(15% 35 85), lch(85% 35 85));
      background: color-mix(in lch, var(--color) 25%, transparent);
    }
    :host([variant="danger"]) {
      --color: var(--budgee-danger, lch(72.8% 28.9 22.1));
      color: var(--color);
      background: color-mix(in lch, var(--color) 15%, transparent);
    }
    :host([variant="success"]) {
      --color: var(--budgee-success, lch(63.6% 33.6 180.1));
      color: var(--color);
      background: color-mix(in lch, var(--color) 15%, transparent);
    }
    :host([variant="info"]) {
      --color: var(--budgee-primary, lch(72.1% 25.1 246.4));
      color: var(--color);
      background: color-mix(in lch, var(--color) 15%, transparent);
    }
    ::slotted(svg) {
      width: 0.85rem;
      height: 0.85rem;
    }
  `;

  render() {
    return html`
      <slot></slot>
    `;
  }
}
