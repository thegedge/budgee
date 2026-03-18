<script lang="ts">
  import Modal from "./Modal.svelte";
  import "../styles/button.css";

  let { heading = "Are you sure?", message = "", confirmLabel = "Confirm", cancelLabel = "Cancel", danger = false, onResult }: {
    heading?: string;
    message?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    danger?: boolean;
    onResult: (confirmed: boolean) => void;
  } = $props();
</script>

<Modal {heading} onClose={() => onResult(false)}>
  <div class="message">{message}</div>
  <div class="actions">
    <button class="secondary" onclick={() => onResult(false)}>{cancelLabel}</button>
    <button class={danger ? "danger" : ""} onclick={() => onResult(true)}>{confirmLabel}</button>
  </div>
</Modal>

<style>
  .message { margin-bottom: 1.5rem; line-height: 1.5; }
  .actions { display: flex; justify-content: flex-end; gap: 0.5rem; }
  .actions button { padding: 0.5rem 1rem; }
</style>
