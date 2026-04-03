<script lang="ts">
  import xIcon from "lucide-static/icons/x.svg?raw";
  import Badge from "./Badge.svelte";

  let { objectUri }: { objectUri: string } = $props();

  let grants = $state<{ id: string; grantee: string; permission: string }[]>([]);

  function serverUrl(): string {
    return localStorage.getItem("budgee-sync-url") ?? "";
  }

  function token(): string {
    return localStorage.getItem("budgee-sync-token") ?? "";
  }

  function truncateDid(did: string): string {
    const parts = did.split(":");
    return parts[parts.length - 1] ?? did;
  }

  async function loadGrants() {
    try {
      const res = await fetch(`${serverUrl()}/capabilities/granted`, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      if (!res.ok) return;
      const all = (await res.json()) as {
        id: string;
        grantee: string;
        permission: string;
        object: string;
      }[];
      grants = all.filter((g) => g.object === objectUri);
    } catch {
      // Silently ignore — the list simply won't render
    }
  }

  async function revoke(id: string) {
    try {
      await fetch(`${serverUrl()}/capabilities/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      });
      await loadGrants();
    } catch {
      // Silently ignore revoke errors
    }
  }

  $effect(() => {
    objectUri;
    loadGrants();
  });
</script>

{#each grants as grant (grant.id)}
  <Badge variant="info">
    <span class="grantee" title={grant.grantee}>{truncateDid(grant.grantee)}</span>
    {#if grant.permission === "write"}<span class="permission">(write)</span>{/if}
    <button class="revoke-btn" onclick={() => revoke(grant.id)} aria-label="Revoke access for {grant.grantee}">
      {@html xIcon}
    </button>
  </Badge>
{/each}

<style>
  .grantee {
    font-size: 0.85em;
  }
  .permission {
    font-size: 0.85em;
    opacity: 0.7;
  }
  .revoke-btn {
    display: inline-flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: inherit;
    opacity: 0.6;
    line-height: 1;
  }
  .revoke-btn:hover {
    opacity: 1;
    color: var(--budgee-danger, lch(72.8% 28.9 22.1));
  }
  .revoke-btn :global(svg) {
    width: 0.75rem;
    height: 0.75rem;
  }
</style>
