# Budgee

A single-page app for transaction management and budgeting.

## Disclaimer

This application was coded primarily by LLMs. I generally like to build everything myself, but this
was one of those little things that I never found the time to work on and thought it would be a
great option for a mostly "vibe-coded" app.

If you're curious: I didn't particularly _enjoy_ the experience, but am happy with the end result.

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
