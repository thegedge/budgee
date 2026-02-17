import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import birdIcon from "lucide-static/icons/bird.svg?raw";

declare global {
  interface HTMLElementTagNameMap {
    "budgee-loading-overlay": LoadingOverlay;
  }
}

@customElement("budgee-loading-overlay")
class LoadingOverlay extends LitElement {
  @property()
  message = "";

  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      gap: 1rem;
    }

    .icon {
      animation: pulse 1.2s ease-in-out infinite;
    }

    .icon svg {
      width: 3rem;
      height: 3rem;
      color: white;
    }

    .message {
      color: white;
      font-size: 1.25rem;
      font-weight: 600;
      font-family: sans-serif;
    }

    @keyframes pulse {
      0%,
      100% {
        transform: scale(1);
        opacity: 0.7;
      }
      50% {
        transform: scale(1.15);
        opacity: 1;
      }
    }
  `;

  render() {
    return html`
      <div class="icon">${unsafeSVG(birdIcon)}</div>
      <div class="message">${this.message}</div>
    `;
  }
}

let activeOverlay: LoadingOverlay | null = null;

export function showLoadingOverlay(message: string) {
  if (activeOverlay) {
    activeOverlay.message = message;
    return;
  }
  activeOverlay = document.createElement("budgee-loading-overlay");
  activeOverlay.message = message;
  document.body.appendChild(activeOverlay);
}

export function hideLoadingOverlay() {
  if (activeOverlay) {
    activeOverlay.remove();
    activeOverlay = null;
  }
}
