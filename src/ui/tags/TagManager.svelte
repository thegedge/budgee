<script lang="ts">
  import trash2Icon from "lucide-static/icons/trash-2.svg?raw";
  import { Tag } from "../../models/Tag";
  import { colorToHex } from "../../color/colorToHex";
  import { showToast } from "../shared/toast";
  import { useBusy } from "../../lib/busy.svelte";
  import { useSubscription } from "../../lib/subscribe.svelte";
  import SkeletonLoader from "../shared/SkeletonLoader.svelte";
  import EmptyState from "../shared/EmptyState.svelte";
  import PaginatedTable from "../shared/PaginatedTable.svelte";
  import IconPicker from "../shared/IconPicker.svelte";
  import "../styles/button.css";
  import "../styles/icon-button.css";
  import "../styles/input.css";

  let tags = $state<Tag[] | null>(null);
  let newTagName = $state("");
  let error = $state("");

  const { busy, withBusy } = useBusy();

  useSubscription([Tag.subscribe], async () => {
    tags = await Tag.all();
  });

  async function addTag() {
    const name = newTagName.trim();
    if (!name) return;
    error = "";
    const existing = await Tag.byName(name);
    if (existing) { error = `Tag "${name}" already exists.`; return; }
    await withBusy(async () => {
      await Tag.create(name);
      newTagName = "";
      showToast({ message: "Tag created", type: "success" });
    });
  }

  async function deleteTag(id: string) {
    await withBusy(async () => {
      await Tag.remove(id);
      showToast({ message: "Tag deleted", type: "success" });
    });
  }

  async function saveTagIcon(tag: Tag, icon: string) {
    await withBusy(async () => {
      await Tag.update(tag.id, { icon: icon || undefined });
    });
  }

  function toHex(color?: string): string {
    return color ? colorToHex(color) : "#7eb8da";
  }

  async function saveTagColor(tag: Tag, color: string) {
    await withBusy(async () => {
      await Tag.update(tag.id, { color });
    });
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") addTag();
  }
</script>

<div class="tag-manager" class:busy>
  {#if tags === null}
    <SkeletonLoader variant="table" rows={5} />
  {:else}
    <div class="tag-form">
      <input
        type="text"
        placeholder="New tag name"
        value={newTagName}
        oninput={(e) => { newTagName = (e.target as HTMLInputElement).value; }}
        onkeydown={onKeyDown}
      />
      <button onclick={addTag}>Add</button>
    </div>
    {#if error}
      <p class="error">{error}</p>
    {/if}
    {#if tags.length === 0}
      <EmptyState heading="No tags yet" description="Create a tag above to get started." />
    {:else}
      <PaginatedTable
        items={tags}
        defaultPageSize={25}
        storageKey="tags"
        columns={[
          { label: "Icon", class: "col-icon" },
          { label: "Color", class: "col-color" },
          { label: "Name", sortKey: "name", class: "col-grow" },
          { class: "col-remove" },
        ]}
        comparators={{ name: (a: Tag, b: Tag) => a.name.localeCompare(b.name) }}
        filterFn={(tag: Tag, filter: string) => tag.name.toLowerCase().includes(filter.toLowerCase())}
        defaultSortCol="name"
        defaultSortDir="asc"
      >
        {#snippet renderRow(tag: Tag)}
          <tr>
            <td class="col-icon">
              <IconPicker value={tag.icon ?? ""} onIconSelected={(icon) => saveTagIcon(tag, icon)} />
            </td>
            <td class="col-color">
              <input
                type="color"
                class="color-swatch"
                value={toHex(tag.color)}
                onchange={(e) => saveTagColor(tag, (e.target as HTMLInputElement).value)}
              />
            </td>
            <td class="col-grow">{tag.name}</td>
            <td class="col-remove">
              <button class="icon-btn icon-btn--danger" title="Remove tag" aria-label="Remove tag" onclick={() => deleteTag(tag.id)}>
                {@html trash2Icon}
              </button>
            </td>
          </tr>
        {/snippet}
      </PaginatedTable>
    {/if}
  {/if}
</div>

<style>
  .tag-manager {
    display: block;
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    background: var(--budgee-surface);
  }
  .tag-manager.busy { pointer-events: none; cursor: wait; opacity: 0.6; }
  .tag-form { display: flex; gap: 0.5rem; margin-bottom: 1rem; align-items: center; }
  .tag-form input { padding: 4px 8px; flex: 1; }
  .error { color: var(--budgee-danger-hover); font-size: 0.85rem; }
  :global(.col-icon), :global(.col-color), :global(.col-remove) { width: 1%; white-space: nowrap; }
  .color-swatch {
    width: 2rem;
    height: 1.5rem;
    border: none;
    padding: 0;
    cursor: pointer;
    border-radius: 4px;
  }
</style>
