import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("budgee-app")
export class BudgeeApp extends LitElement {
  @property()
  title = "Budgee";

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      color: var(--budgee-text-color, #000);
    }
    h1 {
      font-size: 1.5rem;
    }
  `;

  render() {
    return html`
      <h1>Hello, ${this.title}!</h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "budgee-app": BudgeeApp;
  }
}
