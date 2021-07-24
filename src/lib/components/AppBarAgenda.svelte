<script lang="ts">
  import WeekPicker from '$lib/components/WeekPicker.svelte';
  import AppBar from '$lib/components/AppBar.svelte';
  import Menu from '$lib/components/Menu.svelte';

  import { fade, fly, scale } from 'svelte/transition';

  import MenuIcon from 'carbon-icons-svelte/lib/Menu32';

  import CloseOutline from 'carbon-icons-svelte/lib/CloseOutline32';
  import CalendarHeatmap from 'carbon-icons-svelte/lib/CalendarHeatMap32';

  let openPicker = false;
  let openMenu = false;
</script>

<AppBar title="Tuần này">
  <div slot="left-button" class="relative h-8 w-8">
    <!-- These transitions won't affect page transition -->
    {#if !openMenu}
      <button
        on:click={() => (openMenu = !openMenu)}
        in:scale={{ delay: 250 }}
        out:scale|local={{ duration: 200 }}
      >
        <MenuIcon />
      </button>
    {:else}
      <button
        on:click={() => (openMenu = !openMenu)}
        in:scale={{ delay: 250 }}
        out:scale|local={{ duration: 200 }}
      >
        <CloseOutline />
      </button>
    {/if}
  </div>
  <button slot="right-button" on:click={() => (openPicker = !openPicker)}>
    <CalendarHeatmap />
  </button>

  <div slot="other-stuff">
    <!-- Menu -->
    {#if openMenu}
      <div
        class="absolute top-14 inset-x-0 h-screen"
        on:click={(e) => (openMenu = !openMenu)}
        in:fly={{ y: -10 }}
        out:fly={{ y: -10, duration: 100 }}
      >
        <Menu />
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
</AppBar>
