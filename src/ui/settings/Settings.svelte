<script lang="ts">
  import { exportDatabase } from "../../database/exportDb";
  import { importDatabase } from "../../database/importDb";
  import { testConnection } from "../../database/replication";
  import { showConfirmDialog } from "../shared/confirmDialog";
  import { showLoadingOverlay, hideLoadingOverlay } from "../shared/loadingOverlay";
  import { showToast } from "../shared/toast";
  import { isDemoMode } from "../../database/Db";
  import "../styles/button.css";

  // No props needed — save triggers a full page reload to reset the database singleton.

  let url = $state("");
  let token = $state("");
  let saving = $state(false);
  let saveError = $state("");
  let theme = $state<"system" | "light" | "dark">("system");

  $effect(() => {
    url = localStorage.getItem("budgee-sync-url") ?? "";
    token = localStorage.getItem("budgee-sync-token") ?? "";
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

  function onUrlChange(e: Event) {
    url = (e.target as HTMLInputElement).value;
    saveError = "";
  }

  function onTokenChange(e: Event) {
    token = (e.target as HTMLInputElement).value;
    saveError = "";
  }

  let canSave = $derived(
    url !== (localStorage.getItem("budgee-sync-url") ?? "") ||
    token !== (localStorage.getItem("budgee-sync-token") ?? ""),
  );

  async function onSave() {
    if (url) {
      saving = true;
      saveError = "";
      try {
        await testConnection(url);
      } catch (e) {
        saving = false;
        saveError = e instanceof Error ? e.message : String(e);
        showToast({ message: "Connection failed", type: "error" });
        return;
      }
      saving = false;
    }

    localStorage.setItem("budgee-sync-url", url);
    if (token) {
      localStorage.setItem("budgee-sync-token", token);
    } else {
      localStorage.removeItem("budgee-sync-token");
    }
    localStorage.removeItem("budgee-ice-server");
    localStorage.removeItem("budgee-turn-server");
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
    <p class="hint">Sync your data across devices using a sync server. Save a valid URL to enable sync; clear it to disable.</p>
    <div class="field">
      <label for="sync-url">Server URL</label>
      <input type="url" id="sync-url" value={url} oninput={onUrlChange} placeholder="http://your-server:3001" />
      <p class="hint">The URL of your sync server. Clear to disable sync.</p>
    </div>
    <div class="field">
      <label for="sync-token">Token</label>
      <input type="password" id="sync-token" value={token} oninput={onTokenChange} placeholder="Paste your auth token" />
      <p class="hint">From <code>cli register</code> or <code>cli pair-redeem</code>. Leave blank for Tailscale auth.</p>
    </div>
    {#if saveError}
      <p class="test-result error">Connection failed: {saveError}</p>
    {/if}
    <div class="field">
      <button disabled={!canSave || saving} onclick={onSave}>
        {saving ? "Connecting..." : "Save"}
      </button>
    </div>
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
  input[type="url"], input[type="password"] {
    width: 100%;
    max-width: 400px;
    padding: 0.4rem 0.6rem;
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    background: var(--budgee-surface);
    color: var(--budgee-text);
    font-size: 0.9rem;
  }
  .hint { font-size: 0.8rem; color: var(--budgee-text-muted); margin-top: 0.25rem; }
  button { padding: 0.5rem 1rem; }
  .test-result { font-size: 0.85rem; margin-top: 0.25rem; }
  .test-result.error { color: var(--budgee-negative, red); }
</style>
