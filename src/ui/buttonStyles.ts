import { css } from "lit";

export const buttonStyles = css`
  button {
    padding: 4px 12px;
    cursor: pointer;
    background-color: var(--budgee-primary);
    color: white;
    border: none;
    border-radius: 4px;
  }
  button:hover:not(:disabled) {
    background-color: var(--budgee-primary-hover);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  button.secondary {
    background-color: var(--budgee-secondary);
  }
  button.secondary:hover:not(:disabled) {
    background-color: var(--budgee-secondary-hover);
  }
  button.danger {
    background-color: var(--budgee-danger);
  }
  button.danger:hover:not(:disabled) {
    background-color: var(--budgee-danger-hover);
  }
`;
