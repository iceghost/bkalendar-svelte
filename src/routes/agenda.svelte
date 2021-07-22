<script context="module" lang="ts">
  import { get } from 'svelte/store';
  import { timetable } from '$lib/stores/timetable';

  export const ssr = false;

  export const load: import('@sveltejs/kit').Load = ({ page, fetch, session, context }) => {
    if (get(timetable) === undefined)
      return {
        status: 300,
        redirect: '/agenda/input',
      };
    return {
      status: 200,
    };
  };
</script>

<script lang="ts">
  import Title from '$lib/components/Title.svelte';
  import ClassOfDay from '$lib/components/AgendaEvent.svelte';
  import WeekPicker from '$lib/components/WeekPicker.svelte';

  import { weekSelected, now } from '$lib/stores/date';
  import { agenda } from '$lib/stores/agenda';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';

  import Edit from 'carbon-icons-svelte/lib/Edit32';
  import CalendarHeatmap from 'carbon-icons-svelte/lib/CalendarHeatMap32';
  import Sun from 'carbon-icons-svelte/lib/Sun16';
  import Asleep from 'carbon-icons-svelte/lib/Asleep16';
  import AsleepFilled from 'carbon-icons-svelte/lib/AsleepFilled16';

  let openPicker = false;

  $: isThisWeek = $now.year === $weekSelected.year && $now.weekOfYear === $weekSelected.weekOfYear;
</script>

<svelte:head>
  <title>Xem lịch | BKalendar</title>
</svelte:head>

<div class="sticky top-0">
  <div class="bg-white p-4 space-y-4">
    <div class="flex w-full justify-between">
      <button on:click={() => goto('/agenda/input')}>
        <Edit />
      </button>
      <button on:click={() => (openPicker = !openPicker)}>
        <CalendarHeatmap />
      </button>
    </div>
    <h1 class="text-4xl font-semibold">Tuần này</h1>
  </div>

  <!-- Week picker -->
  {#if openPicker}
    <div
      class="absolute inset-0 h-screen bg-gray-500/50"
      on:click={() => (openPicker = !openPicker)}
      transition:fade
    >
      <WeekPicker />
    </div>
  {/if}
</div>

<!-- View weekdays -->
{#each $agenda as weekdayEvents, i}
  <div class="flex p-4 space-x-6" class:bg-gray-50={isThisWeek && $now.dayOfWeek === i + 1}>
    <Title date={$weekSelected.add({ days: i })} weekday={i} />
    {#if weekdayEvents.length === 0}
      <p class="text-gray-400 font-thin">Hôm nay không có môn nào hết</p>
    {:else}
      <div class="flex-1 space-y-1">
        <Sun class="-ml-2 text-gray-400" />
        <div role="separator" class="h-8 border-l-2 border-gray-200 border-dotted" />
        {#each weekdayEvents as event}
          <ClassOfDay {event} />
          <div role="separator" class="h-8 border-l-2 border-gray-200 border-dotted" />
        {/each}
        {#if !weekdayEvents.some((event) => event.upcoming) && isThisWeek && $now.dayOfWeek === i + 1}
          <div class="flex items-center space-x-1">
            <AsleepFilled class="-ml-2 text-gray-800" />
            <span class="text-xs text-gray-400">\ngủ ngon nhé uwu/</span>
          </div>
        {:else}
          <Asleep class="-ml-2 text-gray-400" />
        {/if}
      </div>
    {/if}
  </div>
{/each}
