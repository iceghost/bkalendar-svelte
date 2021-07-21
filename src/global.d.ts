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

interface AgendaEvent {
  name: string;
  room: string;
  date: import('@js-temporal/polyfill').Temporal.PlainDate;
  start: import('@js-temporal/polyfill').Temporal.PlainTime;
  end: import('@js-temporal/polyfill').Temporal.PlainTime;
  upcoming?: boolean;
}
