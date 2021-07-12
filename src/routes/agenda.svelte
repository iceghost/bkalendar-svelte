<script context="module">
  export const ssr = false;
</script>

<script lang="ts">
  import { parse } from '$lib/Subject';
  let raw: string = '';

  let parseResult = JSON.parse(localStorage.getItem('agenda-data') || '[]');
  $: localStorage.setItem('agenda-data', JSON.stringify(parseResult));
</script>

<form class="w-full max-w-xl m-auto" on:submit|preventDefault>
  <textarea class="w-full" bind:value={raw} />
  <button
    class="border px-3 py-1"
    on:click={() => {
      parseResult = parse(raw);
    }}
  >
    Đọc
  </button>
  <p>Đã đọc được {parseResult.length} môn</p>
</form>
