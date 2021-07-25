<script lang="ts">
  import ButtonEdit from '$lib/components/Menu/ButtonEdit.svelte';
  import ButtonNotification from '$lib/components/Menu/ButtonNotification.svelte';
  import ButtonExport from '$lib/components/Menu/ButtonExport.svelte';

  import { fly } from 'svelte/transition';

  export let open = false;
</script>

{#if open}
  <div
    class="absolute top-14 inset-x-0 h-screen"
    on:click={() => (open = !open)}
    in:fly={{ y: -10 }}
    out:fly|local={{ y: -10, duration: 100 }}
  >
    <div class="shadow-md bg-white" on:click|stopPropagation>
      <ButtonEdit />
      <ButtonNotification />
      <ButtonExport />
    </div>
  </div>
{/if}
