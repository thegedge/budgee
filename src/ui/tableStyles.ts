import { css } from "lit";

export const tableStyles = css`
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid var(--budgee-border, lch(89.2% 0 none));
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: var(--budgee-primary, lch(72.1% 25.1 246.4));
    color: white;
  }
  th.sortable {
    cursor: pointer;
    user-select: none;
  }
  th.sortable:hover {
    background-color: var(--budgee-primary-hover, lch(61.4% 26.9 245.6));
  }
  tbody tr:nth-child(even) {
    background-color: var(--budgee-row-alt, lch(94.8% 0 none));
  }
  tbody tr:hover {
    background-color: var(--budgee-row-hover, lch(92% 0 none));
  }
  .clickable-row {
    cursor: pointer;
  }
  .col-amount {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .amount-negative {
    color: var(--budgee-negative, lch(66% 26.2 22));
  }
  .amount-positive {
    color: var(--budgee-positive, lch(75% 34.3 158));
  }
`;
