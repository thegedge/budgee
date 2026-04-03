export type ResolvedMerchant = { id: string; name: string };

/**
 * Resolves a merchant from the given map, accounting for shared-record ID prefixing.
 *
 * When a transaction is shared from another user (i.e. `_owner` is set), the
 * associated merchant is stored under `${owner}~${merchantId}` rather than the
 * bare `merchantId`. This function tries the prefixed key first, then falls back
 * to the bare key so that own-merchants on shared transactions are also handled.
 *
 * @param merchantMap - Map of merchant ID → merchant name (as stored in RxDB).
 * @param merchantId  - The `merchantId` field value from the transaction record.
 * @param owner       - The `_owner` field from the transaction record, if present.
 * @returns The resolved `{ id, name }` pair, or `undefined` if not found.
 */
export function resolveMerchant(
  merchantMap: Map<string, string>,
  merchantId: string | undefined,
  owner?: string,
): ResolvedMerchant | undefined {
  if (!merchantId) return undefined;

  if (owner) {
    const prefixedId = `${owner}~${merchantId}`;
    const prefixedName = merchantMap.get(prefixedId);
    if (prefixedName !== undefined) return { id: prefixedId, name: prefixedName };
  }

  const name = merchantMap.get(merchantId);
  if (name !== undefined) return { id: merchantId, name };

  return undefined;
}
