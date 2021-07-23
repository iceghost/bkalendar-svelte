import { derived, writable } from 'svelte/store';
import { Temporal } from '@js-temporal/polyfill';
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

export const upcomingEvent = derived(
  [agenda, hasNotifications],
  async ([$agenda, $hasNotifications]) => {
    const event = $agenda.map((weekday) => weekday.find(({ upcoming }) => upcoming)).find(Boolean);

    if (event && $hasNotifications) {
      const timestamp = event.date
        .toPlainDateTime(event.start)
        .subtract({ minutes: 24 })
        .since(new Temporal.PlainDateTime(1970, 1, 1))
        .round({ smallestUnit: 'millisecond', largestUnit: 'millisecond' }).milliseconds;
      const res = await navigator.serviceWorker.ready;
      const notifications = await res.getNotifications();
      if (!notifications.some((notification) => notification.tag === timestamp.toString()))
        navigator.serviceWorker.controller?.postMessage({
          title: event.name,
          body: `Bạn có môn ${event.name} vào lúc ${event.start.toString({
            smallestUnit: 'minute',
          })} tại phòng ${event.room}`,
          timestamp,
          tag: timestamp.toString(),
        });
    }
    return event;
  },
);
