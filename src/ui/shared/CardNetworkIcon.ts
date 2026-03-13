import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { siVisa, siMastercard, siAmericanexpress, siDiscover } from "simple-icons";
import type { CardNetwork } from "../../cardNetwork";

declare global {
  interface HTMLElementTagNameMap {
    "card-network-icon": CardNetworkIcon;
  }
}

const icons: Record<CardNetwork, { path: string; hex: string; title: string }> = {
  Visa: siVisa,
  Mastercard: siMastercard,
  Amex: siAmericanexpress,
  Discover: siDiscover,
};

@customElement("card-network-icon")
export class CardNetworkIcon extends LitElement {
  @property({ type: String })
  network?: CardNetwork;

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.8em;
      height: 1.1em;
      border-radius: 0.2em;
      overflow: hidden;
    }
    svg {
      width: 1.25em;
      height: 1.25em;
    }
  `;

  render() {
    if (!this.network) return nothing;
    const icon = icons[this.network];
    return html`
      <span class="badge" style="background:#${icon.hex}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
          role="img" aria-label="${icon.title}" fill="white">
          <path d="${icon.path}" />
        </svg>
      </span>
    `;
  }
}
