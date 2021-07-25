<script context="module" lang="ts">
  export const ssr = false;
</script>

<script lang="ts">
  import AppBarAgenda from '$lib/components/AppBarAgenda.svelte';
  import Weekday from '../lib/components/Agenda/Weekday.svelte';

  import { agenda } from '$lib/stores/agenda';
  import { timetable } from '$lib/stores/timetable';
</script>

<svelte:head>
  <title>Xem lịch | BKalendar</title>
</svelte:head>

<AppBarAgenda />

{#if $timetable === undefined}
  Loading...
{:else if $timetable === null}
  Nhập thời khóa biểu đi bạn hiền
{:else}
  <!-- View weekdays -->
  {#each $agenda as events, i}
    <Weekday {events} {i} />
  {/each}
{/if}
