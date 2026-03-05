import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles } from "../buttonStyles";
import "./Modal";

declare global {
  interface HTMLElementTagNameMap {
    "budgee-confirm-dialog": ConfirmDialog;
  }
}

@customElement("budgee-confirm-dialog")
export class ConfirmDialog extends LitElement {
  @property() heading = "Are you sure?";
  @property() message = "";
  @property({ attribute: "confirm-label" }) confirmLabel = "Confirm";
  @property({ attribute: "cancel-label" }) cancelLabel = "Cancel";
  @property({ type: Boolean }) danger = false;

  #resolve?: (value: boolean) => void;

  static styles = [
    buttonStyles,
    css`
      .message {
        margin-bottom: 1.5rem;
        line-height: 1.5;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }
      button {
        padding: 0.5rem 1rem;
      }
    `,
  ];

  static show(options: {
    heading?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    danger?: boolean;
  }): Promise<boolean> {
    return new Promise((resolve) => {
      const dialog = document.createElement("budgee-confirm-dialog");
      if (options.heading) dialog.heading = options.heading;
      dialog.message = options.message;
      if (options.confirmLabel) dialog.confirmLabel = options.confirmLabel;
      if (options.cancelLabel) dialog.cancelLabel = options.cancelLabel;
      if (options.danger) dialog.danger = options.danger;
      dialog.#resolve = (value: boolean) => {
        dialog.remove();
        resolve(value);
      };
      document.body.appendChild(dialog);
    });
  }

  #onConfirm() {
    this.#resolve?.(true);
  }

  #onCancel() {
    this.#resolve?.(false);
  }

  #onModalClose() {
    this.#resolve?.(false);
  }

  render() {
    return html`
      <budgee-modal heading=${this.heading} @modal-close=${this.#onModalClose}>
        <div class="message">${this.message}</div>
        <div class="actions">
          <button class="secondary" @click=${this.#onCancel}>${this.cancelLabel}</button>
          <button class=${this.danger ? "danger" : ""} @click=${this.#onConfirm}>
            ${this.confirmLabel}
          </button>
        </div>
      </budgee-modal>
    `;
  }
}
