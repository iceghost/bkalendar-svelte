<script lang="ts">
  export let title: string;
</script>

<div class="sticky top-0">
  <div class="bg-white p-4 space-y-4">
    <div class="flex w-full justify-between items-center">
      <slot name="left-button" />
      <slot name="right-button" />
    </div>
    <h1 class="text-4xl font-semibold leading-none">
      {title}
    </h1>
  </div>
  <slot name="other-stuff" />
</div>
