export function parse(raw: string): Subject[] {
  return raw
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
        .map((raw) => parseInt(raw))
        .filter(Boolean);

      // if parseInt unsuccessful
      if (!weekday || !start || !end || !weeks) return null;

      return { id, name, group, weekday, start, end, room, weeks };
    })
    .filter((e): e is Subject => Boolean(e));
}
