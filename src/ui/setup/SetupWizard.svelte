<script lang="ts">
  import { getAuth, login, probeServer, register, acceptCookieAuth } from "../../auth.svelte";
  import { navigate } from "../navigate";
  import "../styles/button.css";
  import "../styles/input.css";

  type Tab = "managed" | "custom";
  type AuthMode = "login" | "register";
  type CustomStep = "probe" | "auth";

  let tab = $state<Tab>("managed");
  let authMode = $state<AuthMode>("login");

  let email = $state("");
  let password = $state("");
  let submitting = $state(false);
  let error = $state("");

  let customUrl = $state("");
  let customStep = $state<CustomStep>("probe");
  let probing = $state(false);

  function managedServerUrl(): string {
    const hostname = window.location.hostname;
    const parts = hostname.split(".");
    if (parts.length > 2) {
      return `${window.location.protocol}//mygard.${parts.slice(1).join(".")}`;
    }
    return `${window.location.protocol}//mygard.${hostname}`;
  }

  function switchTab(t: Tab) {
    tab = t;
    error = "";
    email = "";
    password = "";
    customUrl = "";
    customStep = "probe";
    authMode = "login";
  }

  async function onManagedSubmit(e: SubmitEvent) {
    e.preventDefault();
    error = "";
    submitting = true;
    const serverUrl = managedServerUrl();
    try {
      if (authMode === "login") {
        await login(serverUrl, email, password);
      } else {
        await register(serverUrl, email, password);
      }
      navigate("/");
    } catch (err) {
      error = err instanceof Error ? err.message : String(err);
    } finally {
      submitting = false;
    }
  }

  async function onProbeSubmit(e: SubmitEvent) {
    e.preventDefault();
    error = "";
    probing = true;
    try {
      const result = await probeServer(customUrl);
      if (result.user) {
        acceptCookieAuth(customUrl, result.user);
        navigate("/");
        return;
      }
      customStep = "auth";
    } catch (err) {
      error = err instanceof Error ? err.message : String(err);
    } finally {
      probing = false;
    }
  }

  async function onCustomAuthSubmit(e: SubmitEvent) {
    e.preventDefault();
    error = "";
    submitting = true;
    try {
      if (authMode === "login") {
        await login(customUrl, email, password);
      } else {
        await register(customUrl, email, password);
      }
      navigate("/");
    } catch (err) {
      error = err instanceof Error ? err.message : String(err);
    } finally {
      submitting = false;
    }
  }
</script>

{#if getAuth().status === "authenticated"}
  {@const auth = getAuth()}
  <div class="already-connected">
    <p>Already connected as <strong>{auth.status === "authenticated" ? auth.user.name : ""}</strong>.</p>
    <a href="/">Go to dashboard</a>
  </div>
{:else}
  <div class="setup-wizard">
    <h1>Set up backup</h1>

    <div class="tabs" role="tablist">
      <button
        role="tab"
        aria-selected={tab === "managed"}
        onclick={() => switchTab("managed")}
      >Managed</button>
      <button
        role="tab"
        aria-selected={tab === "custom"}
        onclick={() => switchTab("custom")}
      >Custom server</button>
    </div>

    {#if tab === "managed"}
      <div role="tabpanel">
        <p class="hint">Connect to the managed MyGard service.</p>

        <div class="auth-toggle">
          <button
            class:active={authMode === "login"}
            onclick={() => { authMode = "login"; error = ""; }}
          >Login</button>
          <button
            class:active={authMode === "register"}
            onclick={() => { authMode = "register"; error = ""; }}
          >Register</button>
        </div>

        <form onsubmit={onManagedSubmit}>
          <div class="field">
            <label for="managed-email">Email</label>
            <input
              id="managed-email"
              type="email"
              bind:value={email}
              required
              autocomplete="email"
            />
          </div>
          <div class="field">
            <label for="managed-password">Password</label>
            <input
              id="managed-password"
              type="password"
              bind:value={password}
              required
              autocomplete={authMode === "login" ? "current-password" : "new-password"}
            />
          </div>
          {#if error}
            <p class="error">{error}</p>
          {/if}
          <button type="submit" disabled={submitting}>
            {submitting ? "Connecting..." : authMode === "login" ? "Login" : "Create account"}
          </button>
        </form>
      </div>
    {:else}
      <div role="tabpanel">
        <p class="hint">Connect to your own MyGard-compatible sync server.</p>

        {#if customStep === "probe"}
          <form onsubmit={onProbeSubmit}>
            <div class="field">
              <label for="custom-url">Server URL</label>
              <input
                id="custom-url"
                type="url"
                bind:value={customUrl}
                required
                placeholder="https://your-server.example.com"
              />
            </div>
            {#if error}
              <p class="error">{error}</p>
            {/if}
            <button type="submit" disabled={probing}>
              {probing ? "Connecting..." : "Connect"}
            </button>
          </form>
        {:else}
          <div class="auth-toggle">
            <button
              class:active={authMode === "login"}
              onclick={() => { authMode = "login"; error = ""; }}
            >Login</button>
            <button
              class:active={authMode === "register"}
              onclick={() => { authMode = "register"; error = ""; }}
            >Register</button>
          </div>

          <form onsubmit={onCustomAuthSubmit}>
            <div class="field">
              <label for="custom-email">Email</label>
              <input
                id="custom-email"
                type="email"
                bind:value={email}
                required
                autocomplete="email"
              />
            </div>
            <div class="field">
              <label for="custom-password">Password</label>
              <input
                id="custom-password"
                type="password"
                bind:value={password}
                required
                autocomplete={authMode === "login" ? "current-password" : "new-password"}
              />
            </div>
            {#if error}
              <p class="error">{error}</p>
            {/if}
            <button type="submit" disabled={submitting}>
              {submitting ? "Connecting..." : authMode === "login" ? "Login" : "Create account"}
            </button>
          </form>
        {/if}
      </div>
    {/if}
  </div>
{/if}

<style>
  .setup-wizard {
    max-width: 480px;
  }

  h1 { margin-top: 0; }

  .tabs {
    display: flex;
    border-bottom: 2px solid var(--budgee-border);
    margin-bottom: 1.5rem;
    gap: 0;
  }

  .tabs button {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: var(--budgee-text-muted);
    font-size: 0.95rem;
  }

  .tabs button[aria-selected="true"] {
    color: var(--budgee-primary);
    border-bottom-color: var(--budgee-primary);
    font-weight: 600;
  }

  .auth-toggle {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .auth-toggle button {
    background: none;
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    padding: 0.3rem 0.75rem;
    cursor: pointer;
    color: var(--budgee-text-muted);
    font-size: 0.85rem;
  }

  .auth-toggle button.active {
    background: var(--budgee-primary);
    border-color: var(--budgee-primary);
    color: white;
    font-weight: 600;
  }

  .field {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.25rem;
    font-size: 0.9rem;
  }

  input[type="email"],
  input[type="password"],
  input[type="url"] {
    width: 100%;
    padding: 0.4rem 0.6rem;
    border: 1px solid var(--budgee-border);
    border-radius: 4px;
    background: var(--budgee-surface);
    color: var(--budgee-text);
    font-size: 0.9rem;
    box-sizing: border-box;
  }

  .hint {
    font-size: 0.85rem;
    color: var(--budgee-text-muted);
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .error {
    font-size: 0.85rem;
    color: var(--budgee-negative, red);
    margin: 0.5rem 0;
  }

  .already-connected {
    padding: 2rem;
    text-align: center;
  }
</style>
