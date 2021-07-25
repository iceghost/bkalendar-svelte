<script>
  export let secondary = false;
  export let primary = true;
</script>

<button
  class="btn transition-colors delay-500 duration-500"
  class:btn-secondary={secondary}
  class:btn-primary={primary}
  on:click
  disabled={!secondary && !primary}
>
  <slot />
</button>

<style lang="postcss">
  .btn {
    @apply mt-2 px-2 py-1 flex items-center rounded-md;
  }

  .btn-primary {
    @apply bg-blue-700 text-white;
  }

  .btn-secondary {
    @apply bg-blue-50 text-blue-700;
  }

  .btn:disabled {
    @apply bg-gray-50 text-gray-300 cursor-not-allowed;
  }
</style>
