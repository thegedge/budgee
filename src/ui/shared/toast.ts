export type ToastType = "success" | "error" | "info";

export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

export function showToast(options: ToastOptions): void {
  document.dispatchEvent(
    new CustomEvent("budgee-toast", { detail: options }),
  );
}
