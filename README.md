# Budgee

A single-page app for transaction management and budgeting.

> [!NOTE]
>
> This application was coded primarily by LLMs. I generally like to build everything myself,
> but this was one of those little things that I never found the time to work on and thought it
> would be a great option for a mostly "vibe-coded" app.
>
> If you're curious: I didn't particularly _enjoy_ the experience, but am happy with the end result.
> I've written about this on [Bluesky](https://bsky.app/profile/gedge.ca/post/3meyghorz7c22), where
> there's joy in writing code. Not only that, there's a massive amount of value and utility in
> writing code too.

## Features

- Built with Vite + Lit to focus on modern web standards.
- Uses PouchDB (IndexedDB in browser) for local storage, with optional CouchDB replication for sync.
- Customizable dashboard with bar, line, pie, and doughnut charts at various granularities (day,
  month, year, by tag, by merchant). Dashboard cards are draggable and resizable.
- CSV import with column mapping, preview, and drag-and-drop file support. Supports append and
  replace modes.
- Full database JSON export/import for backup and restore.
- Account management, with support for chequing, savings, credit card, and investment accounts.
- Tag management, so you can categorize your transactions. Tags support icons and colors.
- Merchant management, with the ability to map a default set of tags to a merchant on import, or
  mapping some import field to the merchant. For example, credit card transactions may often have a
  truncated descriptor of a merchant, so you may want to match on this descriptor.
- Merchant rules engine with multiple conditions (and/or logic) and operators (contains, startsWith,
  equals, regex). Rules auto-apply on import and can be retroactively applied.
- Transaction management, so you can view individual transactions, manually manage tags, easily set
  up rules for the descriptor of this transaction to map to merchants, tags, etc; or adding
  additional notes for historical value.
- Simple aggregations to understand your transactions by tags, over time.

## Concepts

### Account

An account is where transactions are happening. This could be a chequing account, savings account,
credit card, or investment account.

### Transaction

A transaction is either a debit from or credit to an account. They include:

- Account
- Date
- Merchant
- Amount; positive is a credit, negative is a debit
- Tags
- Original description (from import)
- Memo (optional)

### Tags

A tag is a way of categorizing transactions. This is most useful for aggregating your transactions
to understand where your money is going.

Tags are composed of:

- Name
- Icon (optional)
- Color (optional)

### Merchant

A merchant is the counterparty in a transaction. Merchants can be automatically assigned to
transactions via merchant rules.

### Merchant Rules

A merchant rule matches transactions by their description using configurable conditions (contains,
startsWith, equals, regex) combined with and/or logic. Matching transactions can be assigned a
merchant and/or tags automatically.
