import { derived, writable } from 'svelte/store';
import { agenda } from './agenda';

function createNotifications() {
  const { subscribe, set } = writable(false, (set) => {
    if (Notification.permission === 'granted') return set(true);
    set(false);
  });

  return {
    subscribe,
    on: async () => {
      if (Notification.permission === 'granted') return set(true);
      if ((await Notification.requestPermission()) === 'granted') return set(true);
      throw '[Notification] Request permission failed';
    },
    off: () => set(false),
  };
}

export const hasNotifications = createNotifications();


