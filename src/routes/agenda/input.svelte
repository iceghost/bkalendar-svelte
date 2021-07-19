<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { timetable } from '$lib/stores/timetable';

  import Menu32 from 'carbon-icons-svelte/lib/Menu32';
  import ArrowLeft32 from 'carbon-icons-svelte/lib/ArrowLeft20';
  import DataTableReference20 from 'carbon-icons-svelte/lib/DataTableReference20';
  import { goto } from '$app/navigation';
  import { fly } from 'svelte/transition';

  let raw = '';
  let status: boolean | undefined;

  $: status = raw !== raw || undefined;
</script>

<div class="sticky top-0">
  <div class="bg-white p-4 space-y-4">
    <div class="flex w-full justify-between">
      <Menu32 />
    </div>
    <h1 class="text-4xl font-semibold leading-none">Nhập dữ liệu</h1>
    <p>Copy thời khóa biểu từ stinfo rồi paste qua đây nhé!</p>
  </div>
</div>

<form class="w-full max-w-xl px-4" on:submit|preventDefault>
  <label>
    <span class="text-sm text-gray-400">Nhập thời khóa biểu</span>
    <textarea
      class="w-full h-32 bg-gray-100 border-white border-b-gray-500"
      class:bg-red-50={status === false}
      class:border-b-red-500={status === false}
      class:bg-blue-50={status === true}
      class:border-b-blue-500={status === true}
      bind:value={raw}
    />
  </label>
  <div class="flex justify-end w-full space-x-2">
    <button
      class="btn btn-secondary transition-colors delay-100 duration-500"
      class:btn-disabled={!$timetable}
      on:click={() => goto('/agenda')}
      disabled={!$timetable}
    >
      <ArrowLeft32 class="mr-2" />
      Trang chính
    </button>
    <button class="btn btn-primary" on:click={() => (status = timetable.feed(raw))}>
      <DataTableReference20 class="mr-2" />
      Đọc
    </button>
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

<style lang="postcss">
  .btn {
    @apply mt-2 px-2 py-1 flex items-center rounded-md;
  }

  .btn-primary {
    @apply bg-blue-700 text-white;
  }

  .btn-secondary {
    @apply bg-blue-50 text-blue-700;
  }

  .btn-disabled {
    @apply bg-gray-50 text-gray-300 hover:cursor-not-allowed;
  }
</style>
