<script lang="ts">
  import type { Temporal } from '@js-temporal/polyfill';
  export let date: Temporal.PlainDate;
  export let weekday: number;

  const toString = ["M", "T", "W", "T", "F", "S", "S"];
</script>

<div class="text-center w-12 flex-shrink-0">
  <h2 class="text-4xl font-bold">{toString[weekday]}</h2>
  <p class="text-gray-400">
    <span class="text-gray-800">
      {date.day}
    </span>
    .
    {date.month}
  </p>
</div>
