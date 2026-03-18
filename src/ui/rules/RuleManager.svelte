<script lang="ts">
  import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
  import alertTriangleIcon from "lucide-static/icons/triangle-alert.svg?raw";
  import wrenchIcon from "lucide-static/icons/wrench.svg?raw";
  import { formatAmount } from "../../formatAmount";
  import { Account } from "../../models/Account";
  import { Merchant } from "../../models/Merchant";
  import { MerchantRule, prepareTransaction } from "../../models/MerchantRule";
  import { Tag } from "../../models/Tag";
  import { Transaction } from "../../models/Transaction";
  import { showToast } from "../shared/toast";
  import { navigate } from "../navigate";
  import { useBusy } from "../../lib/busy.svelte";
  import { useSubscription } from "../../lib/subscribe.svelte";
  import PaginatedTable from "../shared/PaginatedTable.svelte";
  import EmptyState from "../shared/EmptyState.svelte";
  import Badge from "../shared/Badge.svelte";
  import Modal from "../shared/Modal.svelte";
  import AccountName from "../shared/AccountName.svelte";
  import TagPills from "../tags/TagPills.svelte";
  import RuleEditor from "./RuleEditor.svelte";
  import RuleOverlap from "./RuleOverlap.svelte";
  import type { OverlapPair } from "./RuleOverlap.svelte";
  import "../styles/button.css";
  import "../styles/icon-button.css";

  let rules = $state<MerchantRule[] | null>(null);
  let tags = $state<Tag[]>([]);
  let merchants = $state<Merchant[]>([]);
  let accounts = $state<Account[]>([]);
  let unmerchanted = $state<Transaction[]>([]);
  let unmatchedRuleIds = $state(new Set<string>());
  let overlapData = $state<OverlapPair[]>([]);

  let prefillDescription = $state("");
  let showEditor = $state(false);
  let editingRule = $state<MerchantRule | null>(null);
  let editingMerchantName = $state("");

  const { busy, withBusy } = useBusy();

  useSubscription(
    [MerchantRule.subscribe, Tag.subscribe, Merchant.subscribe, Transaction.subscribe],
    refresh,
  );

  async function refresh() {
    const allRules = await MerchantRule.all();
    const allTags = await Tag.all();
    const allMerchants = await Merchant.all();
    const allAccounts = await Account.all();
    const accountMap = Account.toLookup(allAccounts);
    const allTx = await Transaction.all();

    const matchedRuleIds = new Set<string>();
    const pairCounts = new Map<string, OverlapPair>();
    const preparedTxs = allTx.map((t) => prepareTransaction(t, accountMap));

    for (let ti = 0; ti < allTx.length; ti++) {
      const tx = allTx[ti];
      const ptx = preparedTxs[ti];
      const matching: MerchantRule[] = [];
      for (const rule of allRules) {
        if (rule.matches(ptx)) {
          matchedRuleIds.add(rule.id);
          matching.push(rule);
        }
      }
      if (matching.length >= 2) {
        for (let i = 0; i < matching.length; i++) {
          for (let j = i + 1; j < matching.length; j++) {
            const key = [matching[i].id, matching[j].id].sort().join("-");
            const existing = pairCounts.get(key);
            if (existing) {
              existing.count++;
              existing.samples.add(tx.description);
            } else {
              pairCounts.set(key, {
                ruleA: matching[i],
                ruleB: matching[j],
                count: 1,
                samples: new Set([tx.description]),
              });
            }
          }
        }
      }
    }

    rules = allRules;
    tags = allTags;
    merchants = allMerchants;
    accounts = allAccounts;
    unmerchanted = allTx.filter((t) => t.merchantId === undefined);
    unmatchedRuleIds = new Set(allRules.filter((r) => !matchedRuleIds.has(r.id)).map((r) => r.id));
    overlapData = [...pairCounts.values()].sort((a, b) => b.count - a.count);
  }

  async function onRuleSaved(detail: Record<string, unknown>) {
    await withBusy(async () => {
      const { id, logic, conditions, tagIds, newTagNames, merchantName, apply } = detail;

      const allTagIds = [...(tagIds as string[])];
      if ((newTagNames as string[] | undefined)?.length) {
        for (const name of newTagNames as string[]) {
          const existing = await Tag.byName(name);
          const tagId = existing?.id ?? (await Tag.create(name)).id;
          allTagIds.push(tagId);
        }
      }

      let merchantId: string | undefined;
      if (merchantName) {
        const existing = await Merchant.byName(merchantName as string);
        merchantId = existing?.id ?? (await Merchant.create(merchantName as string)).id;
      }

      const ruleData = {
        logic: logic as "and" | "or",
        conditions: conditions as MerchantRule["conditions"],
        merchantId,
        tagIds: allTagIds,
      };

      let savedRule: MerchantRule;
      if (id) {
        await MerchantRule.put({ ...ruleData, id: id as string });
        savedRule = new MerchantRule({ ...ruleData, id: id as string });
      } else {
        savedRule = await MerchantRule.create(ruleData);
      }

      closeEditor();

      if (apply) {
        await MerchantRule.applyToTransactions(savedRule);
      }

      showToast({ message: id ? "Rule updated" : "Rule created", type: "success" });
    });
  }

  async function onRuleMerge(detail: Record<string, unknown>) {
    await withBusy(async () => {
      const { existingRuleId, conditions, apply } = detail;
      const existingRule = rules!.find((r) => r.id === existingRuleId);
      if (!existingRule) return;

      const mergedData = $state.snapshot({
        id: existingRule.id,
        logic: "or" as const,
        conditions: [...existingRule.conditions, ...(conditions as MerchantRule["conditions"])],
        merchantId: existingRule.merchantId,
        accountId: existingRule.accountId,
        tagIds: existingRule.tagIds,
      });
      await MerchantRule.put(mergedData);

      closeEditor();

      if (apply) {
        await MerchantRule.applyToTransactions(mergedData);
      }

      showToast({ message: "Rules merged", type: "success" });
    });
  }

  async function deleteRule(id: string) {
    await withBusy(async () => {
      await MerchantRule.remove(id);
      showToast({ message: "Rule deleted", type: "success" });
    });
  }

  async function editRule(rule: MerchantRule) {
    let merchantName = "";
    if (rule.merchantId) {
      const merchant = await Merchant.get(rule.merchantId);
      merchantName = merchant?.name ?? "";
    }
    editingRule = rule;
    editingMerchantName = merchantName;
    showEditor = true;
  }

  function closeEditor() {
    showEditor = false;
    editingRule = null;
    editingMerchantName = "";
    prefillDescription = "";
  }

  function selectTransaction(tx: Transaction) {
    prefillDescription = tx.description;
    showEditor = true;
  }

  function tagName(tagId: string): string {
    return tags.find((t) => t.id === tagId)?.name ?? `#${tagId}`;
  }

  function merchantName(merchantId: string | undefined): string {
    if (!merchantId) return "";
    return merchants.find((m) => m.id === merchantId)?.name ?? "";
  }

  function formatConditions(rule: MerchantRule): string {
    return rule.conditions
      .map((c) => `${c.operator} "${c.value}"`)
      .join(rule.logic === "and" ? " AND " : " OR ");
  }

  function account(accountId?: string) {
    if (!accountId) return undefined;
    return accounts.find((a) => a.id === accountId);
  }

  let loading = $derived(rules === null);
  let unmatchedRules = $derived(rules?.filter((r) => unmatchedRuleIds.has(r.id)) ?? []);
  let merchantLookup = $derived(new Map(merchants.map((m) => [m.id, m.name])));

  const ruleColumns = [
    { label: "Conditions", sortKey: "conditions", class: "col-grow" },
    { label: "Merchant", sortKey: "merchant" },
    { label: "Tags", sortKey: "tags" },
    {},
  ];

  const ruleComparators = {
    conditions: (a: MerchantRule, b: MerchantRule) => {
      const aVal = a.conditions[0]?.value ?? "";
      const bVal = b.conditions[0]?.value ?? "";
      return aVal.localeCompare(bVal);
    },
    merchant: (a: MerchantRule, b: MerchantRule) =>
      merchantName(a.merchantId).localeCompare(merchantName(b.merchantId)),
    tags: (a: MerchantRule, b: MerchantRule) => {
      const aNames = a.tagIds.map((id) => tagName(id)).join(",");
      const bNames = b.tagIds.map((id) => tagName(id)).join(",");
      return aNames.localeCompare(bNames);
    },
  };

  function ruleFilterFn(rule: MerchantRule, filter: string): boolean {
    const lower = filter.toLowerCase();
    if (rule.conditions.some((c) => c.value.toLowerCase().includes(lower))) return true;
    if (rule.merchantId) {
      const m = merchants.find((x) => x.id === rule.merchantId);
      if (m?.name.toLowerCase().includes(lower)) return true;
    }
    if (rule.tagIds.some((id) => tagName(id).toLowerCase().includes(lower))) return true;
    return false;
  }
