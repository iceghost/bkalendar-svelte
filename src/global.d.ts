/// <reference types="@sveltejs/kit" />
/// <reference types="@js-temporal/polyfill" />

interface Subject {
  id: string;
  name: string;
  group: string;
  weekday: number;
  start: number;
  end: number;
  room: string;
  weeks: number[];
}

interface Timetable {
  firstDate: import("@js-temporal/polyfill").Temporal.PlainDate;
  subjects: Subject[];
}
