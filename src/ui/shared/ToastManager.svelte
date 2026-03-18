<script lang="ts">
  import xIcon from "lucide-static/icons/x.svg?raw";
  import type { ToastOptions, ToastType } from "./toast";

  interface ToastEntry {
    id: number;
    message: string;
    type: ToastType;
    dismissing: boolean;
  }

  let toasts = $state<ToastEntry[]>([]);
  const timers = new Map<number, ReturnType<typeof setTimeout>>();
  let nextId = 0;

  function onToast(e: Event) {
    const { message, type = "info", duration = 4000 } = (e as CustomEvent<ToastOptions>).detail;
    const id = nextId++;
    toasts = [...toasts, { id, message, type, dismissing: false }];
    timers.set(id, setTimeout(() => dismiss(id), duration));
  }

  function dismiss(id: number) {
    const timer = timers.get(id);
    if (timer) clearTimeout(timer);
    timers.delete(id);
    toasts = toasts.map((t) => (t.id === id ? { ...t, dismissing: true } : t));
    setTimeout(() => {
      toasts = toasts.filter((t) => t.id !== id);
    }, 200);
  }

  $effect(() => {
    document.addEventListener("budgee-toast", onToast);
    return () => {
      document.removeEventListener("budgee-toast", onToast);
      for (const timer of timers.values()) clearTimeout(timer);
      timers.clear();
    };
  });
</script>

<div class="toast-container" aria-live="polite" aria-atomic="false">
  {#each toasts as t (t.id)}
    <div class="toast {t.type}" class:dismissing={t.dismissing}>
      <span class="message">{t.message}</span>
      <button class="close" aria-label="Dismiss" onclick={() => dismiss(t.id)}>
        {@html xIcon}
      </button>
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 10000;
    display: flex;
    flex-direction: column-reverse;
    gap: 0.5rem;
    pointer-events: none;
  }
  .toast {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    color: white;
    font-size: 0.9rem;
    font-weight: 500;
    box-shadow: 0 4px 12px lch(0% 0 none / 0.15);
    pointer-events: auto;
    animation: slide-in 0.2s ease-out;
    min-width: 250px;
    max-width: 400px;
  }
  .toast.dismissing { animation: slide-out 0.2s ease-in forwards; }
  .toast.success { background: var(--budgee-success); }
  .toast.error { background: var(--budgee-danger); }
  .toast.info { background: var(--budgee-primary); }
  .message { flex: 1; }
  .close {
    display: inline-flex;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 2px;
    opacity: 0.8;
    line-height: 1;
  }
  .close:hover { opacity: 1; }
  .close :global(svg) { width: 16px; height: 16px; }
  @keyframes slide-in {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slide-out {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
</style>
