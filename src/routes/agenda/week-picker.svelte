<script lang="ts">
  import { goto } from '$app/navigation';
  import { getWeek } from '$lib/date';
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import ChevronLeft32 from 'carbon-icons-svelte/lib/ChevronLeft32';
  let month = 6;

  let year = 2021;
  let firstDay: Date;
  $: {
    firstDay = new Date(year, month, 1);
    firstDay.setDate(firstDay.getDate() - ((firstDay.getDay() + 6) % 7));
  }
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

<p>{firstDay}</p>
<span>Tháng {month + 1}</span>
<button on:click={() => month++}>Thêm</button>
<button on:click={() => month--}>Giảm</button>
<div class="grid grid-cols-8 px-4">
  <span>Tuần</span>
  <span>Mo</span>
  <span>Tu</span>
  <span>We</span>
  <span>Th</span>
  <span>Fr</span>
  <span>Sa</span>
  <span>Su</span>
</div>
<div class="grid grid-cols-8 px-4 gap-2">
  {#each [0, 1, 2, 3, 4].map((offset) => new Date(firstDay.getTime() + offset * 864e5 * 7)) as date}
    <span out:fade in:fly>{getWeek(date)}</span>
    {#each [0, 1, 2, 3, 4, 5, 6].map((offset2) => new Date(date.getTime() + offset2 * 864e5)) as weekday}
      <span out:fade in:fly
        class:text-gray-300={weekday.getMonth() !== month}
      >{weekday.getDay()}</span>
    {/each}
  {/each}
</div>
