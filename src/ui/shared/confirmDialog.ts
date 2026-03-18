import { mount, unmount } from "svelte";
import ConfirmDialog from "./ConfirmDialog.svelte";

export function showConfirmDialog(options: {
  heading?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}): Promise<boolean> {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const instance = mount(ConfirmDialog, {
      target: container,
      props: {
        ...options,
        onResult: (confirmed: boolean) => {
          unmount(instance);
          container.remove();
          resolve(confirmed);
        },
      },
    });
  });
}
