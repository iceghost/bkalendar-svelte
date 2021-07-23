<script>
  import { upcomingEvent } from '$lib/stores/notifications';
  import '../app.postcss';

  $upcomingEvent;
</script>

<div class="flex flex-col w-full font-ibm">
  <slot />
</div>
