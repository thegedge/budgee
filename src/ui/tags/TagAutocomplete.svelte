<script lang="ts">
  import type { Tag } from "../../models/Tag";
  import { contrastTextColor } from "../../color/contrastTextColor";
  import { ICON_MAP } from "../shared/IconPicker";

  let { tags = [], selectedTagIds = [], excludeIds = [], onTagSelected, onTagRemoved, onTagCreated }: {
    tags?: Tag[];
    selectedTagIds?: string[];
    excludeIds?: string[];
    onTagSelected?: (tag: Tag) => void;
    onTagRemoved?: (tagId: string) => void;
    onTagCreated?: (name: string) => void;
  } = $props();

  let query = $state("");
  let highlightIndex = $state(-1);
  let open = $state(false);
  let inputEl: HTMLInputElement | undefined = $state();
  let dropdownEl: HTMLElement | undefined = $state();

  let filtered = $derived.by(() => {
    const q = query.toLowerCase();
    return tags
      .filter(
        (t) =>
          !selectedTagIds.includes(t.id) &&
          !excludeIds.includes(t.id) &&
          t.name.toLowerCase().includes(q),
      )
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1;
        const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1;
        return aStarts - bStarts || a.name.localeCompare(b.name);
      });
  });

  let showCreate = $derived.by(() => {
    const q = query.trim();
    if (!q) return false;
    return !tags.some((t) => t.name.toLowerCase() === q.toLowerCase());
  });

  function tagLabel(tagId: string): { name: string; svg: string | null } {
    const tag = tags.find((t) => t.id === tagId);
    if (!tag) return { name: `#${tagId.replace(/^tag-/, "")}`, svg: null };
    return { name: tag.name, svg: tag.icon ? ICON_MAP[tag.icon] ?? null : null };
  }

  function removeTag(tagId: string) {
    onTagRemoved?.(tagId);
  }

  function positionDropdown() {
    if (!inputEl || !dropdownEl) return;
    const rect = inputEl.getBoundingClientRect();
    dropdownEl.style.top = `${rect.bottom}px`;
    dropdownEl.style.left = `${rect.left}px`;
    dropdownEl.style.width = `${rect.width}px`;
  }

  $effect(() => {
    if (open) requestAnimationFrame(() => positionDropdown());
  });

  function onInput(e: Event) {
    query = (e.target as HTMLInputElement).value;
    highlightIndex = -1;
    open = query.length > 0;
  }

  function onKeyDown(e: KeyboardEvent) {
    const totalItems = filtered.length + (showCreate ? 1 : 0);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      highlightIndex = Math.min(highlightIndex + 1, totalItems - 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      highlightIndex = Math.max(highlightIndex - 1, -1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < filtered.length) {
        selectTag(filtered[highlightIndex]);
      } else if (showCreate && (highlightIndex === filtered.length || highlightIndex === -1)) {
        createTag();
      } else if (filtered.length === 1 && !showCreate) {
        selectTag(filtered[0]);
      } else if (showCreate) {
        createTag();
      }
    } else if (e.key === "Backspace" && query === "" && selectedTagIds.length > 0) {
      e.preventDefault();
      removeTag(selectedTagIds[selectedTagIds.length - 1]);
    } else if (e.key === "Escape") {
      closeDropdown();
    }
  }

  function onFocus() {
    if (query.length > 0) open = true;
  }

  function onBlur() {
    setTimeout(() => { open = false; }, 150);
  }

  function selectTag(tag: Tag) {
    onTagSelected?.(tag);
    closeDropdown();
  }

  function createTag() {
    const name = query.trim();
    if (!name) return;
    onTagCreated?.(name);
    closeDropdown();
  }

  function closeDropdown() {
    query = "";
    highlightIndex = -1;
    open = false;
    requestAnimationFrame(() => inputEl?.focus());
  }
</script>

<div class="tag-autocomplete">
  <div class="input-wrapper" role="combobox" tabindex="-1" aria-controls="tag-suggestions" aria-expanded={open} onclick={() => inputEl?.focus()} onkeydown={(e) => { if (e.key === ' ') inputEl?.focus(); }}>
    {#each selectedTagIds as tagId}
      {@const tag = tags.find((t) => t.id === tagId)}
      {@const bg = tag?.color ?? "var(--budgee-primary)"}
      {@const fg = tag?.color ? contrastTextColor(tag.color) : "white"}
      {@const info = tagLabel(tagId)}
      <button type="button" class="tag-pill" style="background:{bg};color:{fg}" onclick={(e) => { e.stopPropagation(); removeTag(tagId); }}>
        {#if info.svg}<span class="pill-icon">{@html info.svg}</span>{/if}
        {info.name} &times;
      </button>
    {/each}
    <input
      bind:this={inputEl}
      type="text"
      placeholder={selectedTagIds.length > 0 ? "" : "Add tag..."}
      value={query}
      oninput={onInput}
      onkeydown={onKeyDown}
      onfocus={onFocus}
      onblur={onBlur}
    />
  </div>
  {#if open && (filtered.length > 0 || showCreate)}
    <div bind:this={dropdownEl} id="tag-suggestions" class="suggestions" role="listbox">
      {#each filtered as tag, i}
        <div
          class="suggestion"
          class:highlighted={i === highlightIndex}
          role="option"
          tabindex="-1"
          aria-selected={i === highlightIndex}
          onclick={() => selectTag(tag)}
          onkeydown={(e) => { if (e.key === "Enter") selectTag(tag); }}
        >
          {tag.name}
        </div>
      {/each}
      {#if showCreate}
        <div
          class="suggestion create"
          class:highlighted={filtered.length === highlightIndex}
          role="option"
          tabindex="-1"
          aria-selected={filtered.length === highlightIndex}
          onclick={createTag}
          onkeydown={(e) => { if (e.key === "Enter") createTag(); }}
        >
          Create "{query.trim()}"
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .tag-autocomplete { display: inline-block; position: relative; }
  .input-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2px;
    padding: 2px 4px;
    border: 1px solid var(--budgee-border);
    border-radius: 12px;
    min-width: 120px;
    cursor: text;
    background: var(--budgee-surface);
  }
  .input-wrapper:focus-within {
    outline: 2px solid var(--budgee-primary);
    outline-offset: -1px;
  }
  .tag-pill {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    background: var(--budgee-primary);
    color: white;
    padding: 1px 6px;
    border: none;
    border-radius: 8px;
    font-size: 0.75rem;
    cursor: pointer;
    white-space: nowrap;
  }
  .pill-icon { display: inline-flex; align-items: center; }
  .pill-icon :global(svg) { width: 0.75rem; height: 0.75rem; }
  input {
    border: none;
    outline: none;
    padding: 2px 4px;
    font-size: 0.85rem;
    flex: 1;
    min-width: 60px;
    background: transparent;
  }
  .suggestions {
    position: fixed;
    background: var(--budgee-surface);
    border: 1px solid var(--budgee-border);
    border-radius: 0 0 4px 4px;
    max-height: 150px;
    overflow-y: auto;
    z-index: 1100;
    min-width: 120px;
  }
  .suggestion { padding: 4px 6px; cursor: pointer; font-size: 0.85rem; }
  .suggestion:hover, .suggestion.highlighted { background: var(--budgee-bg); }
  .suggestion.create { font-style: italic; color: var(--budgee-text-muted); }
</style>
