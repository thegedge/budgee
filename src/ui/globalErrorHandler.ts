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
    // RxDB storage instances fire "is closed" rejections during normal
    // replication teardown (e.g. epoch transitions). Suppress these.
    if (message.includes("is closed")) return;
    showToast({ message, type: "error" });
  });
}
