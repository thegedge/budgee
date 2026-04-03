<script lang="ts">
  import Modal from "./Modal.svelte";
  import { knownDids } from "../../knownDids.svelte";

  let { objectUri, onClose }: { objectUri: string; onClose: () => void } = $props();

  let grantee = $state("");
  let permission = $state<"read" | "write">("read");
  let submitting = $state(false);
  let grants = $state<{ id: string; grantee: string; permission: string }[]>([]);
  let loadError = $state("");
  let submitError = $state("");

  let suggestions = $derived(knownDids().filter((did) => !grants.some((g) => g.grantee === did)));

  function serverUrl(): string {
    return localStorage.getItem("budgee-sync-url") ?? "";
  }

  function token(): string {
    return localStorage.getItem("budgee-sync-token") ?? "";
  }

  async function loadGrants() {
    loadError = "";
    try {
      const res = await fetch(`${serverUrl()}/capabilities/granted`, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      if (!res.ok) { loadError = `Failed to load grants (${res.status})`; return; }
      const all = (await res.json()) as { id: string; object: string; grantee: string; permission: string }[];
      grants = all.filter((g) => g.object === objectUri);
    } catch {
      loadError = "Network error loading grants";
    }
  }

  async function submit() {
    if (!grantee.trim()) return;
    submitting = true;
    submitError = "";
    try {
      const res = await fetch(`${serverUrl()}/capabilities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ object: objectUri, grantee: grantee.trim(), permission }),
      });
      if (!res.ok) { submitError = `Failed to grant (${res.status})`; return; }
      grantee = "";
      await loadGrants();
    } catch {
      submitError = "Network error granting capability";
    } finally {
      submitting = false;
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
      // Silently ignore revoke errors — the list will be stale but re-fetched next open
    }
  }

  function truncateDid(did: string): string {
    const parts = did.split(":");
    return parts[parts.length - 1] ?? did;
  }

  $effect(() => {
    loadGrants();
  });
</script>

<Modal heading="Share" {onClose}>
  {#snippet children()}
    <form class="grant-form" onsubmit={(e) => { e.preventDefault(); submit(); }}>
      <div class="field">
        <label for="grantee-did">Grantee DID</label>
        <input
          id="grantee-did"
          type="text"
          placeholder="did:web:example.com:users:alice"
          bind:value={grantee}
          disabled={submitting}
          list="known-dids"
        />
        <datalist id="known-dids">
          {#each suggestions as did}
            <option value={did}></option>
          {/each}
        </datalist>
      </div>
      <div class="field">
        <label for="permission">Permission</label>
        <select id="permission" bind:value={permission} disabled={submitting}>
          <option value="read">Read</option>
          <option value="write">Write</option>
        </select>
      </div>
      {#if submitError}
        <p class="error">{submitError}</p>
      {/if}
      <button type="submit" disabled={submitting || !grantee.trim()}>Grant access</button>
    </form>

    <div class="grants-section">
      <h4>Existing grants</h4>
      {#if loadError}
        <p class="error">{loadError}</p>
      {:else if grants.length === 0}
        <p class="empty">No grants for this object.</p>
      {:else}
        <ul class="grants-list">
          {#each grants as grant (grant.id)}
            <li class="grant-row">
              <span class="grant-grantee" title={grant.grantee}>{truncateDid(grant.grantee)}</span>
              <span class="grant-permission">{grant.permission}</span>
              <button class="revoke-btn" onclick={() => revoke(grant.id)}>Revoke</button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  {/snippet}
</Modal>

<style>
  .grant-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .field label {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--budgee-text-muted);
  }
  .field input,
  .field select {
    padding: 0.4rem 0.6rem;
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    background: var(--budgee-surface);
    color: var(--budgee-text);
    font: inherit;
    font-size: 0.9rem;
  }
  .grant-form button[type="submit"] {
    align-self: flex-start;
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
  }
  .grants-section h4 {
    margin: 0 0 0.5rem;
    font-size: 0.95rem;
  }
  .grants-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .grant-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.35rem 0.6rem;
    background: var(--budgee-bg);
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    font-size: 0.875rem;
  }
  .grant-grantee {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: monospace;
  }
  .grant-permission {
    color: var(--budgee-text-muted);
    font-size: 0.8rem;
  }
  .revoke-btn {
    background: none;
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    cursor: pointer;
    padding: 2px 8px;
    font-size: 0.8rem;
    color: var(--budgee-text-muted);
    white-space: nowrap;
  }
  .revoke-btn:hover {
    color: var(--budgee-danger, lch(72.8% 28.9 22.1));
    border-color: currentColor;
  }
  .error {
    color: var(--budgee-danger, lch(72.8% 28.9 22.1));
    font-size: 0.85rem;
    margin: 0;
  }
  .empty {
    color: var(--budgee-text-muted);
    font-size: 0.875rem;
    margin: 0;
  }
</style>
