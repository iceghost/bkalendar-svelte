<script lang="ts">
  import Button from './Button.svelte';
  import Edit from 'carbon-icons-svelte/lib/Edit32';
  import { goto } from '$app/navigation';
</script>

<Button on:click={() => goto('/input', { noscroll: true })}>
  <Edit class="mr-2" />
  Chỉnh sửa thời khóa biểu
</Button>
