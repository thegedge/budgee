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
    [popover] {
      background: var(--budgee-surface, #fff);
      border-radius: 8px;
      padding: 1.5rem;
      max-width: 800px;
      width: min(90vw, 800px);
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
      border: none;
      margin: auto;
      position: fixed;
      inset: 0;
      height: fit-content;
    }
    [popover]::backdrop {
      background: rgba(0, 0, 0, 0.5);
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

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => {
      const el = this.shadowRoot?.getElementById("popover");
      el?.showPopover?.();
      el?.addEventListener("toggle", (e: Event) => {
        if ((e as ToggleEvent).newState === "closed") {
          this.dispatchEvent(new CustomEvent("modal-close"));
        }
      });
    });
  }

  #onClose() {
    this.shadowRoot?.getElementById("popover")?.hidePopover?.();
  }

  render() {
    return html`
      <div id="popover" popover="auto">
        <div class="header">
          <h3>${this.heading}</h3>
          <button class="close" @click=${this.#onClose}>&times;</button>
        </div>
        <slot></slot>
      </div>
    `;
  }
}