</script>

<div class="rule-manager" class:busy>
  <div class="sections-grid">
    <div class="section full-width">
      <h3>Unmerchanted Transactions</h3>
      {#if loading}
        <PaginatedTable
          {loading}
          columns={["Date", "Account", { label: "Description", class: "col-grow" }, "Amount"]}
        >
          {#snippet renderRow(_tx: Transaction)}
            <tr><td></td><td></td><td></td><td></td></tr>
          {/snippet}
        </PaginatedTable>
      {:else if unmerchanted.length === 0}
        <p>No unmerchanted transactions.</p>
      {:else}
        <PaginatedTable
          items={unmerchanted}
          defaultPageSize={20}
          storageKey="unmerchanted"
          columns={["Date", "Account", { label: "Description", class: "col-grow" }, "Amount"]}
          filterFn={(tx: Transaction, filter: string) =>
            tx.description.toLowerCase().includes(filter.toLowerCase())}
        >
          {#snippet renderRow(tx: Transaction)}
            {@const acct = account(tx.accountId)}
            <tr class="clickable-row" onclick={() => selectTransaction(tx)}>
              <td>{tx.date}</td>
              <td>
                {#if acct}
                  <a
                    class="entity-link"
                    href={`/accounts/${acct.id}`}
                    onclick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/accounts/${acct.id}`);
                    }}
                  ><AccountName name={acct.name} alias={acct.alias} /></a>
                {/if}
              </td>
              <td class="col-grow">{tx.description}</td>
              <td class={tx.amount < 0 ? "amount-negative" : "amount-positive"}>{formatAmount(tx.amount)}</td>
            </tr>
          {/snippet}
        </PaginatedTable>
      {/if}
    </div>

    <div class="section">
      <h3>Unmatched Rules</h3>
      {#if loading}
        <PaginatedTable
          {loading}
          columns={[{ label: "Conditions", class: "col-grow" }, "Merchant", "Tags", {}]}
        >
          {#snippet renderRow(_rule: MerchantRule)}
            <tr><td></td><td></td><td></td><td></td></tr>
          {/snippet}
        </PaginatedTable>
      {:else if unmatchedRules.length === 0}
        <p>No unmatched rules found.</p>
      {:else}
        <PaginatedTable
          items={unmatchedRules}
          columns={[{ label: "Conditions", class: "col-grow" }, "Merchant", "Tags", {}]}
        >
          {#snippet renderRow(rule: MerchantRule)}
            <tr>
              <td class="condition-summary col-grow">{formatConditions(rule)}</td>
              <td>{merchantName(rule.merchantId)}</td>
              <td>
                {#if rule.tagIds.length > 0}
                  <TagPills {tags} tagIds={rule.tagIds} />
                {:else}
                  None
                {/if}
              </td>
              <td class="actions">
                <button class="icon-btn" title="Edit rule" aria-label="Edit rule" onclick={() => editRule(rule)}>{@html wrenchIcon}</button>
                <button class="icon-btn icon-btn--danger" title="Delete rule" aria-label="Delete rule" onclick={() => deleteRule(rule.id)}>{@html trash2Icon}</button>
              </td>
            </tr>
          {/snippet}
        </PaginatedTable>
      {/if}
    </div>

    <RuleOverlap {loading} overlaps={overlapData} merchants={merchantLookup} />

    <div class="section full-width">
      <h3>Existing Rules</h3>
      {#if loading}
        <PaginatedTable
          {loading}
          columns={ruleColumns}
        >
          {#snippet renderRow(_rule: MerchantRule)}
            <tr><td></td><td></td><td></td><td></td></tr>
          {/snippet}
        </PaginatedTable>
      {:else if rules!.length === 0}
        <EmptyState
          heading="No rules yet"
          description="Create a rule to automatically assign merchants and tags to transactions."
        >
          {#snippet children()}
            <button onclick={() => { showEditor = true; }}>Create Rule</button>
          {/snippet}
        </EmptyState>
      {:else}
        <PaginatedTable
          items={rules!}
          defaultPageSize={10}
          storageKey="rules"
          columns={ruleColumns}
          comparators={ruleComparators}
          filterFn={ruleFilterFn}
          defaultSortCol="conditions"
          defaultSortDir="asc"
        >
          {#snippet renderRow(rule: MerchantRule)}
            <tr>
              <td class="condition-summary col-grow">
                {formatConditions(rule)}
                {#if unmatchedRuleIds.has(rule.id)}
                  <span title="This rule matches no transactions">
                    <Badge variant="warning">
                      {#snippet children()}
                        {@html alertTriangleIcon} No matches
                      {/snippet}
                    </Badge>
                  </span>
                {/if}
              </td>
              <td>{merchantName(rule.merchantId)}</td>
              <td>
                {#if rule.tagIds.length > 0}
                  <TagPills {tags} tagIds={rule.tagIds} />
                {:else}
                  None
                {/if}
              </td>
              <td class="actions">
                <button class="icon-btn" title="Edit rule" aria-label="Edit rule" onclick={() => editRule(rule)}>{@html wrenchIcon}</button>
                <button class="icon-btn icon-btn--danger" title="Delete rule" aria-label="Delete rule" onclick={() => deleteRule(rule.id)}>{@html trash2Icon}</button>
              </td>
            </tr>
          {/snippet}
        </PaginatedTable>
      {/if}
    </div>
  </div>

  {#if showEditor}
    <Modal heading={editingRule ? "Edit Rule" : "Create Rule"} onClose={closeEditor}>
      {#snippet children()}
        <RuleEditor
          {tags}
          {merchants}
          rules={rules ?? []}
          {prefillDescription}
          {accounts}
          {editingRule}
          {editingMerchantName}
          {onRuleSaved}
          {onRuleMerge}
        />
      {/snippet}
    </Modal>
  {/if}
</div>

<style>
  .rule-manager {
    display: block;
  }
  .rule-manager.busy {
    pointer-events: none;
    cursor: wait;
    opacity: 0.6;
  }
  .section {
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    background: var(--budgee-surface);
    box-sizing: border-box;
  }
  .section h3 {
    margin-top: 0;
  }
  .condition-summary {
    font-size: 0.85rem;
    color: var(--budgee-text-muted);
  }
  .actions {
    white-space: nowrap;
  }
  .sections-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  @media (min-width: 1600px) {
    .section {
      margin-bottom: 0;
    }
    .sections-grid {
      grid-template-columns: 1fr 1fr;
    }
    .full-width {
      grid-column: 1 / -1;
    }
  }
</style>
