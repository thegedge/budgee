import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { MerchantRule } from "../../models/MerchantRule";
import { tableStyles } from "../tableStyles";
import "../shared/SkeletonLoader";

declare global {
  interface HTMLElementTagNameMap {
    "rule-overlap": RuleOverlap;
  }
}

export interface OverlapPair {
  ruleA: MerchantRule;
  ruleB: MerchantRule;
  count: number;
  samples: Set<string>;
}

@customElement("rule-overlap")
export class RuleOverlap extends LitElement {
  @property({ attribute: false })
  overlaps: OverlapPair[] = [];

  @property({ attribute: false })
  merchants = new Map<string, string>();

  @property({ type: Boolean })
  loading = false;

  static styles = [
    tableStyles,
    css`
      :host {
        display: block;
      }
      .section {
        border: 1px solid var(--budgee-border);
        padding: 1rem;
        border-radius: 4px;
        background: var(--budgee-surface);
        box-sizing: border-box;
        height: 100%;
      }
      .section h3 {
        margin-top: 0;
      }
      .condition-summary {
        font-size: 0.85rem;
        color: var(--budgee-text-muted);
      }
      .samples {
        font-size: 0.8rem;
        color: var(--budgee-text-muted);
        font-style: italic;
        white-space: pre-wrap;
      }
    `,
  ];

  #formatRule(rule: MerchantRule): string {
    const merchant = rule.merchantId ? (this.merchants.get(rule.merchantId) ?? "") : "";
    const conditions = rule.conditions
      .map((c) => (c.operator === "oneOf" ? `one of [${c.value}]` : `${c.operator} "${c.value}"`))
      .join(rule.logic === "and" ? " AND " : " OR ");
    return merchant ? `${merchant}: ${conditions}` : conditions;
  }

  render() {
    if (this.loading) {
      return html`
        <div class="section">
          <h3>Rule Overlap</h3>
          <budgee-skeleton variant="table" rows="3"></budgee-skeleton>
        </div>
      `;
    }

    if (this.overlaps.length === 0) {
      return html`
        <div class="section">
          <h3>Rule Overlap</h3>
          <p>No overlapping rules found.</p>
        </div>
      `;
    }

    return html`
      <div class="section">
      <h3>Rule Overlap</h3>
      <p>${this.overlaps.length} overlapping rule pair${this.overlaps.length === 1 ? "" : "s"} found.</p>
      <table>
        <thead>
          <tr>
            <th>Rule A</th>
            <th>Rule B</th>
            <th>Overlapping Transactions</th>
            <th class="col-grow">Examples</th>
          </tr>
        </thead>
        <tbody>
          ${this.overlaps.map(
            (o) => html`
            <tr>
              <td class="condition-summary">${this.#formatRule(o.ruleA)}</td>
              <td class="condition-summary">${this.#formatRule(o.ruleB)}</td>
              <td>${o.count}</td>
              <td class="samples col-grow">${o.samples.values().take(3).toArray().join("\n\n")}</td>
            </tr>
          `,
          )}
        </tbody>
      </table>
      </div>
    `;
  }
}
