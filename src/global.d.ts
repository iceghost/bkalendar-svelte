/// <reference types="@sveltejs/kit" />
/// <reference types="@js-temporal/polyfill" />

declare interface Subject {
  id: string;
  name: string;
  group: string;
  weekday: number;
  start: number;
  end: number;
  room: string;
  weeks: number[];
}

declare interface Timetable {
  firstDate: import('@js-temporal/polyfill').Temporal.PlainDate;
  subjects: Subject[];
}
