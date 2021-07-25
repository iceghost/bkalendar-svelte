<script lang="ts">
  import WeekPicker from '$lib/components/WeekPicker.svelte';
  import AppBar from '$lib/components/AppBar.svelte';
  import Menu from '$lib/components/Menu.svelte';
  import Toggle from '$lib/components/Menu/Toggle.svelte';

  import CalendarHeatmap from 'carbon-icons-svelte/lib/CalendarHeatMap32';

  let openPicker = false;
  let openMenu = false;
</script>

<AppBar title="Tuần này">
  <div slot="left-button" class="relative h-8 w-8">
    <Toggle bind:open={openMenu} />
  </div>

  <button slot="right-button" on:click={() => (openPicker = !openPicker)}>
    <CalendarHeatmap />
  </button>

  <div slot="other-stuff">
    <Menu bind:open={openMenu} />
    <WeekPicker bind:open={openPicker} />
  </div>
</AppBar>
