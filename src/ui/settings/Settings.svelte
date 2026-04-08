<script lang="ts">
  import { exportDatabase } from "../../database/exportDb";
  import { importDatabase } from "../../database/importDb";
  import { showConfirmDialog } from "../shared/confirmDialog";
  import { showLoadingOverlay, hideLoadingOverlay } from "../shared/loadingOverlay";
  import { isDemoMode } from "../../database/Db";
  import { getAuth, logout } from "../../auth.svelte";
  import "../styles/button.css";

  let theme = $state<"system" | "light" | "dark">("system");

  $effect(() => {
    const stored = localStorage.getItem("budgee-theme");
    theme = stored === "light" || stored === "dark" ? stored : "system";
  });

  function onThemeChange(e: Event) {
    const value = (e.target as HTMLSelectElement).value as "system" | "light" | "dark";
    theme = value;
    if (value === "system") {
      localStorage.removeItem("budgee-theme");
      delete document.documentElement.dataset.theme;
    } else {
      localStorage.setItem("budgee-theme", value);
      document.documentElement.dataset.theme = value;
    }
  }

  async function onDisconnect() {
    await logout();
    window.location.reload();
  }

  async function onDatabaseImport(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files?.length) return;
    const confirmed = await showConfirmDialog({
      heading: "Import Database",
      message: "This will replace all existing data. Are you sure?",
      confirmLabel: "Import",
      danger: true,
    });
    if (!confirmed) { input.value = ""; return; }
    showLoadingOverlay("Importing database...");
    try {
      await importDatabase(input.files[0]);
      input.value = "";
      window.location.reload();
    } finally {
      hideLoadingOverlay();
    }
  }
</script>

<section>
  <h2>Appearance</h2>
  <div class="field">
    <label for="theme-select">Theme</label>
    <select id="theme-select" onchange={onThemeChange}>
      <option value="system" selected={theme === "system"}>System</option>
      <option value="light" selected={theme === "light"}>Light</option>
      <option value="dark" selected={theme === "dark"}>Dark</option>
    </select>
  </div>
</section>

<section>
  <h2>Import / Export</h2>
  <h3>Import Database</h3>
  <p>Restore from a full JSON backup. This will replace all existing data.</p>
  <input type="file" accept=".json" onchange={onDatabaseImport} />
  <h3>Export Database</h3>
  <p>Download a full backup of your data as JSON.</p>
  <button onclick={exportDatabase}>Export</button>
</section>

{#if isDemoMode}
  <section>
    <h2>Sync</h2>
    <p class="hint">Sync is disabled in demo mode.</p>
  </section>
{:else}
  <section>
    <h2>Sync</h2>
    {#if getAuth().status === "authenticated"}
      {@const auth = getAuth()}
      {#if auth.status === "authenticated"}
        <div class="field">
          <span class="field-label">Server</span>
          <span class="field-value">{auth.serverUrl}</span>
        </div>
        <div class="field">
          <span class="field-label">Account</span>
          <span class="field-value">{auth.user.name} ({auth.user.login})</span>
        </div>
        <button class="danger" onclick={onDisconnect}>Disconnect</button>
      {/if}
    {:else}
      <p class="hint">Not connected. <a href="/setup">Set up backup</a> to sync your data across devices.</p>
    {/if}
  </section>
{/if}

<style>
  section {
    border: 1px solid var(--budgee-border);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    background: var(--budgee-surface);
  }
  h2 { margin-top: 0; }
  .field { margin-bottom: 1rem; }
  label { display: block; font-weight: 600; margin-bottom: 0.25rem; }
  select {
    padding: 0.4rem 0.6rem;
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    background: var(--budgee-surface);
    color: var(--budgee-text);
    font-size: 0.9rem;
  }
  .hint { font-size: 0.8rem; color: var(--budgee-text-muted); margin-top: 0.25rem; }
  .hint a { color: var(--budgee-primary); }
  button { padding: 0.5rem 1rem; }
  .field-label { display: block; font-weight: 600; font-size: 0.85rem; color: var(--budgee-text-muted); }
  .field-value { font-size: 0.9rem; }
</style>
