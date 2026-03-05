import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Merchant } from "../../models/Merchant";
import "../shared/AutocompleteInput";

declare global {
  interface HTMLElementTagNameMap {
    "merchant-autocomplete": MerchantAutocomplete;
  }
}

@customElement("merchant-autocomplete")
export class MerchantAutocomplete extends LitElement {
  @property({ type: Array })
  merchants: Merchant[] = [];

  @property({ type: String })
  value = "";

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
    }
    .input-wrapper {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .status {
      font-size: 0.75rem;
      white-space: nowrap;
    }
    .status.existing {
      color: var(--budgee-success);
    }
    .status.new {
      color: var(--budgee-text-muted);
      font-style: italic;
    }
  `;

  get #merchantNames(): string[] {
    return this.merchants.map((m) => m.name);
  }

  get #isExisting(): boolean {
    const q = this.value.trim().toLowerCase();
    return q.length > 0 && this.merchants.some((m) => m.name.toLowerCase() === q);
  }

  #onValueChanged(e: CustomEvent) {
    this.dispatchEvent(new CustomEvent("merchant-changed", { detail: { name: e.detail.value } }));
  }

  #onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData?.getData("text") ?? "";
    const titleCase = text.toLowerCase().replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
    const input = e.composedPath().find((el) => el instanceof HTMLInputElement) as HTMLInputElement | undefined;
    if (input) input.value = titleCase;
    this.dispatchEvent(new CustomEvent("merchant-changed", { detail: { name: titleCase } }));
  }

  render() {
    const isExisting = this.#isExisting;
    const trimmed = this.value.trim();

    return html`
      <div class="input-wrapper">
        <autocomplete-input
          .items=${this.#merchantNames}
          .value=${this.value}
          placeholder="Merchant name (optional)"
          @value-changed=${this.#onValueChanged}
          @paste=${this.#onPaste}
        ></autocomplete-input>
        ${trimmed
          ? isExisting
            ? html`<span class="status existing">existing</span>`
            : html`<span class="status new">new</span>`
          : nothing}
      </div>
    `;
  }
}
