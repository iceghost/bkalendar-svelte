<script lang="ts">
  import { timetable } from '$lib/stores/timetable';
  import Button from './Button.svelte';

  import { goto } from '$app/navigation';

  import ArrowLeft from 'carbon-icons-svelte/lib/ArrowLeft20';
  import DataTableReference from 'carbon-icons-svelte/lib/DataTableReference20';

  export let status: boolean | undefined;
  export let raw: string;
</script>

<Button
  primary={!!$timetable && status}
  secondary={!!$timetable && !status}
  on:click={() => goto('/agenda')}
>
  <ArrowLeft class="mr-2" />
  Trang chính
</Button>

<Button
  primary={!status}
  secondary={!!$timetable && status}
  on:click={() => (status = timetable.feed(raw))}
>
  <DataTableReference class="mr-2" />
  Đọc
</Button>
