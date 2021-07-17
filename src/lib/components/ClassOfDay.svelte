<script lang="ts">
  import Location16 from 'carbon-icons-svelte/lib/Location16';
  import Time16 from 'carbon-icons-svelte/lib/Time16';

  export let subject: Subject;
</script>

<div class="space-y-3">
  <p>{subject.name}</p>
  <div class="flex items-center space-x-1 text-gray-600">
    <Time16 />
    <p class="text-xs">{subject.start + 5}:00–{subject.end + 5}:50</p>
  </div>
  <div class="flex items-center space-x-1 text-gray-600">
    <Location16 />
    <p class="text-xs">{subject.room}</p>
  </div>
</div>
