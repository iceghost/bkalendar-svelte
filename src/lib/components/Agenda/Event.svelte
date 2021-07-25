<script lang="ts">
  import Location from 'carbon-icons-svelte/lib/Location16';
  import LocationFilled from 'carbon-icons-svelte/lib/LocationFilled16';

  export let event: AgendaEvent;

  const startTime = event.start.toString({ smallestUnit: 'minute' });
  const endTime = event.end.toString({ smallestUnit: 'minute' });
</script>

<div class="content" class:font-bold={event.upcoming}>
  <span class="-ml-4 text-xs">{startTime}</span>
  <div class="border-l-2 space-y-2" class:border-gray-700={event.upcoming}>
    <p class="ml-2">
      {event.name}
    </p>
    <div class="ml-2 flex items-center justify-end space-x-1">
      <p class="text-xs">{event.room}</p>
      {#if event.upcoming}
        <LocationFilled />
      {:else}
        <Location />
      {/if}
    </div>
  </div>
  <span class="-ml-4 text-xs">{endTime}</span>
</div>
