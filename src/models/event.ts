export type Event = {
  _id: number;
  name: string;
  type: "Atomic" | "And" | "Or" | "Conditional";
  probability?: number;
  ancestors?: Event[];
}

export type AndEvent = Event & {
  type: "And";
  subEvents: Event[];
}

export type OrEvent = Event & {
  type: "Or";
  subEvents: Event[];
}

export type ConditionalEvent = Event & {
  type: "Conditional";
  subjectEvent: Event;
  conditionEvent: Event;
}
