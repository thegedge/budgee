<script lang="ts">
  import type { Subscription } from "rxjs";
  import { db, isDemoMode } from "../database/Db";
  import { importDatabase } from "../database/importDb";
  import { startReplication, syncStatus$ } from "../database/replication";
  import { SchemaVersionError } from "../database/Db";
  import { fetchIdentity, type User } from "../identity";
  import { showConfirmDialog } from "./shared/confirmDialog";
  import { showErrorOverlay } from "./shared/errorOverlay";
  import { setupGlobalErrorHandler } from "./globalErrorHandler";
  import { showLoadingOverlay, hideLoadingOverlay } from "./shared/loadingOverlay";
  import GlobalSearch from "./shared/GlobalSearch.svelte";
  import ToastManager from "./shared/ToastManager.svelte";
  import Modal from "./shared/Modal.svelte";
  import SyncStatusIndicator from "./SyncStatusIndicator.svelte";
  import { navigate, withBasePath } from "./navigate";
  import { initRouter, startRouter, matchedRoute, currentRoute } from "../lib/router.svelte";

  import banknotesIcon from "lucide-static/icons/banknote.svg?raw";
  import birdIcon from "lucide-static/icons/bird.svg?raw";
  import chartBarIcon from "lucide-static/icons/chart-column.svg?raw";
  import landmarkIcon from "lucide-static/icons/landmark.svg?raw";
  import listFilterIcon from "lucide-static/icons/list-filter.svg?raw";
  import adjustmentsHorizontalIcon from "lucide-static/icons/settings.svg?raw";
  import buildingStorefrontIcon from "lucide-static/icons/store.svg?raw";
  import tagIcon from "lucide-static/icons/tag.svg?raw";

  let dragOver = $state(false);
  let showShortcuts = $state(false);
  let identity: User | null = null;
  let dragCounter = 0;
  let cancelReplication: (() => void) | undefined;
  let syncSub: Subscription | undefined;
  let reconnectTimer: ReturnType<typeof setTimeout> | undefined;

  // Lazy-loaded page components
  let Dashboard = $state<typeof import("./dashboard/Dashboard.svelte").default>();
  let TransactionList = $state<typeof import("./transactions/TransactionList.svelte").default>();
  let TransactionDetail = $state<typeof import("./transactions/TransactionDetail.svelte").default>();
  let AccountList = $state<typeof import("./accounts/AccountList.svelte").default>();
  let AccountDetail = $state<typeof import("./accounts/AccountDetail.svelte").default>();
  let MerchantList = $state<typeof import("./merchants/MerchantList.svelte").default>();
  let MerchantDetail = $state<typeof import("./merchants/MerchantDetail.svelte").default>();
  let TagManager = $state<typeof import("./tags/TagManager.svelte").default>();
  let RuleManager = $state<typeof import("./rules/RuleManager.svelte").default>();
  let Settings = $state<typeof import("./settings/Settings.svelte").default>();

  // Eagerly load main pages
  import("./dashboard/Dashboard.svelte").then((m) => { Dashboard = m.default; });
  import("./transactions/TransactionList.svelte").then((m) => { TransactionList = m.default; });
  import("./accounts/AccountList.svelte").then((m) => { AccountList = m.default; });
  import("./merchants/MerchantList.svelte").then((m) => { MerchantList = m.default; });
  import("./tags/TagManager.svelte").then((m) => { TagManager = m.default; });
  import("./rules/RuleManager.svelte").then((m) => { RuleManager = m.default; });
  import("./settings/Settings.svelte").then((m) => { Settings = m.default; });

  initRouter([
    { path: "/" },
    { path: "/transactions" },
    {
      path: "/transactions/:id",
      enter: async () => {
        const m = await import("./transactions/TransactionDetail.svelte");
        TransactionDetail = m.default;
        return true;
      },
    },
    { path: "/accounts" },
    {
      path: "/accounts/:id",
      enter: async () => {
        const m = await import("./accounts/AccountDetail.svelte");
        AccountDetail = m.default;
        return true;
      },
    },
    { path: "/merchants" },
    {
      path: "/merchants/:id",
      enter: async () => {
        const m = await import("./merchants/MerchantDetail.svelte");
        MerchantDetail = m.default;
        return true;
      },
    },
    { path: "/tags" },
    { path: "/rules" },
    { path: "/settings" },
  ]);

  let route = $derived(matchedRoute());
  let routePath = $derived(currentRoute());

  async function connectReplication() {
    const cancel = cancelReplication;
    cancelReplication = undefined;
    await cancel?.();
    let url: string | null;
    try { url = localStorage.getItem("budgee-sync-url"); } catch { return; }
    if (url) {
      try {
        cancelReplication = await startReplication(url, identity?.login ?? null);
      } catch (e) {
        console.error("Failed to start replication:", e);
      }
    }
  }

  function initTheme() {
    try {
      const theme = localStorage.getItem("budgee-theme");
      if (theme === "light" || theme === "dark") {
        document.documentElement.dataset.theme = theme;
      } else {
        delete document.documentElement.dataset.theme;
      }
    } catch { /* localStorage unavailable */ }
  }

  function onGlobalKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable;
    if (e.key === "?" && !isInput && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      showShortcuts = !showShortcuts;
    }
  }

  function onDragOver(e: DragEvent) { e.preventDefault(); }
  function onDragEnter(e: DragEvent) { e.preventDefault(); dragCounter++; dragOver = true; }
  function onDragLeave() { dragCounter--; if (dragCounter === 0) dragOver = false; }

  async function onDrop(e: DragEvent) {
    e.preventDefault();
    dragCounter = 0;
    dragOver = false;
    const file = e.dataTransfer?.files[0];
    if (!file) return;
    if (file.name.endsWith(".csv")) {
      navigate("/transactions");
      document.dispatchEvent(new CustomEvent("budgee-import-csv", { detail: { file } }));
    } else if (file.name.endsWith(".json")) {
      const confirmed = await showConfirmDialog({
        heading: "Import Database",
        message: "This will replace all existing data. Are you sure?",
        confirmLabel: "Import",
        danger: true,
      });
      if (!confirmed) return;
      showLoadingOverlay("Importing database...");
      try {
        await importDatabase(file);
        window.location.reload();
      } finally {
        hideLoadingOverlay();
      }
    }
  }

  function navHref(href: string): string {
    const prefixed = withBasePath(href);
    return isDemoMode ? `${prefixed}${prefixed.includes("?") ? "&" : "?"}demo=1` : prefixed;
  }

  function isActive(href: string): boolean {
    return href === "/" ? routePath === "/" : routePath.startsWith(href);
  }

  function demoExitHref(): string {
    const url = new URL(window.location.href);
    url.searchParams.delete("demo");
    return url.pathname + url.search;
  }

  function onDemoExit(e: Event) {
    e.preventDefault();
    window.location.href = demoExitHref();
  }

  $effect(() => {
    if (isDemoMode) document.body.classList.add("demo-mode");
    initTheme();
    document.addEventListener("keydown", onGlobalKeydown);
    setupGlobalErrorHandler();

    void (async () => {
      db().catch((error: unknown) => {
        console.error(error);
        const isDatabaseError = error instanceof SchemaVersionError;
        const message = isDatabaseError
          ? "The database schema is incompatible with this version of the app and can't be opened. You can export the raw data for safekeeping, then delete the database to get unstuck."
          : error instanceof Error ? error.message : String(error);
        showErrorOverlay(message, { isDatabaseError });
      });
      const user = await fetchIdentity();
      identity = user;
      if (user) console.info("Identified as:", user.login);

      if (!isDemoMode) {
        connectReplication();
        syncSub = syncStatus$.subscribe((status) => {
          if (status === "error" && !reconnectTimer) {
            reconnectTimer = setTimeout(() => {
              reconnectTimer = undefined;
              connectReplication();
            }, 5000);
          }
        });
      }
    })();

    const stopRouter = startRouter();

    return () => {
      document.removeEventListener("keydown", onGlobalKeydown);
      stopRouter();
      cancelReplication?.();
      syncSub?.unsubscribe();
      clearTimeout(reconnectTimer);
    };
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="app"
  class:demo-mode={isDemoMode}
  ondragover={onDragOver}
  ondragenter={onDragEnter}
  ondragleave={onDragLeave}
  ondrop={onDrop}
>
  {#if isDemoMode}
    <div class="demo-banner">Demo Mode — changes won't be saved <a href={demoExitHref()} onclick={onDemoExit}>Exit demo</a></div>
  {/if}

  <div class="sidebar">
    <h1 class="app-name">{@html birdIcon} Budgee</h1>

    <nav>
      <a href={navHref("/")} class:active={isActive("/")}>{@html chartBarIcon} Dashboard</a>
      <a href={navHref("/transactions")} class:active={isActive("/transactions")}>{@html banknotesIcon} Transactions</a>
      <a href={navHref("/accounts")} class:active={isActive("/accounts")}>{@html landmarkIcon} Accounts</a>
      <a href={navHref("/merchants")} class:active={isActive("/merchants")}>{@html buildingStorefrontIcon} Merchants</a>
      <a href={navHref("/tags")} class:active={isActive("/tags")}>{@html tagIcon} Tags</a>
      <a href={navHref("/rules")} class:active={isActive("/rules")}>{@html listFilterIcon} Rules</a>
      <a href={navHref("/settings")} class:active={isActive("/settings")}>{@html adjustmentsHorizontalIcon} Settings</a>
      <div style="flex:1"></div>
      <SyncStatusIndicator />
    </nav>
  </div>

  <main>
    {#if route}
      {#if route.config.path === "/" && Dashboard}
        <Dashboard />
      {:else if route.config.path === "/transactions" && TransactionList}
        <TransactionList />
      {:else if route.config.path === "/transactions/:id" && TransactionDetail}
        <TransactionDetail transactionId={route.params.id ?? ""} />
      {:else if route.config.path === "/accounts" && AccountList}
        <AccountList />
      {:else if route.config.path === "/accounts/:id" && AccountDetail}
        <AccountDetail accountId={route.params.id ?? ""} />
      {:else if route.config.path === "/merchants" && MerchantList}
        <MerchantList />
      {:else if route.config.path === "/merchants/:id" && MerchantDetail}
        <MerchantDetail merchantId={route.params.id ?? ""} />
      {:else if route.config.path === "/tags" && TagManager}
        <TagManager />
      {:else if route.config.path === "/rules" && RuleManager}
        <RuleManager />
      {:else if route.config.path === "/settings" && Settings}
        <Settings />
      {/if}
    {/if}
  </main>

  <GlobalSearch />
  <ToastManager />

  {#if showShortcuts}
    <Modal heading="Keyboard Shortcuts" onClose={() => { showShortcuts = false; }}>
      <table style="width:100%;border-collapse:collapse">
        <tbody>
          <tr><td style="padding:0.4rem 0"><kbd>⌘K</kbd></td><td style="padding:0.4rem 0.5rem">Open search</td></tr>
          <tr><td style="padding:0.4rem 0"><kbd>?</kbd></td><td style="padding:0.4rem 0.5rem">Show shortcuts</td></tr>
          <tr><td style="padding:0.4rem 0"><kbd>Esc</kbd></td><td style="padding:0.4rem 0.5rem">Close modal</td></tr>
        </tbody>
      </table>
    </Modal>
  {/if}

  {#if dragOver}
    <div class="drop-overlay">Drop file to import</div>
  {/if}
</div>

<style>
  .app {
    width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    display: grid;
    grid-template-areas:
      "sidebar main";
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    gap: 0;
    color: var(--budgee-text);
    font-family: sans-serif;
  }

  .app :global(svg.lucide) {
    display: inline-block;
    width: 1rem;
    height: 1rem;
  }

  .sidebar {
    grid-area: sidebar;
    display: flex;
    flex-direction: column;
    background: var(--budgee-surface);
    border-right: 1px solid var(--budgee-border);
    width: 220px;
    position: sticky;
    top: 0;
    max-height: 100vh;
    overflow-y: auto;
  }

  .app-name {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--budgee-text);
    margin: 0;
    padding-block: 1rem;
    padding-inline-end: 0.5rem;
    flex-shrink: 0;
  }
  .app-name :global(svg.lucide) { width: 1.5rem; height: 1.5rem; }

  nav {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  nav a {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: var(--budgee-text-muted);
    font-size: 0.9rem;
    border-left: 3px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }
  nav a:hover { color: var(--budgee-primary); }
  nav a.active { color: var(--budgee-primary); border-left-color: var(--budgee-primary); }

  main { grid-area: main; padding: 1.5rem 2rem; }

  .drop-overlay {
    position: fixed;
    inset: 0;
    background: var(--budgee-overlay);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    pointer-events: none;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .demo-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9000;
    --color: var(--budgee-warning, lch(80% 80 85));
    color: light-dark(lch(15% 35 85), lch(85% 35 85));
    background: color-mix(in lch, var(--color) 25%, transparent);
    text-align: center;
    padding: 0.35rem 1rem;
    font-size: 0.85rem;
    font-weight: 600;
  }
  .demo-banner a { color: inherit; margin-left: 0.5rem; }

  .demo-mode { padding-top: 2rem; }

  kbd {
    background: var(--budgee-bg);
    border: 1px solid var(--budgee-border);
    border-radius: 3px;
    padding: 2px 6px;
  }

  @media (max-width: 1024px) {
    .app {
      grid-template-areas:
        "sidebar"
        "main";
      grid-template-columns: 1fr;
    }
    .sidebar {
      flex-direction: row;
      flex-wrap: wrap;
      width: auto;
      position: static;
      max-height: none;
      border-right: none;
      border-bottom: 1px solid var(--budgee-border);
    }
    .app-name {
      width: auto;
      padding: 1rem;
    }
    nav {
      flex-direction: row;
      flex-wrap: wrap;
      flex: initial;
      padding: 0 0.5rem;
    }
    nav a {
      border-left: none;
      border-bottom: 2px solid transparent;
      padding: 0.5rem 0.75rem;
    }
    nav a.active { border-bottom-color: var(--budgee-primary); }
    main { padding: 1rem; }
  }
</style>
