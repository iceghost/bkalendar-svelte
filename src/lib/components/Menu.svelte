<script lang="ts">
  import ButtonEdit from '$lib/components/Menu/ButtonEdit.svelte';
  import ButtonNotification from '$lib/components/Menu/ButtonNotification.svelte';
  import ButtonExport from '$lib/components/Menu/ButtonExport.svelte';
</script>

<div class="shadow-md bg-white" on:click|stopPropagation>
  <ButtonEdit />
  <ButtonNotification />
  <ButtonExport />
</div>
