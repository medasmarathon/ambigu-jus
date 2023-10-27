import { ObjectId } from 'mongodb';
import { OutcomeModel } from './models/outcome-model';
import { Outcome } from '@app/entities/outcome';
import * as sampleSpaceMapping from "./sample-space-model-mapping";
import { SampleSpace } from '@app/entities/sample-space';
import { has } from 'ramda';

export const toEntity = (outcomeModel: OutcomeModel, parentSampleSpace: SampleSpace) => {
  let entity = {
    ...outcomeModel,
    id: String(outcomeModel._id),
    sampleSpace: parentSampleSpace
  };
  delete entity._id;
  delete entity.sampleSpaceId;
  return entity as Outcome;
}

export function toModel(outcomeEntity?: Outcome) {
  if (!outcomeEntity) return null;
  let model = {
    ...outcomeEntity,
    _id: has("id")(outcomeEntity) ?
      new ObjectId(outcomeEntity.id) : undefined,
    sampleSpaceId: has("id")(outcomeEntity.sampleSpace) ?
      new ObjectId(outcomeEntity.sampleSpace.id) : undefined
  };
  has("id")(model) && delete model.id;
  delete model.sampleSpace;
  return model as OutcomeModel;
}
