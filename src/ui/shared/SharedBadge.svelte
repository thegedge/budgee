<script lang="ts">
  import lockIcon from "lucide-static/icons/lock.svg?raw";
  import Badge from "./Badge.svelte";

  let { ownerDid }: { ownerDid: string } = $props();

  function truncateDid(did: string): string {
    const parts = did.split(":");
    return parts[parts.length - 1] ?? did;
  }

  let truncatedDid = $derived(truncateDid(ownerDid));
</script>

<Badge variant="info">
  {@html lockIcon}
  Shared by {truncatedDid}
</Badge>
