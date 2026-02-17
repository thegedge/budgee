import { Accounts } from "../data/accounts";
import { MerchantRules } from "../data/merchantRules";
import { Transactions } from "../data/transactions";
import type { Transaction } from "../database/types";
import { applyRules } from "./applyRules";
import type { ColumnMapping } from "./parseCsv";

export type ImportMode = "replace" | "append";

export async function importTransactions(
  rows: Record<string, string>[],
  mapping: ColumnMapping,
  options: { accountId?: string; importMode: ImportMode },
): Promise<number> {
  const rules = await MerchantRules.all();
  const accountIdsByName = mapping.account
    ? await resolveAccountIds(rows, mapping.account)
    : undefined;

  const transactions: Omit<Transaction, "_id" | "_rev">[] = rows
    .map((row) =>
      rowToTransaction(
        row,
        mapping,
        accountIdsByName?.get(row[mapping.account!]) ?? options.accountId,
      ),
    )
    .filter((t): t is Omit<Transaction, "_id" | "_rev"> => t !== undefined)
    .map((t) => applyRules(t, rules));

  if (options.importMode === "replace") {
    await Transactions.deleteAll();
  }

  await Transactions.bulkAdd(transactions);
  return transactions.length;
}

async function resolveAccountIds(
  rows: Record<string, string>[],
  accountColumn: string,
): Promise<Map<string, string>> {
  const uniqueNames = [...new Set(rows.map((r) => r[accountColumn]).filter(Boolean))];
  const existingAccounts = await Accounts.all();

  const nameToId = new Map<string, string>();
  for (const account of existingAccounts) {
    nameToId.set(account.name.toLowerCase(), account._id!);
  }

  const result = new Map<string, string>();
  for (const name of uniqueNames) {
    const existing = nameToId.get(name.toLowerCase());
    if (existing) {
      result.set(name, existing);
    } else {
      const id = await Accounts.create({ name });
      result.set(name, id);
      nameToId.set(name.toLowerCase(), id);
    }
  }

  return result;
}

function rowToTransaction(
  row: Record<string, string>,
  mapping: ColumnMapping,
  accountId?: string,
): Omit<Transaction, "_id" | "_rev"> | undefined {
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
    originalDescription: description,
    tagIds: [],
    accountId,
  };
}
