<script lang="ts">
  import { ICON_MAP } from "./IconPicker";

  let { value = "", onIconSelected }: {
    value?: string;
    onIconSelected?: (icon: string) => void;
  } = $props();

  let open = $state(false);
  let search = $state("");
  let triggerEl: HTMLElement | undefined = $state();
  let popupEl: HTMLElement | undefined = $state();

  const ICON_ENTRIES = Object.entries(ICON_MAP);

  let filtered = $derived.by(() => {
    if (!search) return ICON_ENTRIES;
    const q = search.toLowerCase();
    return ICON_ENTRIES.filter(([name]) => name.includes(q));
  });

  let svg = $derived(value ? ICON_MAP[value] : null);

  function toggle() {
    open = !open;
    search = "";
  }

  function select(name: string) {
    onIconSelected?.(name);
    open = false;
    search = "";
  }

  function clear() {
    onIconSelected?.("");
    open = false;
    search = "";
  }

  function positionPopup() {
    if (!triggerEl || !popupEl) return;
    const rect = triggerEl.getBoundingClientRect();
    const popupHeight = popupEl.offsetHeight;
    const spaceBelow = window.innerHeight - rect.bottom;
    if (spaceBelow < popupHeight + 4 && rect.top > spaceBelow) {
      popupEl.style.top = `${rect.top - popupHeight - 4}px`;
    } else {
      popupEl.style.top = `${rect.bottom + 4}px`;
    }
    popupEl.style.left = `${rect.left}px`;
  }

  $effect(() => {
    if (!open) return;
    // Position after render
    requestAnimationFrame(() => positionPopup());

    function onDocClick(e: Event) {
      const path = e.composedPath();
      if (triggerEl && !path.includes(triggerEl) && popupEl && !path.includes(popupEl)) {
        open = false;
        search = "";
      }
    }
    function onScroll() {
      if (open) positionPopup();
    }
    document.addEventListener("click", onDocClick, true);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("click", onDocClick, true);
      window.removeEventListener("scroll", onScroll, true);
    };
  });
</script>

<div class="icon-picker">
  <button
    bind:this={triggerEl}
    class="trigger"
    class:placeholder={!svg}
    onclick={toggle}
    title="Pick icon"
  >
    {#if svg}
      {@html svg}
    {:else}
      ?
    {/if}
  </button>
  {#if open}
    <div bind:this={popupEl} class="popup">
      <input
        class="search"
        type="text"
        placeholder="Search icons..."
        value={search}
        oninput={(e) => { search = (e.target as HTMLInputElement).value; }}
      />
      <div class="grid">
        {#each filtered as [name, raw]}
          <button
            class="icon-option"
            class:selected={value === name}
            title={name}
            onclick={() => select(name)}
          >
            {@html raw}
          </button>
        {/each}
      </div>
      {#if value}
        <button class="clear-btn" onclick={clear}>Clear icon</button>
      {/if}
    </div>
  {/if}
</div>

<style>
  .icon-picker { display: inline-block; position: relative; }
  .trigger {
    background: none;
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    padding: 4px;
    cursor: pointer;
    color: inherit;
    width: 2.2rem;
    height: 2.2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .trigger:hover { background-color: var(--budgee-bg); }
  .trigger :global(svg) { width: 1.2rem; height: 1.2rem; }
  .trigger.placeholder { color: var(--budgee-text-muted); }
  .popup {
    position: fixed;
    z-index: 1200;
    background: var(--budgee-surface);
    border: 1px solid var(--budgee-border);
    border-radius: 8px;
    box-shadow: 0 4px 16px lch(0% 0 none / 0.15);
    padding: 0.5rem;
    width: 280px;
  }
  .search {
    width: 100%;
    box-sizing: border-box;
    padding: 4px 8px;
    margin-bottom: 0.5rem;
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    font-size: 0.85rem;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 2px;
    max-height: 200px;
    overflow-y: auto;
  }
  .icon-option {
    background: none;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
  }
  .icon-option:hover { background-color: var(--budgee-bg); border-color: var(--budgee-border); }
  .icon-option.selected { background-color: var(--budgee-primary); color: white; }
  .icon-option :global(svg) { width: 1.2rem; height: 1.2rem; }
  .clear-btn {
    width: 100%;
    margin-top: 0.5rem;
    padding: 4px;
    background: none;
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    color: var(--budgee-text-muted);
  }
  .clear-btn:hover { background-color: var(--budgee-bg); }
</style>
