<script lang="ts">
  import MenuIcon from 'carbon-icons-svelte/lib/Menu32';
  import CloseOutline from 'carbon-icons-svelte/lib/CloseOutline32';

  import { scale } from 'svelte/transition';

  export let open: boolean;
</script>

{#key open}
  <button
    on:click={() => (open = !open)}
    in:scale={{ delay: 250 }}
    out:scale|local={{ duration: 200 }}
  >
    {#if !open}
      <MenuIcon />
    {:else}
      <CloseOutline />
    {/if}
  </button>
{/key}
