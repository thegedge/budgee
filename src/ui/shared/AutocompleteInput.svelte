<script lang="ts">
  import "../styles/input.css";

  let { items = [], value = "", placeholder = "", dropdown = false, onValueChanged }: {
    items?: string[];
    value?: string;
    placeholder?: string;
    dropdown?: boolean;
    onValueChanged?: (value: string) => void;
  } = $props();

  let highlightIndex = $state(-1);
  let open = $state(false);

  let filtered = $derived.by(() => {
    const q = value.toLowerCase().trim();
    if (!q) return dropdown ? items : [];
    return items.filter((item) => item.toLowerCase().includes(q));
  });

  function onInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    onValueChanged?.(val);
    highlightIndex = -1;
    open = dropdown ? true : val.trim().length > 0;
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      highlightIndex = Math.min(highlightIndex + 1, filtered.length - 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      highlightIndex = Math.max(highlightIndex - 1, -1);
    } else if (e.key === "Enter" && highlightIndex >= 0 && highlightIndex < filtered.length) {
      e.preventDefault();
      select(filtered[highlightIndex]);
    } else if (e.key === "Escape") {
      open = false;
    }
  }

  function onFocus() {
    if (dropdown || value.trim().length > 0) open = true;
  }

  function onBlur() {
    setTimeout(() => { open = false; }, 150);
  }

  function select(item: string) {
    onValueChanged?.(item);
    open = false;
    highlightIndex = -1;
  }

  let exactMatch = $derived(
    !dropdown && value.trim() && filtered.some((item) => item.toLowerCase() === value.trim().toLowerCase()),
  );
  let showSuggestions = $derived(open && filtered.length > 0 && !exactMatch);
</script>

<div class="autocomplete" class:dropdown>
  <div class="input-wrap">
    <input
      type="text"
      {placeholder}
      {value}
      oninput={onInput}
      onkeydown={onKeyDown}
      onfocus={onFocus}
      onblur={onBlur}
    />
    {#if dropdown}
      <span class="chevron">
        <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </span>
    {/if}
  </div>
  {#if showSuggestions}
    <div class="suggestions" role="listbox">
      {#each filtered as item, i}
        <div
          class="suggestion"
          class:highlighted={i === highlightIndex}
          role="option"
          tabindex="-1"
          aria-selected={i === highlightIndex}
          onclick={() => select(item)}
          onkeydown={(e) => { if (e.key === "Enter") select(item); }}
        >
          {item}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .autocomplete {
    display: inline-block;
    position: relative;
  }
  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  input {
    padding: 4px 8px;
    width: 100%;
    box-sizing: border-box;
  }
  .chevron {
    position: absolute;
    right: 6px;
    pointer-events: none;
    color: var(--budgee-text-muted, currentColor);
    display: flex;
    align-items: center;
  }
  .chevron svg {
    width: 12px;
    height: 12px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .dropdown input { padding-right: 22px; }
  .suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--budgee-surface);
    border: 1px solid var(--budgee-border);
    border-radius: 0 0 4px 4px;
    max-height: 150px;
    overflow-y: auto;
    z-index: 10;
    min-width: 180px;
  }
  .suggestion {
    padding: 4px 6px;
    cursor: pointer;
    font-size: 0.85rem;
  }
  .suggestion:hover, .suggestion.highlighted {
    background: var(--budgee-bg);
  }
</style>
