export interface Transaction {
  id?: number; // Auto-incremented
  date: string; // ISO 8601 date string (YYYY-MM-DD)
  amount: number;
  originalDescription: string;
  memo?: string;
  merchantId?: number;
  sourceId?: number;
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

export interface Source {
  id?: number;
  name: string;
}
