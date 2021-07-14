<script lang="ts">
  import { goto } from '$app/navigation';
  import { flip } from 'svelte/animate';
  import { fade, fly } from 'svelte/transition';
  import ChevronLeft32 from 'carbon-icons-svelte/lib/ChevronLeft32';
  let curW = 32;
</script>

<div class="sticky top-0 bg-white p-8 space-y-8">
  <div class="flex w-full justify-between">
    <button on:click={() => goto('/agenda')}>
      <ChevronLeft32 />
    </button>
  </div>
  <h1 class="text-4xl font-semibold">
    <span class="text-gray-300 font-thin">Tuần</span>
    này
  </h1>
</div>

<div class="grid grid-cols-9 px-8">
  <span class="col-span-2">Tuần</span>
  <span>Mo</span>
  <span>Tu</span>
  <span>We</span>
  <span>Th</span>
  <span>Fr</span>
  <span>Sa</span>
  <span>Su</span>
</div>
<div
  on:wheel={(e) => {
    e.deltaY < 0 ? curW-- : curW++;
  }}
  class="px-8"
>
  {#each [curW - 2, curW - 1, curW, curW + 1, curW + 2] as week (week)}
    <div
      class="grid grid-cols-9"
      class:bg-gray-50={week === curW}
      animate:flip={{ duration: 300 }}
      in:fade|local={{ duration: 300 }}
      out:fade|local={{ duration: 300 }}
      on:click={() => (curW = week)}
    >
      <span class="col-span-2">{week}</span>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <span>7</span>
    </div>
  {/each}
</div>
<button on:click={() => curW++}>Add</button>
