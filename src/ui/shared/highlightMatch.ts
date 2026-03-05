import { html, type TemplateResult } from "lit";

export function highlightMatch(text: string, query: string): TemplateResult | string {
  if (!query) return text;

  const lower = text.toLowerCase();
  const queryLower = query.toLowerCase();
  const index = lower.indexOf(queryLower);

  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return html`${before}<mark>${match}</mark>${after}`;
}
