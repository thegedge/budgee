<script lang="ts">
  import type { Snippet } from "svelte";
  import xIcon from "lucide-static/icons/x.svg?raw";

  let { heading = "", onClose, children }: {
    heading?: string;
    onClose?: () => void;
    children: Snippet;
  } = $props();

  let popoverEl: HTMLElement | undefined = $state();

  $effect(() => {
    if (!popoverEl) return;
    popoverEl.showPopover?.();
    const handler = (e: Event) => {
      if ((e as ToggleEvent).newState === "closed") {
        onClose?.();
      }
    };
    popoverEl.addEventListener("toggle", handler);
    trapFocus(popoverEl);
    return () => popoverEl?.removeEventListener("toggle", handler);
  });

  function trapFocus(el: HTMLElement) {
    el.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const focusable = Array.from(el.querySelectorAll<HTMLElement>(selector));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  function handleClose() {
    popoverEl?.hidePopover?.();
  }
</script>

<div bind:this={popoverEl} popover="auto" role="dialog" aria-modal="true" aria-label={heading}>
  <div class="header">
    <h3>{heading}</h3>
    <button class="close" aria-label="Close" onclick={handleClose}>{@html xIcon}</button>
  </div>
  {@render children()}
</div>

<style>
  [popover] {
    background: var(--budgee-surface);
    border-radius: 8px;
    padding: 1.5rem;
    max-width: 800px;
    width: min(90vw, 800px);
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 4px 24px lch(0% 0 none / 0.2);
    border: none;
    margin: auto;
    position: fixed;
    inset: 0;
    height: fit-content;
  }
  [popover]::backdrop {
    background: var(--budgee-overlay);
    backdrop-filter: blur(1px);
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  h3 { margin: 0; }
  .close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--budgee-text-muted);
    padding: 4px;
    line-height: 1;
  }
  .close:hover { color: var(--budgee-text); }
  .close :global(svg) { width: 20px; height: 20px; }
</style>
