<script lang="ts">
  import { Temporal } from '@js-temporal/polyfill';
  import { weekSelected } from '$lib/stores/date';

  import ChevronLeft24 from 'carbon-icons-svelte/lib/ChevronLeft24';
  import ChevronRight24 from 'carbon-icons-svelte/lib/ChevronRight24';

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

<div
  class="bg-white w-full max-w-sm rounded-lg mx-2 px-3 py-4"
  on:click|stopPropagation
>
  <div class="flex justify-between items-center">
    <button class="p-2" on:click={() => (firstDay = firstDay.subtract({ days: 1 }))}>
      <ChevronLeft24 />
    </button>
    <span class="font-bold">Tháng {firstDay.month}</span>
    <button class="p-2" on:click={() => (firstDay = firstDay.add({ days: firstDay.daysInMonth }))}>
      <ChevronRight24 />
    </button>
  </div>

  <div class="grid grid-cols-[4.5ch,repeat(7,minmax(0,1fr))] gap-2">
    <div class="contents text-gray-300 font-bold text-sm text-center align-bottom">
      <span>Tuần</span>
      <span>T2</span>
      <span>T3</span>
      <span>T4</span>
      <span>T5</span>
      <span>T6</span>
      <span>T7</span>
      <span>CN</span>
    </div>
    {#each [...Array(firstWeek.until(lastWeek, {
          largestUnit: 'week',
        }).weeks + 1).keys()].map((offset) => firstWeek.add({ weeks: offset })) as date}
      <div
        class="contents"
        on:click={() => {
          $weekSelected = date;
        }}
      >
        <span
          class="bg-gray-100 flex items-center justify-center rounded-r-md"
          class:bg-blue-300={Temporal.PlainDate.compare($weekSelected, date) === 0}
          class:text-blue-900={Temporal.PlainDate.compare($weekSelected, date) === 0}
        >
          {date.weekOfYear}
        </span>
        {#each [0, 1, 2, 3, 4, 5, 6].map((offset) => date.add({ days: offset })) as weekday}
          <div
            class="bg-gray-50 rounded-md aspect-w-1 aspect-h-1"
            class:text-gray-300={weekday.month !== firstDay.month}
            class:bg-blue-100={Temporal.PlainDate.compare($weekSelected, date) === 0}
            class:text-blue-500={Temporal.PlainDate.compare($weekSelected, date) === 0}
          >
            <span class="flex items-center justify-center">{weekday.day}</span>
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>
