import { css } from "lit";

export const tableStyles = css`
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid var(--budgee-border);
    padding: 8px;
    text-align: left;
    white-space: nowrap;
    width: 0;
  }
  th {
    background-color: var(--budgee-primary);
    color: white;
    position: sticky;
    top: 0;
    z-index: 1;
  }
  th.sortable {
    cursor: pointer;
    user-select: none;
  }
  th.sortable:hover {
    background-color: var(--budgee-primary-hover);
  }
  tbody tr:nth-child(even) {
    background-color: var(--budgee-row-alt);
  }
  tbody tr:hover {
    background-color: var(--budgee-row-hover);
  }
  .clickable-row {
    cursor: pointer;
  }
  .entity-link {
    color: var(--budgee-primary);
    cursor: pointer;
    text-decoration: underline;
  }
  .col-grow {
    width: auto;
    white-space: normal;
  }
  .col-amount {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .amount-negative {
    color: var(--budgee-negative);
  }
  .amount-positive {
    color: var(--budgee-positive);
  }
`;
