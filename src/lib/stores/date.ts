import { writable, readable, derived, get } from 'svelte/store';
import { timetable } from './timetable';
import { Temporal } from '@js-temporal/polyfill';

export const now = readable<Temporal.PlainDateTime>(Temporal.now.plainDateTimeISO(), (set) => {
  const interval = setInterval(() => set(Temporal.now.plainDateTimeISO()), 60000);

  return clearInterval(interval);
});

export const weekSelected = writable<Temporal.PlainDate>(
  get(now)
    .toPlainDate()
    .subtract({ days: get(now).dayOfWeek - 1 }),
);
