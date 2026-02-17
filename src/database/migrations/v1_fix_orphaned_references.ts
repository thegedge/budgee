import type { DatabaseExport } from "../importDb";

/**
 * Fix orphaned tag/merchant references caused by ensureIds generating new IDs
 * for entity collections without updating cross-references in transactions,
 * merchant rules, and dashboard charts.
 */
export function migrateV1toV2(data: DatabaseExport): DatabaseExport {
  const validTagIds = new Set((data.tags ?? []).map((t) => t.id));
  const validMerchantIds = new Set((data.merchants ?? []).map((m) => m.id));
  const validAccountIds = new Set((data.accounts ?? []).map((a) => a.id));

  const transactions = (data.transactions ?? []).map((tx) => ({
    ...tx,
    tagIds: tx.tagIds.filter((id) => validTagIds.has(id)),
    merchantId: tx.merchantId && validMerchantIds.has(tx.merchantId) ? tx.merchantId : undefined,
    accountId: tx.accountId && validAccountIds.has(tx.accountId) ? tx.accountId : undefined,
  }));

  const merchantRules = (data.merchantRules ?? []).map((rule) => ({
    ...rule,
    tagIds: rule.tagIds.filter((id) => validTagIds.has(id)),
    merchantId:
      rule.merchantId && validMerchantIds.has(rule.merchantId) ? rule.merchantId : undefined,
  }));

  const dashboardCharts = (data.dashboardCharts ?? []).map((chart) => ({
    ...chart,
    tagId: chart.tagId && validTagIds.has(chart.tagId) ? chart.tagId : undefined,
    merchantId:
      chart.merchantId && validMerchantIds.has(chart.merchantId) ? chart.merchantId : undefined,
    excludedTagIds: chart.excludedTagIds?.filter((id) => validTagIds.has(id)),
    excludedMerchantIds: chart.excludedMerchantIds?.filter((id) => validMerchantIds.has(id)),
  }));

  return {
    ...data,
    version: 2,
    transactions,
    merchantRules,
    dashboardCharts,
  };
}
