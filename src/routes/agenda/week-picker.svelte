<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import ChevronLeft32 from 'carbon-icons-svelte/lib/ChevronLeft32';
  import { Temporal } from '@js-temporal/polyfill';
  import { weekSelected } from '$lib/stores/date';
  let firstDay = Temporal.PlainDate.from({
    year: $weekSelected.year,
    month: $weekSelected.month,
    day: 1,
  });
  let lastDay: Temporal.PlainDate;
  let firstWeek: Temporal.PlainDate;
  let lastWeek: Temporal.PlainDate;
  $: {
    firstDay = firstDay.subtract({ days: firstDay.day - 1 });
    firstWeek = firstDay.subtract({ days: firstDay.dayOfWeek - 1 });
    lastDay = firstDay.add({
      days: firstDay.daysInMonth - 1,
    });
    lastWeek = lastDay.subtract({ days: lastDay.dayOfWeek - 1 });
  }
</script>

<div class="sticky top-0 bg-white p-8 space-y-8">
  <div class="flex w-full justify-between">
    <button on:click={() => goto('/agenda')}>
      <ChevronLeft32 />
    </button>
  </div>
  <h1 class="text-4xl font-semibold">
    <span class="text-gray-300 font-thin">Tuần</span>
    này
  </h1>
</div>

<span>Tháng {firstDay.month} năm {firstDay.year}</span>
<button on:click={() => (firstDay = firstDay.add({ days: firstDay.daysInMonth }))}>Thêm</button>
<button on:click={() => (firstDay = firstDay.subtract({ days: 1 }))}>Giảm</button>
<div class="grid grid-cols-8 px-4">
  <span>Tuần</span>
  <span>Mo</span>
  <span>Tu</span>
  <span>We</span>
  <span>Th</span>
  <span>Fr</span>
  <span>Sa</span>
  <span>Su</span>
</div>
<div class="grid grid-cols-8 px-4 gap-2">
  {#each [...Array(firstWeek.until(lastWeek, {
        largestUnit: 'week',
      }).weeks + 1).keys()].map((offset) => firstWeek.add({ weeks: offset })) as date}
    <div
      class="contents"
      on:click={() => {
        $weekSelected = date;
      }}
    >
      <span class:bg-gray-500={Temporal.PlainDate.compare($weekSelected, date) === 0}>
        {date.weekOfYear}
      </span>
      {#each [0, 1, 2, 3, 4, 5, 6].map((offset) => date.add({ days: offset })) as weekday}
        <span class:text-gray-300={weekday.month !== firstDay.month}>{weekday.day}</span>
      {/each}
    </div>
  {/each}
</div>
