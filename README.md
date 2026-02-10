# Budgee

A single-page app for transaction management and budgeting.

## Disclaimer

This application was built with support from LLMs, but meticulously reviewed at each and every step
of the way. I'm not a huge LLM person, but I think these greenfield projects that are largely meant
for personal use are, at the very least, great use cases for an LLM.

## Features

- Built with Vite + Lit to focus on modern web standards.
- Uses IndexedDB (via [dexie](https://www.npmjs.com/package/dexie)) to cache state
- Can import from and export to a local CSV file (using the []
- Tag management, so you can categorize your transactions
- Merchant management, with the ability to map a default set of tags to a merchant on import, or
  mapping some import field to the merchant. For example, credit card transactions may often have a
  truncated descriptor of a merchant, so you may want to match on this descriptor.
- Transaction management, so you can view individual transactions, manually manage tags, easily set
  up rules for the descriptor of this transaction to map to merchants, tags, etc; or adding
  additional notes for historical value.
- Simple aggregations to understand your transactions by tags, over time

## Concepts

### Source

A source is where transactions are happening. This could be your debit account, a credit card, or
even an investment account.

### Transaction

A transaction is either a debit from or credit to a source. They include:

- Source
- Date
- Merchant
- Amount; positive is a credit, negative is a debit
- Tags

### Tags

A tag is a way of categorizing transactions. This is most useful for aggregating your transactions
to understand where your money is going.

Tags are composed of:

- Name
- Description (optional)
