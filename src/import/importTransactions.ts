import { db } from "../database/db";
import type { Transaction } from "../database/types";
import { applyRules } from "./applyRules";
import type { ColumnMapping } from "./parseCsv";

export async function importTransactions(
  rows: Record<string, string>[],
  mapping: ColumnMapping,
): Promise<number> {
  const rules = await db.merchantRules.toArray();
  const transactions: Omit<Transaction, "id">[] = rows
    .map((row) => rowToTransaction(row, mapping))
    .filter((t): t is Omit<Transaction, "id"> => t !== undefined)
    .map((t) => applyRules(t, rules));

  await db.transactions.bulkAdd(transactions);
  return transactions.length;
}

function rowToTransaction(
  row: Record<string, string>,
  mapping: ColumnMapping,
): Omit<Transaction, "id"> | undefined {
  const dateStr = mapping.date ? row[mapping.date] : undefined;
  const amountStr = mapping.amount ? row[mapping.amount] : undefined;
  const description = mapping.description ? row[mapping.description] : undefined;

  if (!dateStr || !amountStr || !description) {
    return undefined;
  }

  const amount = Number.parseFloat(amountStr);
  if (Number.isNaN(amount)) {
    return undefined;
  }

  return {
    date: dateStr,
    amount: -amount,
    originalDescription: description,
    tagIds: [],
  };
}
