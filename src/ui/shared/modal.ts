import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import xIcon from "lucide-static/icons/x.svg?raw";

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
      background: var(--budgee-surface);
      border-radius: 8px;
      padding: 1.5rem;
      max-width: 800px;
      width: min(90vw, 800px);
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 4px 24px lch(0% 0 none / 0.2);
      border: none;
      margin: auto;
      position: fixed;
      inset: 0;
      height: fit-content;
    }
    [popover]::backdrop {
      background: var(--budgee-overlay);
      backdrop-filter: blur(1px);
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
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--budgee-text-muted);
      padding: 4px;
      line-height: 1;
    }
    .close:hover {
      color: var(--budgee-text);
    }
    .close svg {
      width: 20px;
      height: 20px;
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
          <button class="close" aria-label="Close" @click=${this.#onClose}>${unsafeSVG(xIcon)}</button>
        </div>
        <slot></slot>
      </div>
    `;
  }
}
