import type { AccountRecord, TransactionRecord } from "../database/types";
import { Account } from "../models/Account";
import { MerchantRule } from "../models/MerchantRule";
import { Transaction } from "../models/Transaction";
import { applyRules } from "./applyRules";
import type { ColumnMapping } from "./parseCsv";

export type ImportMode = "replace" | "append";

export async function importTransactions(
  rows: Record<string, string>[],
  mapping: ColumnMapping,
  options: { accountId?: string; importMode: ImportMode },
): Promise<number> {
  const rules = await MerchantRule.all();
  const allAccounts = await Account.all();
  const accountMap: Record<string, AccountRecord> = {};
  for (const a of allAccounts) {
    accountMap[a.id] = a;
  }

  const accountIdsByName = mapping.account
    ? await resolveAccountIds(rows, mapping.account)
    : undefined;

  const transactions: Omit<TransactionRecord, "id">[] = rows
    .map((row) =>
      rowToTransaction(
        row,
        mapping,
        accountIdsByName?.get(row[mapping.account!]) ?? options.accountId,
      ),
    )
    .filter((t): t is Omit<TransactionRecord, "id"> => t !== undefined)
    .map((t) => applyRules(t, rules, accountMap));

  if (options.importMode === "replace") {
    await Transaction.deleteAll();
  }

  await Transaction.bulkAdd(transactions);
  return transactions.length;
}

async function resolveAccountIds(
  rows: Record<string, string>[],
  accountColumn: string,
): Promise<Map<string, string>> {
  const uniqueNames = [...new Set(rows.map((r) => r[accountColumn]).filter(Boolean))];
  const existingAccounts = await Account.all();

  const nameToId = new Map<string, string>();
  for (const account of existingAccounts) {
    nameToId.set(account.name.toLowerCase(), account.id);
  }

  const result = new Map<string, string>();
  for (const name of uniqueNames) {
    const existing = nameToId.get(name.toLowerCase());
    if (existing) {
      result.set(name, existing);
    } else {
      const account = await Account.create({ name });
      result.set(name, account.id);
      nameToId.set(name.toLowerCase(), account.id);
    }
  }

  return result;
}

function rowToTransaction(
  row: Record<string, string>,
  mapping: ColumnMapping,
  accountId?: string,
): Omit<TransactionRecord, "id"> | undefined {
  const dateStr = mapping.date ? row[mapping.date] : undefined;
  const amountStr = mapping.amount ? row[mapping.amount] : undefined;
  const creditStr = mapping.credit ? row[mapping.credit] : undefined;
  const description = mapping.description ? row[mapping.description] : undefined;

  if (!dateStr || !description) {
    return undefined;
  }

  const amount = amountStr ? Number.parseFloat(amountStr) : NaN;
  const credit = creditStr ? Number.parseFloat(creditStr) : NaN;

  if (Number.isNaN(amount) && Number.isNaN(credit)) {
    return undefined;
  }

  const total = (Number.isNaN(amount) ? 0 : -amount) + (Number.isNaN(credit) ? 0 : credit);

  return {
    date: dateStr,
    amount: total,
    description: description,
    tagIds: [],
    accountId,
  };
}
