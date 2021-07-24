<script lang="ts">
  import Button from './Button.svelte';
  import Notification from 'carbon-icons-svelte/lib/Notification32';
  import NotificationOff from 'carbon-icons-svelte/lib/NotificationOff32';

  import { hasNotifications } from '$lib/stores/notifications';
</script>

{#if $hasNotifications}
  <Button on:click={() => hasNotifications.off()}>
    <Notification class="mr-2" />
    Tắt thông báo
  </Button>
{:else}
  <Button on:click={() => hasNotifications.on()}>
    <NotificationOff class="mr-2" />
    Bật thông báo
  </Button>
{/if}
