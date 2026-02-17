import { db } from "../src/database/db";

export async function seed() {
  await db.transaction("rw", db.tags, db.merchants, db.accounts, db.transactions, async () => {
    // Clear existing data
    await db.tags.clear();
    await db.merchants.clear();
    await db.accounts.clear();
    await db.transactions.clear();

    // Create Tags
    const [groceriesId, diningId, coffeeId, utilitiesId] = await db.tags.bulkAdd(
      [{ name: "Groceries" }, { name: "Dining Out" }, { name: "Coffee" }, { name: "Utilities" }],
      { allKeys: true },
    );

    // Create Merchants
    const [wholeFoodsId, starbucksId, pizzaPlaceId, electricCoId] = await db.merchants.bulkAdd(
      [
        { name: "Whole Foods" },
        { name: "Starbucks" },
        { name: "Joe's Pizza" },
        { name: "City Electric" },
      ],
      { allKeys: true },
    );

    // Create Accounts
    const [checkingId, creditCardId] = await db.accounts.bulkAdd(
      [
        { name: "Checking Account", type: "Checking" },
        { name: "Visa Gold", type: "Credit Card" },
      ],
      { allKeys: true },
    );

    // Create Transactions
    await db.transactions.bulkAdd([
      {
        date: "2023-10-25",
        amount: -150.25,
        originalDescription: "WHOLEFDS 12345",
        merchantId: wholeFoodsId,
        accountId: creditCardId,
        tagIds: [groceriesId],
      },
      {
        date: "2023-10-26",
        amount: -5.75,
        originalDescription: "STARBUCKS STORE 88",
        merchantId: starbucksId,
        accountId: creditCardId,
        tagIds: [coffeeId],
      },
      {
        date: "2023-10-27",
        amount: -32.5,
        originalDescription: "JOES PIZZA",
        merchantId: pizzaPlaceId,
        accountId: checkingId,
        tagIds: [diningId],
      },
      {
        date: "2023-10-28",
        amount: -120.0,
        originalDescription: "CITY ELECTRIC BILL",
        merchantId: electricCoId,
        accountId: checkingId,
        tagIds: [utilitiesId],
      },
      {
        date: "2023-10-29",
        amount: 2500.0,
        originalDescription: "PAYROLL DEPOSIT",
        merchantId: undefined, // Income often has no merchant
        accountId: checkingId,
        tagIds: [],
      },
    ]);
  });

  console.log("Database seeded successfully!");
}
