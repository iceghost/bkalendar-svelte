import { writable } from 'svelte/store';
import { Temporal } from '@js-temporal/polyfill';

function parse(raw: string): Timetable | null {
  // first line: Học kỳ 2 Năm học 2020 - 2021
  const lines = raw.split('\n');
  const pos = lines.findIndex((line) => /^Học kỳ \d Năm học \d+ - \d+/g.test(line));
  const [, , rawSemester, , , rawYearFrom] = lines[pos].split(' ');
  const semester = parseInt(rawSemester);
  const yearFrom = parseInt(rawYearFrom);
  let weekFrom = NaN;

  const subjects = lines
    .slice(pos)
    .map((line) => {
      const [id, name, , , group, rawWeekday, rawPeriods, , room, , rawWeeks] = line.split('\t');

      // can't use split if those are undefined
      if (!rawWeekday || !rawPeriods || !rawWeeks) return null;

      const weekday = parseInt(rawWeekday);
      // prettier-ignore
      const [start, end] = rawPeriods
        .split('-')
        .map((raw) => parseInt(raw));
      const weeks = rawWeeks
        .split('|')
        .map((raw, i) => {
          if (!weekFrom) {
            weekFrom = parseInt(raw) - i;
          }
          return parseInt(raw);
        })
        .filter(Boolean);

      // if parseInt unsuccessful
      if (!weekday || !start || !end || !weeks) return null;

      return { id, name, group, weekday, start, end, room, weeks };
    })
    .filter((e): e is Subject => Boolean(e));

  if (!semester || !yearFrom || !weekFrom || !subjects) return null;

  console.log(weekFrom);

  let firstDate = Temporal.PlainDate.from({
    year: semester === 1 ? yearFrom : yearFrom + 1,
    month: 1,
    day: 4,
  });
  firstDate = firstDate.subtract({ days: firstDate.dayOfWeek - 1 }).add({ weeks: weekFrom - 1 });

  return {
    firstDate,
    subjects,
  };
}

function createTimetable() {
  const { subscribe, set } = writable<Timetable>(undefined, (set) => {
    const serialized = localStorage.getItem('timetable-data');
    if (serialized)
      set(
        JSON.parse(serialized, (key, value) => {
          if (key === 'firstDate') {
            return Temporal.PlainDate.from(value);
          }
          return value;
        }),
      );
  });

  function feed(raw: string, set: (value: Timetable) => void): boolean {
    const result = parse(raw);
    if (result) {
      set(result);
      localStorage.setItem('timetable-data', JSON.stringify(result));
      return true;
    }
    return false;
  }

  return {
    subscribe,
    feed: (raw: string) => feed(raw, set),
  };
}

export const timetable = createTimetable();
