import { afterEach, describe, expect, it } from "vitest";
import { ConfirmDialog } from "./ConfirmDialog";
import { waitFor } from "../testing";

function cleanup() {
  document.body.querySelectorAll("budgee-confirm-dialog").forEach((el) => el.remove());
  document.body.querySelectorAll("budgee-modal").forEach((el) => el.remove());
}

describe("ConfirmDialog", () => {
  afterEach(cleanup);

  it("should be defined", () => {
    expect(customElements.get("budgee-confirm-dialog")).toBeDefined();
  });

  it("renders heading and message", async () => {
    const el = new ConfirmDialog();
    el.heading = "Delete?";
    el.message = "Are you sure?";
    document.body.appendChild(el);
    await el.updateComplete;

    const modal = el.shadowRoot!.querySelector("budgee-modal")!;
    expect(modal.heading).toBe("Delete?");
    expect(el.shadowRoot!.querySelector(".message")!.textContent).toBe("Are you sure?");
  });

  it("renders custom button labels", async () => {
    const el = new ConfirmDialog();
    el.confirmLabel = "Yes";
    el.cancelLabel = "No";
    document.body.appendChild(el);
    await el.updateComplete;

    const buttons = el.shadowRoot!.querySelectorAll("button");
    expect(buttons[0].textContent!.trim()).toBe("No");
    expect(buttons[1].textContent!.trim()).toBe("Yes");
  });

  it("applies danger class when danger=true", async () => {
    const el = new ConfirmDialog();
    el.danger = true;
    document.body.appendChild(el);
    await el.updateComplete;

    const confirmBtn = el.shadowRoot!.querySelectorAll("button")[1];
    expect(confirmBtn.classList.contains("danger")).toBe(true);
  });

  it("static show() resolves true on confirm click", async () => {
    const promise = ConfirmDialog.show({ message: "test" });

    await waitFor(async () => {
      const dialog = document.querySelector("budgee-confirm-dialog");
      expect(dialog).not.toBeNull();
    });

    const dialog = document.querySelector("budgee-confirm-dialog") as ConfirmDialog;
    await dialog.updateComplete;
    const buttons = dialog.shadowRoot!.querySelectorAll("button");
    // Second button is confirm
    buttons[1].click();

    expect(await promise).toBe(true);
    expect(document.querySelector("budgee-confirm-dialog")).toBeNull();
  });

  it("static show() resolves false on cancel click", async () => {
    const promise = ConfirmDialog.show({ message: "test" });

    await waitFor(async () => {
      const dialog = document.querySelector("budgee-confirm-dialog");
      expect(dialog).not.toBeNull();
    });

    const dialog = document.querySelector("budgee-confirm-dialog") as ConfirmDialog;
    await dialog.updateComplete;
    const buttons = dialog.shadowRoot!.querySelectorAll("button");
    // First button is cancel
    buttons[0].click();

    expect(await promise).toBe(false);
  });

  it("static show() resolves false on modal-close", async () => {
    const promise = ConfirmDialog.show({ message: "test" });

    await waitFor(async () => {
      const dialog = document.querySelector("budgee-confirm-dialog");
      expect(dialog).not.toBeNull();
    });

    const dialog = document.querySelector("budgee-confirm-dialog") as ConfirmDialog;
    await dialog.updateComplete;
    const modal = dialog.shadowRoot!.querySelector("budgee-modal")!;
    modal.dispatchEvent(new CustomEvent("modal-close"));

    expect(await promise).toBe(false);
  });
});
