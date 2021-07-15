<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { getWeek } from '$lib/date';
  import { goto } from '$app/navigation';
  import { timetable } from '$lib/stores/timetable';

  import Location16 from 'carbon-icons-svelte/lib/Location16';
  import Time16 from 'carbon-icons-svelte/lib/Time16';
  import Menu32 from 'carbon-icons-svelte/lib/Menu32';
  import Calendar32 from 'carbon-icons-svelte/lib/Calendar32';

  let currentWeek = getWeek(new Date());
  let today = new Date();

  let thisWeekAgenda: Subject[] = [];

  // Get week limits
  let weeks = $timetable.subjects.map((subject) => subject.weeks).flat();
  let [minWeek, maxWeek] = [Math.min(...weeks), Math.max(...weeks)];
  $: {
    if (currentWeek < minWeek) currentWeek = minWeek;
    else if (currentWeek > maxWeek) currentWeek = maxWeek;
    thisWeekAgenda = $timetable.subjects.filter(
      (subject) => subject.weeks.indexOf(currentWeek) >= 0,
    );
  }
</script>

<div class="sticky top-0 bg-white p-8 space-y-8">
  <div class="flex w-full justify-between">
    <Menu32 />
    <button on:click={() => goto('/agenda/week-picker')}>
      <Calendar32 />
    </button>
  </div>
  <h1 class="text-4xl font-semibold">
    <span class="text-gray-300 font-thin">Tuần</span>
    này
  </h1>
</div>
{#each ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as weekday, i}
  <div class="flex p-8 space-x-8" class:bg-gray-100={i - today.getDay() + 1 === 0}>
    <div class="text-center w-12 flex-shrink-0">
      <h2 class="text-4xl font-bold">{weekday}</h2>
      <p class="text-gray-400">
        <span class="text-gray-800">
          {new Date(today.getTime() + (i - today.getDay() + 1) * 864e5).getDate()}
        </span>
        .
        {new Date(today.getTime() + (i - today.getDay() + 1) * 864e5).getMonth() + 1}
      </p>
    </div>
    <div class="space-y-8">
      {#if !thisWeekAgenda.some((subject) => subject.weekday === i + 2)}
        <p class="text-gray-400 font-thin">Hôm nay không có môn nào hết</p>
      {:else}
        {#each thisWeekAgenda.filter((subject) => subject.weekday === i + 2) as { name, start, end, room }}
          <div class="space-y-3">
            <p>{name}</p>
            <div class="flex items-center space-x-1 text-gray-600">
              <Time16 />
              <p class="text-xs">{start + 5}:00–{end + 5}:50</p>
            </div>
            <div class="flex items-center space-x-1 text-gray-600">
              <Location16 />
              <p class="text-xs">{room}</p>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
{/each}
