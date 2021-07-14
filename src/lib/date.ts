export function getWeek(date: Date) {
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7,
    )
  );
};

export function getDateFromWeek(weekday: number, week: number, year: number): Date {
  const week1 = new Date(year, 0, 4);
  return new Date(week1.getTime() + (week - 1) * 7 * 864E5 + (weekday - (week1.getDay() + 6) % 7) * 864E5)
}