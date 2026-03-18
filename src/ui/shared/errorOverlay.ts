import { mount } from "svelte";
import DatabaseErrorOverlay from "./DatabaseErrorOverlay.svelte";

let shown = false;

export function showErrorOverlay(message: string, options?: { isDatabaseError?: boolean }) {
  if (shown) return;
  shown = true;
  const container = document.createElement("div");
  document.body.appendChild(container);
  mount(DatabaseErrorOverlay, {
    target: container,
    props: { error: message, isDatabaseError: options?.isDatabaseError ?? false },
  });
}
