import { Temporal } from '@js-temporal/polyfill';
import { derived, Readable } from 'svelte/store';
import { now, weekSelected } from './date';
import { timetable } from './timetable';

export const agenda: Readable<AgendaEvent[]> = derived(
  [timetable, now, weekSelected],
  ([$timetable, $now, $weekSelected]) => {
    if ($timetable === undefined) return [];
    const monday = $weekSelected;
    const subjects = $timetable.subjects.filter(
      (subject) => subject.weeks.indexOf($weekSelected.weekOfYear) >= 0,
    );
    let found = false;
    return subjects.map(function callback({ name, room, start, end, weekday }) {
      const date = monday.add({ days: weekday - 2 });
      const startTime = Temporal.PlainTime.from({ hour: start + 5, minute: 0 });
      const endTime = Temporal.PlainTime.from({ hour: end + 5, minute: 50 });
      const upcoming = Temporal.PlainDateTime.compare($now, date.toPlainDateTime(endTime)) === -1;
      return {
        name,
        room,
        date,
        start: startTime,
        end: endTime,
        upcoming: !upcoming || found ? undefined : (found = true),
      };
    });
  },
);
