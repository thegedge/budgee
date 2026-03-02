export interface TransactionRecord {
  id: string;
  date: string; // ISO 8601 date string (YYYY-MM-DD)
  amount: number;
  description: string;
  memo?: string;
  merchantId?: string;
  accountId?: string;
  tagIds: string[];
}

export interface TagRecord {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface MerchantRecord {
  id: string;
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

export interface AccountRecord {
  id: string;
  name: string;
  type?: AccountType;
}

export type RuleOperator = "contains" | "startsWith" | "equals" | "regex";

export interface RuleCondition {
  field: "description";
  operator: RuleOperator;
  value: string;
}

export interface MerchantRuleRecord {
  id: string;
  logic: "and" | "or";
  conditions: RuleCondition[];
  merchantId?: string;
  accountId?: string;
  tagIds: string[];
}

export type ChartFilterField = "tag" | "merchant" | "amount" | "description";
export type ChartFilterOperator =
  | "is"
  | "isNot"
  | "contains"
  | "excludes"
  | "lt"
  | "gt"
  | "lte"
  | "gte";

export interface ChartFilterCondition {
  field: ChartFilterField;
  operator: ChartFilterOperator;
  value: string;
}

export interface DashboardChartRecord {
  id: string;
  title: string;
  chartType: "bar" | "line" | "pie" | "doughnut";
  granularity: "day" | "month" | "year" | "byTag" | "byMerchant";
  startDate?: string;
  endDate?: string;
  tagId?: string;
  merchantId?: string;
  position: number;
  colSpan?: number;
  rowSpan?: number;
  excludedTagIds?: string[];
  excludedMerchantIds?: string[];
  direction?: "debit" | "credit";
  descriptionFilter?: string;
  descriptionFilterMode?: "include" | "exclude";
  legendPosition?: "top" | "bottom" | "left" | "right" | "hidden";
  filters?: ChartFilterCondition[];
}

export type DashboardTableModel = "transactions" | "merchants" | "tags";

export type TransactionColumn = "date" | "amount" | "description" | "merchant" | "tags" | "account";
export type MerchantColumn = "name" | "transactionCount" | "totalAmount";
export type TagColumn = "name" | "transactionCount" | "totalAmount";

export type DashboardTableColumn = TransactionColumn | MerchantColumn | TagColumn;

export interface DashboardTableRecord {
  id: string;
  title: string;
  model: DashboardTableModel;
  columns: DashboardTableColumn[];
  position: number;
  colSpan?: number;
  rowSpan?: number;
}
