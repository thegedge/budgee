<script lang="ts">
  import birdIcon from "lucide-static/icons/bird.svg?raw";

  let { message = "" }: { message?: string } = $props();
</script>

<div class="overlay">
  <div class="icon">{@html birdIcon}</div>
  <div class="message">{message}</div>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    gap: 1rem;
  }
  .icon {
    animation: pulse 1.2s ease-in-out infinite;
  }
  .icon :global(svg) {
    width: 3rem;
    height: 3rem;
    color: white;
  }
  .message {
    color: white;
    font-size: 1.25rem;
    font-weight: 600;
    font-family: sans-serif;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.15); opacity: 1; }
  }
</style>
