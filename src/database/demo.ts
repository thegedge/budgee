import type { Databases } from "./Db";
import type {
  AccountRecord,
  DashboardChartRecord,
  DashboardTableRecord,
  MerchantRecord,
  MerchantRuleRecord,
  TagRecord,
  TransactionRecord,
} from "./types";

/** Simple seeded PRNG (mulberry32) for deterministic demo data. */
function createRng(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TAGS: TagRecord[] = [
  { id: "tag-groceries", name: "groceries", icon: "shopping-cart", color: "#4caf50" },
  { id: "tag-dining", name: "dining out", icon: "utensils", color: "#ff9800" },
  { id: "tag-coffee", name: "coffee", icon: "coffee", color: "#795548" },
  { id: "tag-transport", name: "transport", icon: "car", color: "#2196f3" },
  { id: "tag-entertainment", name: "entertainment", icon: "tv", color: "#9c27b0" },
  { id: "tag-utilities", name: "utilities", icon: "lightbulb", color: "#607d8b" },
  { id: "tag-healthcare", name: "healthcare", icon: "heart", color: "#f44336" },
  { id: "tag-shopping", name: "shopping", icon: "shopping-bag", color: "#e91e63" },
  { id: "tag-travel", name: "travel", icon: "plane", color: "#00bcd4" },
  { id: "tag-income", name: "income", icon: "wallet", color: "#8bc34a" },
];

const MERCHANTS: MerchantRecord[] = [
  { id: "m-freshmart", name: "FreshMart" },
  { id: "m-wholefoods", name: "Whole Foods" },
  { id: "m-traderjoes", name: "Trader Joe's" },
  { id: "m-sakura", name: "Sakura Japanese" },
  { id: "m-pizzaplace", name: "Tony's Pizza" },
  { id: "m-burgerbar", name: "The Burger Bar" },
  { id: "m-beanbrew", name: "Bean & Brew" },
  { id: "m-dailygrind", name: "The Daily Grind" },
  { id: "m-metrogas", name: "Metro Gas" },
  { id: "m-rideshare", name: "QuickRide" },
  { id: "m-streamflix", name: "StreamFlix" },
  { id: "m-gamepass", name: "GamePass" },
  { id: "m-powerco", name: "PowerCo Electric" },
  { id: "m-aquautil", name: "AquaUtil Water" },
  { id: "m-cityclinic", name: "City Clinic" },
  { id: "m-pharmacy", name: "HealthPlus Pharmacy" },
  { id: "m-urbanstyle", name: "Urban Style" },
  { id: "m-techstore", name: "TechZone" },
  { id: "m-skyair", name: "SkyAir" },
  { id: "m-employer", name: "Acme Corp" },
];

const ACCOUNTS: AccountRecord[] = [
  { id: "acc-chequing", name: "Main Chequing", type: "chequing" },
  { id: "acc-savings", name: "Savings", type: "savings" },
  { id: "acc-credit", name: "Visa Platinum", type: "credit_card" },
];

const RULES: MerchantRuleRecord[] = [
  {
    id: "rule-freshmart",
    logic: "and",
    conditions: [{ field: "description", operator: "contains", value: "FRESHMART" }],
    merchantId: "m-freshmart",
    tagIds: ["tag-groceries"],
  },
  {
    id: "rule-beanbrew",
    logic: "and",
    conditions: [{ field: "description", operator: "contains", value: "BEAN & BREW" }],
    merchantId: "m-beanbrew",
    tagIds: ["tag-coffee"],
  },
  {
    id: "rule-streamflix",
    logic: "and",
    conditions: [{ field: "description", operator: "contains", value: "STREAMFLIX" }],
    merchantId: "m-streamflix",
    tagIds: ["tag-entertainment"],
  },
  {
    id: "rule-powerco",
    logic: "and",
    conditions: [{ field: "description", operator: "contains", value: "POWERCO" }],
    merchantId: "m-powerco",
    tagIds: ["tag-utilities"],
  },
  {
    id: "rule-acme",
    logic: "and",
    conditions: [{ field: "description", operator: "contains", value: "ACME CORP" }],
    merchantId: "m-employer",
    tagIds: ["tag-income"],
  },
];

const CHARTS: DashboardChartRecord[] = [
  {
    id: "chart-monthly",
    title: "Monthly Spending",
    chartType: "bar",
    granularity: "month",
    direction: "debit",
    position: 0,
    colSpan: 8,
    rowSpan: 4,
  },
  {
    id: "chart-by-tag",
    title: "Spending by Category",
    chartType: "doughnut",
    granularity: "byTag",
    direction: "debit",
    position: 1,
    colSpan: 4,
    rowSpan: 4,
  },
  {
    id: "chart-yearly",
    title: "Yearly Trend",
    chartType: "line",
    granularity: "year",
    direction: "debit",
    position: 2,
    colSpan: 6,
    rowSpan: 4,
  },
  {
    id: "chart-income-expense",
    title: "Income vs Expenses",
    chartType: "bar",
    granularity: "month",
    position: 3,
    colSpan: 6,
    rowSpan: 4,
  },
];

const TABLES: DashboardTableRecord[] = [
  {
    id: "table-recent",
    title: "Recent Transactions",
    model: "transactions",
    columns: ["date", "amount", "description", "merchant", "tags"],
    position: 4,
    colSpan: 8,
    rowSpan: 4,
  },
  {
    id: "table-merchants",
    title: "Top Merchants",
    model: "merchants",
    columns: ["name", "transactionCount", "totalAmount"],
    position: 5,
    colSpan: 4,
    rowSpan: 4,
  },
];

interface SpendingPattern {
  merchantId: string;
  tagIds: string[];
  accountId: string;
  amountMin: number;
  amountMax: number;
  frequency: "weekly" | "biweekly" | "monthly" | "sporadic";
  perWeek?: number; // for weekly
  perYear?: number; // for sporadic
  description: string;
  isCredit?: boolean;
}

const PATTERNS: SpendingPattern[] = [
  // Groceries — ~2x/week
  {
    merchantId: "m-freshmart",
    tagIds: ["tag-groceries"],
    accountId: "acc-credit",
    amountMin: 30,
    amountMax: 120,
    frequency: "weekly",
    perWeek: 1,
    description: "FRESHMART #1042",
  },
  {
    merchantId: "m-wholefoods",
    tagIds: ["tag-groceries"],
    accountId: "acc-credit",
    amountMin: 40,
    amountMax: 150,
    frequency: "weekly",
    perWeek: 0.7,
    description: "WHOLE FOODS MKT",
  },
  {
    merchantId: "m-traderjoes",
    tagIds: ["tag-groceries"],
    accountId: "acc-credit",
    amountMin: 25,
    amountMax: 80,
    frequency: "weekly",
    perWeek: 0.5,
    description: "TRADER JOE'S #219",
  },
  // Coffee — ~3x/week
  {
    merchantId: "m-beanbrew",
    tagIds: ["tag-coffee"],
    accountId: "acc-credit",
    amountMin: 4,
    amountMax: 8,
    frequency: "weekly",
    perWeek: 2,
    description: "BEAN & BREW CAFE",
  },
  {
    merchantId: "m-dailygrind",
    tagIds: ["tag-coffee"],
    accountId: "acc-credit",
    amountMin: 4,
    amountMax: 7,
    frequency: "weekly",
    perWeek: 1,
    description: "THE DAILY GRIND",
  },
  // Dining — ~1x/week
  {
    merchantId: "m-sakura",
    tagIds: ["tag-dining"],
    accountId: "acc-credit",
    amountMin: 25,
    amountMax: 60,
    frequency: "weekly",
    perWeek: 0.4,
    description: "SAKURA JAPANESE REST",
  },
  {
    merchantId: "m-pizzaplace",
    tagIds: ["tag-dining"],
    accountId: "acc-credit",
    amountMin: 15,
    amountMax: 40,
    frequency: "weekly",
    perWeek: 0.3,
    description: "TONY'S PIZZA",
  },
  {
    merchantId: "m-burgerbar",
    tagIds: ["tag-dining"],
    accountId: "acc-credit",
    amountMin: 12,
    amountMax: 30,
    frequency: "weekly",
    perWeek: 0.3,
    description: "THE BURGER BAR",
  },
  // Transport — ~2x/week
  {
    merchantId: "m-metrogas",
    tagIds: ["tag-transport"],
    accountId: "acc-chequing",
    amountMin: 35,
    amountMax: 70,
    frequency: "biweekly",
    description: "METRO GAS STATION",
  },
  {
    merchantId: "m-rideshare",
    tagIds: ["tag-transport"],
    accountId: "acc-credit",
    amountMin: 8,
    amountMax: 25,
    frequency: "weekly",
    perWeek: 1,
    description: "QUICKRIDE *TRIP",
  },
  // Entertainment — subscriptions + sporadic
  {
    merchantId: "m-streamflix",
    tagIds: ["tag-entertainment"],
    accountId: "acc-credit",
    amountMin: 15.99,
    amountMax: 15.99,
    frequency: "monthly",
    description: "STREAMFLIX MONTHLY",
  },
  {
    merchantId: "m-gamepass",
    tagIds: ["tag-entertainment"],
    accountId: "acc-credit",
    amountMin: 9.99,
    amountMax: 9.99,
    frequency: "monthly",
    description: "GAMEPASS SUBSCRIPTION",
  },
  // Utilities — monthly
  {
    merchantId: "m-powerco",
    tagIds: ["tag-utilities"],
    accountId: "acc-chequing",
    amountMin: 60,
    amountMax: 150,
    frequency: "monthly",
    description: "POWERCO ELECTRIC",
  },
  {
    merchantId: "m-aquautil",
    tagIds: ["tag-utilities"],
    accountId: "acc-chequing",
    amountMin: 30,
    amountMax: 60,
    frequency: "monthly",
    description: "AQUAUTIL WATER SVC",
  },
  // Healthcare — sporadic
  {
    merchantId: "m-cityclinic",
    tagIds: ["tag-healthcare"],
    accountId: "acc-credit",
    amountMin: 50,
    amountMax: 200,
    frequency: "sporadic",
    perYear: 4,
    description: "CITY CLINIC COPAY",
  },
  {
    merchantId: "m-pharmacy",
    tagIds: ["tag-healthcare"],
    accountId: "acc-credit",
    amountMin: 10,
    amountMax: 80,
    frequency: "sporadic",
    perYear: 8,
    description: "HEALTHPLUS PHARMACY",
  },
  // Shopping — sporadic
  {
    merchantId: "m-urbanstyle",
    tagIds: ["tag-shopping"],
    accountId: "acc-credit",
    amountMin: 30,
    amountMax: 200,
    frequency: "sporadic",
    perYear: 10,
    description: "URBAN STYLE CLOTHING",
  },
  {
    merchantId: "m-techstore",
    tagIds: ["tag-shopping"],
    accountId: "acc-credit",
    amountMin: 20,
    amountMax: 500,
    frequency: "sporadic",
    perYear: 6,
    description: "TECHZONE ELECTRONICS",
  },
  // Travel — sporadic
  {
    merchantId: "m-skyair",
    tagIds: ["tag-travel"],
    accountId: "acc-credit",
    amountMin: 200,
    amountMax: 800,
    frequency: "sporadic",
    perYear: 3,
    description: "SKYAIR AIRLINES",
  },
  // Income — monthly salary
  {
    merchantId: "m-employer",
    tagIds: ["tag-income"],
    accountId: "acc-chequing",
    amountMin: 4200,
    amountMax: 4200,
    frequency: "monthly",
    description: "ACME CORP PAYROLL",
    isCredit: true,
  },
];

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function generateTransactions(rng: () => number): TransactionRecord[] {
  const transactions: TransactionRecord[] = [];
  const today = new Date();
  const startDate = new Date(today.getFullYear() - 3, today.getMonth(), 1);
  let txId = 0;

  for (const pattern of PATTERNS) {
    const current = new Date(startDate);

    if (pattern.frequency === "weekly") {
      const perWeek = pattern.perWeek ?? 1;
      while (current <= today) {
        if (rng() < perWeek / 7) {
          const amount = round2(
            pattern.amountMin + rng() * (pattern.amountMax - pattern.amountMin),
          );
          transactions.push({
            id: `demo-tx-${txId++}`,
            date: formatDate(current),
            amount: pattern.isCredit ? amount : -amount,
            description: pattern.description,
            merchantId: pattern.merchantId,
            accountId: pattern.accountId,
            tagIds: [...pattern.tagIds],
          });
        }
        current.setDate(current.getDate() + 1);
      }
    } else if (pattern.frequency === "biweekly") {
      while (current <= today) {
        const dayOfMonth = current.getDate();
        if (dayOfMonth === 1 || dayOfMonth === 15) {
          const amount = round2(
            pattern.amountMin + rng() * (pattern.amountMax - pattern.amountMin),
          );
          transactions.push({
            id: `demo-tx-${txId++}`,
            date: formatDate(current),
            amount: pattern.isCredit ? amount : -amount,
            description: pattern.description,
            merchantId: pattern.merchantId,
            accountId: pattern.accountId,
            tagIds: [...pattern.tagIds],
          });
        }
        current.setDate(current.getDate() + 1);
      }
    } else if (pattern.frequency === "monthly") {
      while (current <= today) {
        // Pick a consistent day each month (based on rng for this pattern)
        const day = Math.floor(rng() * 25) + 1;
        const txDate = new Date(current.getFullYear(), current.getMonth(), day);
        if (txDate <= today) {
          const amount = round2(
            pattern.amountMin + rng() * (pattern.amountMax - pattern.amountMin),
          );
          transactions.push({
            id: `demo-tx-${txId++}`,
            date: formatDate(txDate),
            amount: pattern.isCredit ? amount : -amount,
            description: pattern.description,
            merchantId: pattern.merchantId,
            accountId: pattern.accountId,
            tagIds: [...pattern.tagIds],
          });
        }
        current.setMonth(current.getMonth() + 1);
      }
    } else if (pattern.frequency === "sporadic") {
      const perYear = pattern.perYear ?? 4;
      const chancePerDay = perYear / 365;
      while (current <= today) {
        if (rng() < chancePerDay) {
          const amount = round2(
            pattern.amountMin + rng() * (pattern.amountMax - pattern.amountMin),
          );
          transactions.push({
            id: `demo-tx-${txId++}`,
            date: formatDate(current),
            amount: pattern.isCredit ? amount : -amount,
            description: pattern.description,
            merchantId: pattern.merchantId,
            accountId: pattern.accountId,
            tagIds: [...pattern.tagIds],
          });
        }
        current.setDate(current.getDate() + 1);
      }
    }
  }

  return transactions;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export async function seedDemoData(dbs: Databases): Promise<void> {
  const rng = createRng(42);
  const transactions = generateTransactions(rng);

  await Promise.all([
    dbs.tags.bulkDocs(TAGS),
    dbs.merchants.bulkDocs(MERCHANTS),
    dbs.accounts.bulkDocs(ACCOUNTS),
    dbs.merchantRules.bulkDocs(RULES),
    dbs.dashboardCharts.bulkDocs(CHARTS),
    dbs.dashboardTables.bulkDocs(TABLES),
    dbs.transactions.bulkDocs(transactions),
  ]);
}
