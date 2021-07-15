<script lang="ts">
  import { goto } from '$app/navigation';
  import ChevronLeft32 from 'carbon-icons-svelte/lib/ChevronLeft32';
  import { Temporal } from '@js-temporal/polyfill';
  let month = 7;
  let year = 2021;
  let firstDay: Temporal.PlainDate;
  $: {
    firstDay = Temporal.PlainDate.from({ year, month, day: 1 });
    firstDay = firstDay.subtract({ days: firstDay.dayOfWeek - 1 });
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

<span>Tháng {month}</span>
<button on:click={() => month++}>Thêm</button>
<button on:click={() => month--}>Giảm</button>
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
  {#each [0, 1, 2, 3, 4].map((offset) => firstDay.add({ weeks: offset })) as date}
    <span>{date.weekOfYear}</span>
    {#each [0, 1, 2, 3, 4, 5, 6].map((offset) => date.add({ days: offset })) as weekday}
      <span class:text-gray-300={weekday.month !== month}>{weekday.day}</span>
    {/each}
  {/each}
</div>
