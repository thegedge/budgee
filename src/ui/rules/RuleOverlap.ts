import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { MerchantRules } from "../../data/MerchantRules";
import { Merchants } from "../../data/Merchants";
import { Transactions } from "../../data/Transactions";
import type { MerchantRule } from "../../database/types";
import { matchesRule } from "../../import/matchesRule";
import { BusyMixin, busyStyles } from "../shared/BusyMixin";
import { tableStyles } from "../tableStyles";

declare global {
  interface HTMLElementTagNameMap {
    "rule-overlap": RuleOverlap;
  }
}

interface OverlapPair {
  ruleA: MerchantRule;
  ruleB: MerchantRule;
  count: number;
  samples: Set<string>;
}

@customElement("rule-overlap")
export class RuleOverlap extends BusyMixin(LitElement) {
  @property({ type: Number })
  refreshTrigger = 0;

  @state()
  private _overlaps: OverlapPair[] = [];

  @state()
  private _merchants = new Map<string, string>();

  @state()
  private _loading = true;

  static styles = [
    busyStyles,
    tableStyles,
    css`
      :host {
        display: block;
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

  connectedCallback() {
    super.connectedCallback();
    this.#analyze();
  }

  willUpdate(changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has("refreshTrigger") &&
      changedProperties.get("refreshTrigger") !== undefined
    ) {
      this.#analyze();
    }
  }

  async #analyze() {
    await this.withBusy(async () => {
      const [rules, transactions, merchants] = await Promise.all([
        MerchantRules.all(),
        Transactions.all(),
        Merchants.all(),
      ]);

      this._merchants = new Map(merchants.map((m) => [m.id, m.name]));
      const pairCounts = new Map<string, OverlapPair>();

      for (const tx of transactions) {
        const desc = tx.originalDescription.toLowerCase();
        const matching = rules.filter((r) => matchesRule(desc, r));
        if (matching.length < 2) continue;

        for (let i = 0; i < matching.length; i++) {
          for (let j = i + 1; j < matching.length; j++) {
            const key = [matching[i].id, matching[j].id].sort().join("-");
            const existing = pairCounts.get(key);
            if (existing) {
              existing.count++;
              existing.samples.add(tx.originalDescription);
            } else {
              pairCounts.set(key, {
                ruleA: matching[i],
                ruleB: matching[j],
                count: 1,
                samples: new Set([tx.originalDescription]),
              });
            }
          }
        }
      }

      this._overlaps = [...pairCounts.values()].sort((a, b) => b.count - a.count);
      this._loading = false;
    });
  }

  #formatRule(rule: MerchantRule): string {
    const merchant = rule.merchantId ? (this._merchants.get(rule.merchantId) ?? "") : "";
    const conditions = rule.conditions
      .map((c) => `${c.operator} "${c.value}"`)
      .join(rule.logic === "and" ? " AND " : " OR ");
    return merchant ? `${merchant}: ${conditions}` : conditions;
  }

  render() {
    if (this._loading) {
      return html`
        <p>Analyzing rules...</p>
      `;
    }

    if (this._overlaps.length === 0) {
      return html`
        <h2>Rule Overlap</h2>
        <p>No overlapping rules found.</p>
      `;
    }

    return html`
      <h2>Rule Overlap</h2>
      <p>${this._overlaps.length} overlapping rule pair${this._overlaps.length === 1 ? "" : "s"} found.</p>
      <table>
        <thead>
          <tr>
            <th>Rule A</th>
            <th>Rule B</th>
            <th>Overlapping Transactions</th>
            <th>Examples</th>
          </tr>
        </thead>
        <tbody>
          ${this._overlaps.map(
            (o) => html`
            <tr>
              <td class="condition-summary">${this.#formatRule(o.ruleA)}</td>
              <td class="condition-summary">${this.#formatRule(o.ruleB)}</td>
              <td>${o.count}</td>
              <td class="samples">${o.samples.values().take(3).toArray().join("\n\n")}</td>
            </tr>
          `,
          )}
        </tbody>
      </table>
    `;
  }
}
