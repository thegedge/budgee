import { mount } from "svelte";
import DatabaseErrorOverlay from "./DatabaseErrorOverlay.svelte";

let overlayProps: { error: string; isDatabaseError: boolean } | null = null;
let container: HTMLElement | null = null;

export function showErrorOverlay(message: string, options?: { isDatabaseError?: boolean }) {
  const isDatabaseError = options?.isDatabaseError ?? false;

  if (overlayProps) {
    // Upgrade to database error if a more specific diagnosis arrives later
    if (isDatabaseError && !overlayProps.isDatabaseError) {
      overlayProps.isDatabaseError = true;
      overlayProps.error = message;
    }
    return;
  }

  overlayProps = $state({ error: message, isDatabaseError });
  container = document.createElement("div");
  document.body.appendChild(container);
  mount(DatabaseErrorOverlay, { target: container, props: overlayProps });
}
