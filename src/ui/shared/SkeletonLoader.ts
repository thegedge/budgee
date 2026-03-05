import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

declare global {
  interface HTMLElementTagNameMap {
    "budgee-skeleton": SkeletonLoader;
  }
}

@customElement("budgee-skeleton")
export class SkeletonLoader extends LitElement {
  @property() variant: "table" | "card" | "text" = "table";
  @property({ type: Number }) rows = 5;

  static styles = css`
    :host {
      display: block;
    }
    .skeleton-line {
      height: 1rem;
      background: var(--budgee-border);
      border-radius: 4px;
      animation: pulse 1.5s ease-in-out infinite;
    }
    .table-row {
      display: flex;
      gap: 1rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid var(--budgee-border);
    }
    .table-row .skeleton-line {
      flex: 1;
    }
    .table-row .skeleton-line:first-child {
      flex: 2;
    }
    .card {
      border: 1px solid var(--budgee-border);
      border-radius: 8px;
      padding: 1rem;
    }
    .card .skeleton-line {
      margin-bottom: 0.75rem;
    }
    .card .skeleton-line:last-child {
      margin-bottom: 0;
      width: 60%;
    }
    .text .skeleton-line {
      margin-bottom: 0.5rem;
    }
    .text .skeleton-line:last-child {
      width: 70%;
    }
    @keyframes pulse {
      0%,
      100% {
        opacity: 0.4;
      }
      50% {
        opacity: 1;
      }
    }
  `;

  render() {
    const rows = Array.from({ length: this.rows });

    if (this.variant === "table") {
      return html`
        <div aria-live="polite" aria-label="Loading">
          ${rows.map(
            () => html`
              <div class="table-row">
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line"></div>
              </div>
            `,
          )}
        </div>
      `;
    }

    if (this.variant === "card") {
      return html`
        <div class="card" aria-live="polite" aria-label="Loading">
          <div class="skeleton-line" style="width: 40%; height: 1.2rem"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
        </div>
      `;
    }

    return html`
      <div class="text" aria-live="polite" aria-label="Loading">
        ${rows.map(
          () =>
            html`
              <div class="skeleton-line"></div>
            `,
        )}
      </div>
    `;
  }
}
