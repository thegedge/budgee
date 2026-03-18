import { mount, unmount } from "svelte";
import LoadingOverlay from "./LoadingOverlay.svelte";

let activeOverlay: Record<string, unknown> | null = null;
let activeContainer: HTMLElement | null = null;

export function showLoadingOverlay(message: string) {
  if (activeOverlay) {
    // Can't update props on mounted component easily in Svelte 5 without stores,
    // so just remove and re-create
    unmount(activeOverlay);
    activeContainer?.remove();
  }
  activeContainer = document.createElement("div");
  document.body.appendChild(activeContainer);
  activeOverlay = mount(LoadingOverlay, { target: activeContainer, props: { message } });
}

export function hideLoadingOverlay() {
  if (activeOverlay) {
    unmount(activeOverlay);
    activeContainer?.remove();
    activeOverlay = null;
    activeContainer = null;
  }
}
