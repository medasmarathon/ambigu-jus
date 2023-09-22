import { T, assoc, cond, dissoc, pick, pipe, prop, tap } from "ramda"
import { EventModel, isAndEvent, isAtomicEvent, isConditionalEvent, isOrEvent } from "./models/event-model"
import { AtomicEvent, $Event, AndEvent, OrEvent, AnyEvent, ConditionalEvent } from "@app/entities/event"
import { Outcome } from "@app/entities/outcome";

const toAtomic = (ev: EventModel) => {
  let atomicEv = {
    ...ev,
    id: String(ev._id),
    outcome: ev.outcomeId ?
      { id: String(ev.outcomeId) } as Outcome : undefined,
    ancestors: (ev.ancestorIds && ev.ancestorIds.length > 0) ?
      ev.ancestorIds.map(id => ({ id: String(id) } as $Event)) :
      undefined
  } as AtomicEvent & EventModel;
  delete atomicEv._id;
  delete atomicEv.ancestorIds;
  delete atomicEv.outcomeId;

  return atomicEv as AtomicEvent;
}

const toAnd = (ev: EventModel) => {
  let andEv = {
    ...ev,
    id: String(ev._id),
    ancestors: (ev.ancestorIds && ev.ancestorIds.length > 0) ?
      ev.ancestorIds.map(id => ({ id: String(id) } as $Event)) :
      undefined,
    subEvents: (ev.subEventIds && ev.subEventIds.length > 0) ?
      ev.subEventIds.map(id => ({ id: String(id) } as $Event)) :
      undefined
  } as AndEvent & EventModel;
  delete andEv._id;
  delete andEv.ancestorIds;
  delete andEv.subEventIds;

  return andEv as AndEvent;
}

const toOr = (ev: EventModel) => {
  let orEv = {
    ...ev,
    id: String(ev._id),
    ancestors: (ev.ancestorIds && ev.ancestorIds.length > 0) ?
      ev.ancestorIds.map(id => ({ id: String(id) } as $Event)) :
      undefined,
    subEvents: (ev.subEventIds && ev.subEventIds.length > 0) ?
      ev.subEventIds.map(id => ({ id: String(id) } as $Event)) :
      undefined
  } as OrEvent & EventModel;
  delete orEv._id;
  delete orEv.ancestorIds;
  delete orEv.subEventIds;

  return orEv as OrEvent;
}

const toConditional = (ev: EventModel) => {
  let orEv = {
    ...ev,
    id: String(ev._id),
    subjectEvent: ev.subjectEventId ?
      { id: String(ev.subjectEventId) } as $Event : undefined,
    conditionEvent: ev.conditionEventId ?
      { id: String(ev.conditionEventId) } as $Event : undefined,
  } as ConditionalEvent & EventModel;
  delete orEv._id;
  delete orEv.ancestorIds;
  delete orEv.subEventIds;

  return orEv as ConditionalEvent;
}

export const toEntity = (model: EventModel) => {
  if (isAtomicEvent(model)) return toAtomic(model);
  if (isAndEvent(model)) return toAnd(model);
  if (isOrEvent(model)) return toOr(model);
  if (isConditionalEvent(model)) return toConditional(model);
}

