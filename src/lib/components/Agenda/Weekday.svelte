<script lang="ts">
  import Title from '$lib/components/Title.svelte';
  import Event from './Event.svelte';

  import { weekSelected, now } from '$lib/stores/date';

  import Sun from 'carbon-icons-svelte/lib/Sun16';
  import Asleep from 'carbon-icons-svelte/lib/Asleep16';
  import AsleepFilled from 'carbon-icons-svelte/lib/AsleepFilled16';

  export let events: AgendaEvent[];
  export let i: number;

  $: isThisWeek = $now.year === $weekSelected.year && $now.weekOfYear === $weekSelected.weekOfYear;
</script>

<div class="flex p-4 space-x-6" class:bg-gray-50={isThisWeek && $now.dayOfWeek === i + 1}>
  <Title date={$weekSelected.add({ days: i })} weekday={i} />

  {#if events.length === 0}
    <p class="text-gray-400 font-thin">Hôm nay không có môn nào hết</p>
  {:else}
    <div class="flex-1 space-y-1">
      <Sun class="-ml-2 text-gray-400" />
      <div class="separator" />
      {#each events as event}
        <Event {event} />
        <div class="separator" />
      {/each}
      {#if !events.some((event) => event.upcoming) && isThisWeek && $now.dayOfWeek === i + 1}
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

<style lang="postcss">
  .separator {
    @apply h-8 border-l-2 border-gray-200 border-dotted;
  }
</style>
