<script lang="ts">
  export let raw: string;
  export let status: boolean | undefined;

  // Reset status to undefined when raw change
  $: status = raw !== raw || undefined;
</script>

<label>
  <span class="text-sm text-gray-400">Nhập thời khóa biểu</span>
  <textarea
    class="w-full h-32 bg-gray-100 border-white border-b-gray-500"
    class:valid={status === true}
    class:invalid={status === false}
    bind:value={raw}
  />
</label>

<style lang="postcss">
  .valid {
    @apply bg-blue-50 border-b-blue-500;
  }

  .invalid {
    @apply bg-red-50 border-b-red-500;
  }
</style>
