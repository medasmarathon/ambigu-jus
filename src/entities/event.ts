import { Outcome } from "./outcome";

export const EventType = {
  Atomic: "Atomic",
  And: "And",
  Or: "Or",
  Conditional: "Conditional"
} as const

export type $Event = {
  id: string;
  name: string;
  type: typeof EventType[keyof typeof EventType];
  probability?: number;
  ancestors?: $Event[];
}

export type AtomicEvent = $Event & {
  type: "Atomic";
  outcome?: Outcome
}

export type AndEvent = $Event & {
  type: "And";
  subEvents: $Event[];
}

export type OrEvent = $Event & {
  type: "Or";
  subEvents: $Event[];
}

export type ConditionalEvent = $Event & {
  type: "Conditional";
  subjectEvent: $Event;
  conditionEvent: $Event;
}

export type AnyEvent = AtomicEvent | AndEvent | OrEvent | ConditionalEvent;
