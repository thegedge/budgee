import { MerchantRules } from "../data/merchantRules";
import { Transactions } from "../data/transactions";
import type { Transaction } from "../database/types";
import { applyRules } from "./applyRules";
import type { ColumnMapping } from "./parseCsv";

export type ImportMode = "replace" | "append";

export async function importTransactions(
  rows: Record<string, string>[],
  mapping: ColumnMapping,
  options: { accountId?: number; importMode: ImportMode },
): Promise<number> {
  const rules = await MerchantRules.all();
  const transactions: Omit<Transaction, "id">[] = rows
    .map((row) => rowToTransaction(row, mapping, options.accountId))
    .filter((t): t is Omit<Transaction, "id"> => t !== undefined)
    .map((t) => applyRules(t, rules));

  if (options.importMode === "replace" && options.accountId) {
    await Transactions.deleteForAccount(options.accountId);
  }

  await Transactions.bulkAdd(transactions);
  return transactions.length;
}

function rowToTransaction(
  row: Record<string, string>,
  mapping: ColumnMapping,
  accountId?: number,
): Omit<Transaction, "id"> | undefined {
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
