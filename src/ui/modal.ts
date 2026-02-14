import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "budgee-modal": Modal;
  }
}

@customElement("budgee-modal")
export class Modal extends LitElement {
  @property({ type: String })
  heading = "";

  static styles = css`
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal {
      background: var(--budgee-surface, #fff);
      border-radius: 8px;
      padding: 1.5rem;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    h3 {
      margin: 0;
    }
    .close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--budgee-text-muted, #888);
      padding: 0;
      line-height: 1;
    }
    .close:hover {
      color: var(--budgee-text, #333);
    }
  `;

  #onClose() {
    this.dispatchEvent(new CustomEvent("modal-close"));
  }

  #onOverlayClick(e: Event) {
    if (e.target === e.currentTarget) {
      this.#onClose();
    }
  }

  render() {
    return html`
      <div class="overlay" @click=${this.#onOverlayClick}>
        <div class="modal">
          <div class="header">
            <h3>${this.heading}</h3>
            <button class="close" @click=${this.#onClose}>&times;</button>
          </div>
          <slot></slot>
        </div>
      </div>
    `;
  }
}
