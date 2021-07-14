<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { timetable } from '$lib/stores/timetable';
  let raw: string = '';
  let status: boolean;
</script>

<form class="w-full max-w-xl m-auto" on:submit|preventDefault>
  <textarea class="w-full" bind:value={raw} />
  <button class="border px-3 py-1" on:click={() => (status = timetable.feed(raw))}> Đọc </button>
  {#if status !== undefined}
    {#if !status}
      <span class="text-red-500">Xem lại input...</span>
    {:else}
      <p>Đã đọc được {$timetable?.subjects.length} môn</p>
    {/if}
  {/if}
</form>
