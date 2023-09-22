import { AndEvent, AtomicEvent, ConditionalEvent, EventType, OrEvent } from "@app/entities/event";
import { ObjectId } from "mongodb";

export type EventModel = {
  _id: ObjectId;
  name: string;
  type: typeof EventType[keyof typeof EventType];
  probability?: number;
  ancestorIds?: ObjectId[];
  subEventIds?: ObjectId[];
  subjectEventId?: ObjectId;
  conditionEventId?: ObjectId;
  outcomeId?: ObjectId;
}

export const isAtomicEvent = (ev: EventModel) => {
  return ev.type === EventType.Atomic;
}

export const isAndEvent = (ev: EventModel) => {
  return ev.type === EventType.And;
}
export const isOrEvent = (ev: EventModel) => {
  return ev.type === EventType.Or;
}

export const isConditionalEvent = (ev: EventModel) => {
  return ev.type === EventType.Conditional;
}
