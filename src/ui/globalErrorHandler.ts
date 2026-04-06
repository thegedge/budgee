import { showErrorOverlay } from "./shared/errorOverlay.svelte";
import { showToast } from "./shared/toast";

function isIDBError(error: unknown): boolean {
  if (error instanceof DOMException) {
    return error.name === "InvalidStateError" || error.name === "TransactionInactiveError";
  }
  if (error instanceof Error) {
    return error.message.includes("IDBTransaction") || error.message.includes("objectStore");
  }
  return false;
}

function logIDBErrorDetails(label: string, error: unknown): void {
  console.group(`[idb-debug] ${label}`);
  console.error("error:", error);
  if (error && typeof error === "object") {
    const e = error as Record<string, unknown>;
    if (e.inner) console.error("inner:", e.inner);
    if (e.stack) console.error("stack:", e.stack);
    if (e.name) console.error("name:", e.name);
  }
  console.groupEnd();
}

export function setupGlobalErrorHandler() {
  window.addEventListener("error", (event) => {
    const message = event.message || "An unknown error occurred.";
    if (event.error && isIDBError(event.error)) {
      logIDBErrorDetails("window.error", event.error);
      showErrorOverlay(message, { isDatabaseError: true });
      return;
    }
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
    // RxDB storage instances fire "is closed" rejections during normal
    // replication teardown (e.g. epoch transitions). Suppress these.
    if (message.includes("is closed")) return;
    if (isIDBError(reason)) {
      logIDBErrorDetails("unhandledrejection", reason);
      showErrorOverlay(message, { isDatabaseError: true });
      return;
    }
    showToast({ message, type: "error" });
  });
}
