/// <reference types="@sveltejs/kit" />

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
  firstDate: Date;
  subjects: Subject[];
}
