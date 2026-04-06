import { mount } from "svelte";
import DatabaseErrorOverlay from "./DatabaseErrorOverlay.svelte";

let overlayProps = $state({ error: "", isDatabaseError: false, shown: false });

export function showErrorOverlay(message: string, options?: { isDatabaseError?: boolean }) {
  const isDatabaseError = options?.isDatabaseError ?? false;

  if (overlayProps.shown) {
    // Upgrade to database error if a more specific diagnosis arrives later
    if (isDatabaseError && !overlayProps.isDatabaseError) {
      overlayProps.isDatabaseError = true;
      overlayProps.error = message;
    }
    return;
  }

  overlayProps.shown = true;
  overlayProps.error = message;
  overlayProps.isDatabaseError = isDatabaseError;

  const container = document.createElement("div");
  document.body.appendChild(container);
  mount(DatabaseErrorOverlay, { target: container, props: overlayProps });
}
