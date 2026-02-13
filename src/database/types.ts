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

export interface MerchantRule {
  id?: number;
  pattern: string; // substring to match in description (case-insensitive)
  merchantName?: string;
  tagIds: number[];
}
