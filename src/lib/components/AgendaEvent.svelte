<script lang="ts">
  import Location from 'carbon-icons-svelte/lib/Location16';
  import Time from 'carbon-icons-svelte/lib/Time16';

  export let event: AgendaEvent;
</script>

<div class="space-y-3">
  <p class:text-blue-700={event.upcoming}>
    {event.name}
  </p>
  <div class="flex items-center space-x-1 text-gray-600">
    <Time />
    <p class="text-xs tabular-nums">
      {event.start.toString({ smallestUnit: 'minute' })}–{event.end.toString({
        smallestUnit: 'minute',
      })}
    </p>
  </div>
  <div class="flex items-center space-x-1 text-gray-600">
    <Location />
    <p class="text-xs">{event.room}</p>
  </div>
</div>
