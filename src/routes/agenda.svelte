<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import Title from '$lib/components/Title.svelte';
  import ClassOfDay from '$lib/components/ClassOfDay.svelte';
  import WeekPicker from '$lib/components/WeekPicker.svelte';

  import { timetable } from '$lib/stores/timetable';
  import { weekSelected, now } from '$lib/stores/date';
  import { fade } from 'svelte/transition';

  import Menu32 from 'carbon-icons-svelte/lib/Menu32';
  import Calendar32 from 'carbon-icons-svelte/lib/Calendar32';

  $: thisWeekAgenda = $timetable.subjects.filter(
    (subject) => subject.weeks.indexOf($weekSelected.weekOfYear) >= 0,
  );

  let openPicker = false;
</script>

<div class="sticky top-0">
  <div class="bg-white p-4 space-y-4">
    <div class="flex w-full justify-between">
      <Menu32 />
      <button on:click={() => (openPicker = !openPicker)}>
        <Calendar32 />
      </button>
    </div>
    <h1 class="text-4xl font-semibold">
      <span class="text-gray-300 font-thin">Tuần</span>
      này
    </h1>
  </div>
  {#if openPicker}
    <div
      class="absolute inset-0 h-screen bg-gray-500/50 flex items-center justify-center"
      on:click={() => (openPicker = !openPicker)}
      transition:fade
    >
      <WeekPicker />
    </div>
  {/if}
</div>

<!-- View weekdays -->
{#each ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as weekday, i}
  <div class="flex p-4 space-x-4" class:bg-gray-100={$now.dayOfWeek === i + 1}>
    <Title date={$weekSelected.add({ days: i })} {weekday} />
    <div class="space-y-8">
      {#if !thisWeekAgenda.some((subject) => subject.weekday === i + 2)}
        <p class="text-gray-400 font-thin">Hôm nay không có môn nào hết</p>
      {:else}
        {#each thisWeekAgenda.filter((subject) => subject.weekday === i + 2) as subject}
          <ClassOfDay {subject} />
        {/each}
      {/if}
    </div>
  </div>
{/each}
