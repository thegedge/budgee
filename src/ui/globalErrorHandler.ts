import { showErrorOverlay } from "./shared/DatabaseErrorOverlay";

export function setupGlobalErrorHandler() {
  window.addEventListener("error", (event) => {
    const message = event.message || "An unknown error occurred.";
    showErrorOverlay(message);
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const message =
      reason instanceof Error
        ? reason.message
        : reason
          ? String(reason)
          : "An unhandled promise rejection occurred.";
    showErrorOverlay(message);
  });
}
