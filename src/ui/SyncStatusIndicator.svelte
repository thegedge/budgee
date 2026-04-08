<script lang="ts">
  import clockIcon from "lucide-static/icons/clock.svg?raw";
  import userIcon from "lucide-static/icons/user.svg?raw";
  import { type SyncStatus, syncStatus$ } from "../database/replication";
  import { getCachedIdentity } from "../identity";
  import { getAuth } from "../auth.svelte";

  // Filled GitHub mark (MIT licensed, from GitHub's brand assets)
  const githubIcon = `<svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362l-.08-9.127c-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126l-.08 13.526c0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"/></svg>`;

  const commitSha = __COMMIT_SHA__;
  const commitDate = __COMMIT_DATE__;
  const commitMessage = __COMMIT_MESSAGE__;

  let identityLogin = $state<string | null>(null);

  $effect(() => {
    identityLogin = getCachedIdentity()?.login ?? null;
  });

  const GITHUB_REPO = "https://github.com/thegedge/budgee";

  function timeAgo(dateString: string): string {
    const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
    const intervals: [number, string][] = [
      [31536000, "year"],
      [2592000, "month"],
      [86400, "day"],
      [3600, "hour"],
      [60, "minute"],
    ];
    for (const [secs, label] of intervals) {
      const count = Math.floor(seconds / secs);
      if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
    }
    return "just now";
  }

  const LABELS: Record<SyncStatus, string> = {
    "not-configured": "not configured",
    connecting: "connecting",
    syncing: "syncing",
    synced: "synced",
    error: "error",
  };

  let status = $state<SyncStatus>("not-configured");

  $effect(() => {
    const sub = syncStatus$.subscribe((s) => { status = s; });
    return () => sub.unsubscribe();
  });
</script>

<div class="sync-status">
  {#if identityLogin}
    <span class="item">{@html userIcon} {identityLogin}</span>
  {/if}
  {#if getAuth().status === "local"}
    <a href="/setup" class="not-backed-up">Not backed up</a>
  {/if}
  <a href="{GITHUB_REPO}/commit/{commitSha}" target="_blank" rel="noopener" title={commitMessage}>{@html githubIcon} <span>{commitSha}</span></a>
  <span class="item published">{@html clockIcon} published {timeAgo(commitDate)}</span>
  {#if status !== "not-configured"}
    <span class="item"><span class="dot {status}"></span> {LABELS[status]}</span>
  {/if}
</div>

<style>
  .sync-status {
    display: grid;
    grid-template-columns: 0.85rem 1fr;
    align-items: center;
    gap: 0.25rem 0.35rem;
    font-size: 0.75rem;
    color: var(--budgee-text-muted);
    padding: 0.5rem 1rem;
  }
  .dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    justify-self: center;
  }
  .dot.not-configured { background: var(--budgee-text-muted, gray); }
  .dot.connecting { background: var(--budgee-warning, orange); animation: pulse 1s infinite; }
  .dot.syncing { background: var(--budgee-warning, orange); animation: pulse 1s infinite; }
  .dot.synced { background: var(--budgee-positive, green); }
  .dot.error { background: var(--budgee-negative, red); }
  .item, a { display: contents; color: inherit; text-decoration: none; }
  a:hover { color: var(--budgee-text); }
  .not-backed-up {
    display: contents;
    color: var(--budgee-warning, lch(65% 60 60));
    font-weight: 600;
    text-decoration: none;
  }
  .not-backed-up:hover { color: var(--budgee-text); }
  .sync-status :global(svg) { width: 0.85rem; height: 0.85rem; }
  .published { font-style: italic; }
  @media (max-width: 1024px) {
    .sync-status {
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem 0.75rem;
    }
    .item, a { display: inline-flex; align-items: center; gap: 0.25rem; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
</style>
