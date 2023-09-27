import { ObjectId } from 'mongodb';
import { OutcomeModel } from './models/outcome-model';
import { Outcome } from '@app/entities/outcome';
import * as sampleSpaceMapping from "./sample-space-model-mapping";
import { SampleSpace } from '@app/entities/sample-space';

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
    _id: new ObjectId(outcomeEntity.id),
    sampleSpaceId: new ObjectId(outcomeEntity.sampleSpace.id)
  };
  delete model.id;
  return model as OutcomeModel;
}
