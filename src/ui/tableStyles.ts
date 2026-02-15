import { css } from "lit";

export const tableStyles = css`
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid var(--budgee-border, #e0e0e0);
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: var(--budgee-primary, #7eb8da);
    color: white;
  }
  th.sortable {
    cursor: pointer;
    user-select: none;
  }
  th.sortable:hover {
    background-color: var(--budgee-primary-hover, #5a9cbf);
  }
  tbody tr:nth-child(even) {
    background-color: var(--budgee-bg, #fafafa);
  }
  .clickable-row {
    cursor: pointer;
  }
  .clickable-row:hover {
    background-color: var(--budgee-bg, #fafafa);
  }
  .amount-negative {
    color: var(--budgee-negative, #d09090);
  }
  .amount-positive {
    color: var(--budgee-positive, #7ec8a0);
  }
`;
