import { writable } from 'svelte/store';
import { getDateFromWeek } from '$lib/date';

function parse(raw: string): Timetable | null {
  // first line: Học kỳ 2 Năm học 2020 - 2021
  const [, , rawSemester, , , rawYearFrom] = raw.split('\n')[0].split(' ');
  const semester = parseInt(rawSemester);
  const yearFrom = parseInt(rawYearFrom);
  let weekFrom: number = NaN;

  const subjects = raw
    .split('\n')
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
          return parseInt(raw) - weekFrom;
        })
        .filter(Boolean);

      // if parseInt unsuccessful
      if (!weekday || !start || !end || !weeks) return null;

      return { id, name, group, weekday, start, end, room, weeks };
    })
    .filter((e): e is Subject => Boolean(e));

  if (!semester || !yearFrom || !weekFrom || !subjects) return null;

  console.log(weekFrom);

  return {
    firstDate: getDateFromWeek(0, weekFrom, semester === 1 ? yearFrom : yearFrom + 1),
    subjects,
  };
}

function createTimetable() {
  const { subscribe, set } = writable<Timetable>(undefined, (set) => {
    const serialized = localStorage.getItem('timetable-data');
    if (serialized) set(JSON.parse(serialized));
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
