export interface Transaction {
  _id?: string;
  _rev?: string;
  date: string; // ISO 8601 date string (YYYY-MM-DD)
  amount: number;
  originalDescription: string;
  memo?: string;
  merchantId?: string;
  accountId?: string;
  tagIds: string[];
}

export interface Tag {
  _id?: string;
  _rev?: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface Merchant {
  _id?: string;
  _rev?: string;
  name: string;
}

export const ACCOUNT_TYPES = ["chequing", "savings", "credit_card", "investment"] as const;
export type AccountType = (typeof ACCOUNT_TYPES)[number];

const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  chequing: "Chequing",
  savings: "Savings",
  credit_card: "Credit Card",
  investment: "Investment",
};

export function accountTypeLabel(type: AccountType): string {
  return ACCOUNT_TYPE_LABELS[type];
}

export interface Account {
  _id?: string;
  _rev?: string;
  name: string;
  type?: AccountType;
}

export type RuleOperator = "contains" | "startsWith" | "equals" | "regex";

export interface RuleCondition {
  field: "description";
  operator: RuleOperator;
  value: string;
}

export interface MerchantRule {
  _id?: string;
  _rev?: string;
  logic: "and" | "or";
  conditions: RuleCondition[];
  merchantId?: string;
  tagIds: string[];
}

export interface DashboardChart {
  _id?: string;
  _rev?: string;
  title: string;
  chartType: "bar" | "line" | "pie" | "doughnut";
  granularity: "day" | "month" | "year" | "byTag" | "byMerchant";
  startDate?: string;
  endDate?: string;
  tagId?: string;
  merchantId?: string;
  position: number;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  rowSpan?: 1 | 2 | 3 | 4;
  excludedTagIds?: string[];
  excludedMerchantIds?: string[];
  direction?: "debit" | "credit";
  descriptionFilter?: string;
  descriptionFilterMode?: "include" | "exclude";
}

export type DashboardTableModel = "transactions" | "merchants" | "tags";

export type TransactionColumn = "date" | "amount" | "description" | "merchant" | "tags" | "account";
export type MerchantColumn = "name" | "transactionCount" | "totalAmount";
export type TagColumn = "name" | "transactionCount" | "totalAmount";

export type DashboardTableColumn = TransactionColumn | MerchantColumn | TagColumn;

export interface DashboardTable {
  _id?: string;
  _rev?: string;
  title: string;
  model: DashboardTableModel;
  columns: DashboardTableColumn[];
  position: number;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6;
  rowSpan?: 1 | 2 | 3 | 4;
}
