<script context="module" lang="ts">
  export const ssr = false;
</script>

<script lang="ts">
  import Title from '$lib/components/Title.svelte';
  import ClassOfDay from '$lib/components/AgendaEvent.svelte';
  import WeekPicker from '$lib/components/WeekPicker.svelte';

  import { weekSelected, now } from '$lib/stores/date';
  import { agenda } from '$lib/stores/agenda';
  import { hasNotifications } from '$lib/stores/notifications';
  import { timetable } from '$lib/stores/timetable';
  import { fade, fly, scale } from 'svelte/transition';
  import { goto } from '$app/navigation';

  import Menu from 'carbon-icons-svelte/lib/Menu32';
  import Edit from 'carbon-icons-svelte/lib/Edit32';
  import Export from 'carbon-icons-svelte/lib/Export32';
  import Notification from 'carbon-icons-svelte/lib/Notification32';
  import NotificationOff from 'carbon-icons-svelte/lib/NotificationOff32';
  import CloseOutline from 'carbon-icons-svelte/lib/CloseOutline32';
  import CalendarHeatmap from 'carbon-icons-svelte/lib/CalendarHeatMap32';
  import Sun from 'carbon-icons-svelte/lib/Sun16';
  import Asleep from 'carbon-icons-svelte/lib/Asleep16';
  import AsleepFilled from 'carbon-icons-svelte/lib/AsleepFilled16';

  let openPicker = false;
  let openMenu = false;

  $: isThisWeek = $now.year === $weekSelected.year && $now.weekOfYear === $weekSelected.weekOfYear;
</script>

<svelte:head>
  <title>Xem lịch | BKalendar</title>
</svelte:head>

<div class="sticky top-0">
  <div class="bg-white p-4 space-y-4">
    <div class="flex w-full justify-between">
      {#if !openMenu}
        <button on:click={() => (openMenu = !openMenu)} in:scale={{ delay: 200 }} out:scale|local>
          <Menu />
        </button>
      {:else}
        <br />
      {/if}
      <button on:click={() => (openPicker = !openPicker)}>
        <CalendarHeatmap />
      </button>
    </div>
    <h1 class="text-4xl font-semibold">Tuần này</h1>
  </div>
  <!-- Menu -->
  {#if openMenu}
    <div class="absolute top-0 inset-x-0 h-screen" on:click={(e) => (openMenu = !openMenu)}>
      <div class="shadow-md bg-white" on:click|stopPropagation transition:fly={{ y: -10 }}>
        <button
          class="bg-white px-4 pt-4 pb-2"
          on:click={() => (openMenu = !openMenu)}
          in:scale={{ delay: 100 }}
          out:scale
        >
          <CloseOutline />
        </button>
        <a class="flex items-center px-4 py-2" href="/input">
          <Edit class="mr-2" />
          Chỉnh sửa thời khóa biểu
        </a>
        {#if $hasNotifications}
          <button
            class="flex items-center px-4 py-2 w-full"
            on:click={() => hasNotifications.off()}
          >
            <Notification class="mr-2" />
            Tắt thông báo
          </button>
        {:else}
          <button class="flex items-center px-4 py-2 w-full" on:click={() => hasNotifications.on()}>
            <NotificationOff class="mr-2" />
            Bật thông báo
          </button>
        {/if}
        <button class="flex items-center px-4 py-2 pb-4 w-full">
          <Export class="mr-2" />
          Xuất file .ical
        </button>
      </div>
    </div>
  {/if}

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

{#if $timetable === undefined}
  Loading...
{:else if $timetable === null}
  {#await goto('/input')}
    Chuyển trang...
  {:then _}
    Chuyển trang thành công
  {/await}
{/if}

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
