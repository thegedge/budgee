import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { db } from "../../database/db";
import type { MerchantRule, Tag } from "../../database/types";
import { matchesRule } from "../../import/applyRules";

declare global {
  interface HTMLElementTagNameMap {
    "rule-overlap": RuleOverlap;
  }
}

interface OverlapPair {
  ruleA: MerchantRule;
  ruleB: MerchantRule;
  count: number;
  sampleDescriptions: string[];
}

@customElement("rule-overlap")
export class RuleOverlap extends LitElement {
  @state()
  private _overlaps: OverlapPair[] = [];

  @state()
  private _merchants = new Map<number, string>();

  @state()
  private _tags: Tag[] = [];

  @state()
  private _loading = true;

  static styles = css`
    :host {
      display: block;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th,
    td {
      border: 1px solid var(--budgee-border, #e0e0e0);
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: var(--budgee-primary, #7eb8da);
      color: white;
    }
    tbody tr:nth-child(even) {
      background-color: var(--budgee-bg, #fafafa);
    }
    .condition-summary {
      font-size: 0.85rem;
      color: var(--budgee-text-muted, #888);
    }
    .samples {
      font-size: 0.8rem;
      color: var(--budgee-text-muted, #888);
      font-style: italic;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.#analyze();
  }

  async #analyze() {
    const [rules, transactions, merchants, tags] = await Promise.all([
      db.merchantRules.toArray(),
      db.transactions.toArray(),
      db.merchants.toArray(),
      db.tags.toArray(),
    ]);

    this._merchants = new Map(merchants.map((m) => [m.id!, m.name]));
    this._tags = tags;

    const pairCounts = new Map<
      string,
      { ruleA: MerchantRule; ruleB: MerchantRule; count: number; samples: string[] }
    >();

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
            if (existing.samples.length < 3) {
              existing.samples.push(tx.originalDescription);
            }
          } else {
            pairCounts.set(key, {
              ruleA: matching[i],
              ruleB: matching[j],
              count: 1,
              samples: [tx.originalDescription],
            });
          }
        }
      }
    }

    this._overlaps = [...pairCounts.values()]
      .sort((a, b) => b.count - a.count)
      .map((p) => ({
        ruleA: p.ruleA,
        ruleB: p.ruleB,
        count: p.count,
        sampleDescriptions: p.samples,
      }));

    this._loading = false;
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
              <td class="samples">${o.sampleDescriptions.join(", ")}</td>
            </tr>
          `,
          )}
        </tbody>
      </table>
    `;
  }
}
