<script lang="ts">
  import { Temporal } from "@js-temporal/polyfill";

  export type TimeRange = Temporal.Duration | null;

  const OPTIONS: { value: TimeRange; label: string }[] = [
    { value: Temporal.Duration.from({ months: 1 }), label: "1M" },
    { value: Temporal.Duration.from({ months: 6 }), label: "6M" },
    { value: Temporal.Duration.from({ years: 1 }), label: "1Y" },
    { value: null, label: "All" },
  ];

  let { value = null, onTimeRangeChange }: {
    value?: TimeRange;
    onTimeRangeChange?: (range: TimeRange) => void;
  } = $props();

  function isActive(option: TimeRange): boolean {
    if (value === null || option === null) return value === option;
    const relativeTo = Temporal.Now.plainDateISO();
    return Temporal.Duration.compare(value, option, { relativeTo }) === 0;
  }

  function select(v: TimeRange) {
    onTimeRangeChange?.(v);
  }
</script>

<div class="time-range-picker">
  {#each OPTIONS as opt}
    <button class:active={isActive(opt.value)} onclick={() => select(opt.value)}>{opt.label}</button>
  {/each}
</div>

<style>
  .time-range-picker {
    display: inline-flex;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: normal;
  }
  button {
    background: none;
    border: none;
    padding: 2px 6px;
    border-radius: 4px;
    cursor: pointer;
    color: var(--budgee-text-muted);
  }
  button:hover { color: var(--budgee-text); }
  button.active {
    color: var(--budgee-text);
    font-weight: 600;
    background: var(--budgee-bg);
  }
</style>
