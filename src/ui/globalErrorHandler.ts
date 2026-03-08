import { showToast } from "./shared/toast";

export function setupGlobalErrorHandler() {
  window.addEventListener("error", (event) => {
    const message = event.message || "An unknown error occurred.";
    showToast({ message, type: "error" });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const message =
      reason instanceof Error
        ? reason.message
        : reason
          ? String(reason)
          : "An unhandled promise rejection occurred.";
    showToast({ message, type: "error" });
  });
}
