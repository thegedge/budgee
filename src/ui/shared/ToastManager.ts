import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import xIcon from "lucide-static/icons/x.svg?raw";
import type { ToastOptions, ToastType } from "./toast";

interface ToastEntry {
  id: number;
  message: string;
  type: ToastType;
  dismissing: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    "budgee-toast-manager": ToastManager;
  }
}

let nextId = 0;

@customElement("budgee-toast-manager")
export class ToastManager extends LitElement {
  @state() private _toasts: ToastEntry[] = [];

  readonly #timers = new Map<number, ReturnType<typeof setTimeout>>();

  static styles = css`
    :host {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 10000;
      display: flex;
      flex-direction: column-reverse;
      gap: 0.5rem;
      pointer-events: none;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: 6px;
      color: white;
      font-size: 0.9rem;
      font-weight: 500;
      box-shadow: 0 4px 12px lch(0% 0 none / 0.15);
      pointer-events: auto;
      animation: slide-in 0.2s ease-out;
      min-width: 250px;
      max-width: 400px;
    }

    .toast.dismissing {
      animation: slide-out 0.2s ease-in forwards;
    }

    .toast.success {
      background: var(--budgee-success);
    }
    .toast.error {
      background: var(--budgee-danger);
    }
    .toast.info {
      background: var(--budgee-primary);
    }

    .message {
      flex: 1;
    }

    .close {
      display: inline-flex;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 2px;
      opacity: 0.8;
      line-height: 1;
    }
    .close:hover {
      opacity: 1;
    }
    .close svg {
      width: 16px;
      height: 16px;
    }

    @keyframes slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slide-out {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("budgee-toast", this.#onToast as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("budgee-toast", this.#onToast as EventListener);
    for (const timer of this.#timers.values()) clearTimeout(timer);
    this.#timers.clear();
  }

  #onToast = (e: CustomEvent<ToastOptions>) => {
    const { message, type = "info", duration = 4000 } = e.detail;
    const id = nextId++;
    this._toasts = [...this._toasts, { id, message, type, dismissing: false }];
    this.#timers.set(
      id,
      setTimeout(() => this.#dismiss(id), duration),
    );
  };

  #dismiss(id: number) {
    const timer = this.#timers.get(id);
    if (timer) clearTimeout(timer);
    this.#timers.delete(id);

    this._toasts = this._toasts.map((t) =>
      t.id === id ? { ...t, dismissing: true } : t,
    );
    setTimeout(() => {
      this._toasts = this._toasts.filter((t) => t.id !== id);
    }, 200);
  }

  render() {
    return html`
      <div aria-live="polite" aria-atomic="false">
        ${this._toasts.map(
          (t) => html`
            <div class=${classMap({ toast: true, [t.type]: true, dismissing: t.dismissing })}>
              <span class="message">${t.message}</span>
              <button class="close" aria-label="Dismiss" @click=${() => this.#dismiss(t.id)}>
                ${unsafeSVG(xIcon)}
              </button>
            </div>
          `,
        )}
      </div>
    `;
  }
}
