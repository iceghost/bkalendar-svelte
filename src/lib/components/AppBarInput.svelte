<script context="module" lang="ts">
  export const ssr = false;
</script>

<script lang="ts">
  import { timetable } from '$lib/stores/timetable';

  import Home from 'carbon-icons-svelte/lib/Home32';
  import AppBar from '$lib/components/AppBar.svelte';

  import { goto } from '$app/navigation';
</script>

<AppBar title="Nhập dữ liệu">
  <button
    slot="left-button"
    class="transition-colors delay-500 duration-500"
    on:click={() => goto('/agenda')}
    disabled={!$timetable}
    class:text-gray-300={!$timetable}
  >
    <Home />
  </button>
</AppBar>
