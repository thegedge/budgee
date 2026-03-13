import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { cardNetworkFromPrefix } from "../../cardNetwork";
import "./CardNetworkIcon";

declare global {
  interface HTMLElementTagNameMap {
    "account-name": AccountName;
  }
}

@customElement("account-name")
export class AccountName extends LitElement {
  @property({ type: String })
  name = "";

  @property({ type: String })
  alias?: string;

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.35em;
    }
    .raw-name {
      font-size: 0.85em;
      color: var(--budgee-text-muted);
    }
  `;

  render() {
    const network = cardNetworkFromPrefix(this.name);
    return html`
      ${network ? html`<card-network-icon .network=${network}></card-network-icon>` : nothing}
      ${this.alias ? html`<span>${this.alias}</span><span class="raw-name">${this.name}</span>` : html`<span>${this.name}</span>`}
    `;
  }
}
