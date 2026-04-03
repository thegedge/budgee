<script lang="ts">
  import usersIcon from "lucide-static/icons/users.svg?raw";
  import Badge from "./Badge.svelte";

  let { objectUri }: { objectUri: string } = $props();

  let grants = $state<{ grantee: string; permission: string }[]>([]);
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
      const all = (await res.json()) as { grantee: string; permission: string; object: string }[];
      grants = all.filter((g) => g.object === objectUri);
    } catch {
      // Silently ignore — the list simply won't render
    }
  }

  $effect(() => {
    objectUri;
    loadGrants();
  });
</script>

{#if grants.length > 0}
  <div class="shared-with">
    <Badge variant="info">
      {@html usersIcon}
      Shared with
      {#each grants as grant, i}
        <span class="grantee" title={grant.grantee}>{truncateDid(grant.grantee)}</span>{#if grant.permission === "write"}<span class="permission">(write)</span>{/if}{#if i < grants.length - 1},&nbsp;{/if}
      {/each}
    </Badge>
  </div>
{/if}

<style>
  .shared-with {
    margin-bottom: 0.75rem;
  }
  .grantee {
    font-family: monospace;
    font-size: 0.85em;
  }
  .permission {
    font-size: 0.85em;
    opacity: 0.7;
  }
</style>
