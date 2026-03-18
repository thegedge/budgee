<script lang="ts">
  import type { Tag } from "../../models/Tag";
  import { adaptTagColor } from "../../color/adaptTagColor";
  import { contrastTextColor } from "../../color/contrastTextColor";
  import { ICON_MAP } from "../shared/IconPicker";

  let { tags = [], tagIds = [] }: { tags?: Tag[]; tagIds?: string[] } = $props();

  function tagInfo(tagId: string): { name: string; svg: string | null; bg: string; fg: string } {
    const tag = tags.find((t) => t.id === tagId);
    if (!tag) return { name: `#${tagId}`, svg: null, bg: "var(--budgee-primary)", fg: "white" };
    const adapted = tag.color ? adaptTagColor(tag.color) : null;
    const bg = adapted ?? "var(--budgee-primary)";
    const fg = adapted ? contrastTextColor(adapted) : "white";
    const svg = tag.icon ? ICON_MAP[tag.icon] ?? null : null;
    return { name: tag.name, svg, bg, fg };
  }
</script>

<span class="tag-pills">
  {#each tagIds as tagId}
    {@const info = tagInfo(tagId)}
    <span class="tag-pill" style="background:{info.bg};color:{info.fg}">
      {#if info.svg}<span class="pill-icon">{@html info.svg}</span>{/if}
      {info.name}
    </span>
  {/each}
</span>

<style>
  .tag-pills {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
  .tag-pill {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    background: var(--budgee-primary);
    color: white;
    padding: 1px 6px;
    border-radius: 8px;
    font-size: 0.75rem;
    white-space: nowrap;
  }
  .pill-icon { display: inline-flex; align-items: center; }
  .pill-icon :global(svg) { width: 0.75rem; height: 0.75rem; }
</style>
