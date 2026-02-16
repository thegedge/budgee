export interface Transaction {
  id?: number; // Auto-incremented
  date: string; // ISO 8601 date string (YYYY-MM-DD)
  amount: number;
  originalDescription: string;
  memo?: string;
  merchantId?: number;
  accountId?: number;
  tagIds: number[];
}

export interface Tag {
  id?: number;
  name: string;
  icon?: string;
  color?: string;
}

export interface Merchant {
  id?: number;
  name: string;
}

export interface Account {
  id?: number;
  name: string;
  type?: string;
}

export type RuleOperator = "contains" | "startsWith" | "equals" | "regex";

export interface RuleCondition {
  field: "description";
  operator: RuleOperator;
  value: string;
}

export interface MerchantRule {
  id?: number;
  logic: "and" | "or";
  conditions: RuleCondition[];
  merchantId?: number;
  tagIds: number[];
}

export interface DashboardChart {
  id?: number;
  title: string;
  chartType: "bar" | "line" | "pie" | "doughnut";
  granularity: "day" | "month" | "year" | "byTag" | "byMerchant";
  startDate?: string;
  endDate?: string;
  tagId?: number;
  merchantId?: number;
  position: number;
  colSpan?: 1 | 2 | 3;
}
