<script context="module" lang="ts">
  export const ssr = false;
</script>

<script lang="ts">
  import AppBarInput from '$lib/components/AppBarInput.svelte';
  import Textarea from '$lib/components/Input/Textarea.svelte';
  import Buttons from '$lib/components/Input/Buttons.svelte';

  import { timetable } from '$lib/stores/timetable';

  import { fly } from 'svelte/transition';

  let raw = '';
  let status: boolean | undefined;
</script>

<svelte:head>
  <title>Nhập dữ liệu | BKalendar</title>
</svelte:head>

<AppBarInput />

<form class="w-full max-w-xl px-4" on:submit|preventDefault>
  <p>Copy thời khóa biểu từ stinfo rồi paste qua đây nhé!</p>
  <Textarea bind:status bind:raw />
  <div class="flex justify-end w-full space-x-2">
    <Buttons bind:status {raw} />
  </div>

  <!-- Status -->
  {#if status !== undefined}
    <p
      class="text-right mt-2"
      transition:fly|local={{ y: 5 }}
      class:text-red-500={!status}
      class:text-blue-600={status}
    >
      {#if !status}
        Xem lại input...
      {:else}
        Đã đọc được {$timetable?.subjects.length} môn trong tuần
      {/if}
    </p>
  {/if}
</form>
