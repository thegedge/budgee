import Papa from "papaparse";

export interface ColumnMapping {
  date?: string;
  amount?: string;
  credit?: string;
  description?: string;
  account?: string;
}

export interface CsvParseResult {
  data: any[];
  meta: Papa.ParseMeta;
  errors: Papa.ParseError[];
  suggestedMapping: ColumnMapping;
}

const guessMapping = (headers: string[]): ColumnMapping => {
  const lowerHeaders = headers.map((h) => h.toLocaleLowerCase());

  const findMatch = (keywords: string[]) => {
    const index = lowerHeaders.findIndex((h) => keywords.some((k) => h.includes(k)));
    return index !== -1 ? headers[index] : undefined;
  };

  return {
    date: findMatch(["date", "time"]),
    amount: findMatch(["amount", "value", "cost", "price", "debit"]),
    credit: findMatch(["credit", "payment"]),
    description: findMatch(["description", "merchant", "payee", "name", "memo"]),
    account: findMatch(["account", "source", "card"]),
  };
};

export const parseCsv = (file: File | string): Promise<CsvParseResult> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data, meta, errors }) => {
        const suggestedMapping = guessMapping(meta.fields || []);
        resolve({ data, meta, errors, suggestedMapping });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
