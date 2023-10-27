import { ObjectId } from 'mongodb';
import { SampleSpace } from "@app/entities/sample-space";
import { SampleSpaceModel } from "./models/sample-space-model";
import { has } from 'ramda';

export const toEntity = (sampleSpace: SampleSpaceModel) => {
  let entity = {
    ...sampleSpace,
    id: String(sampleSpace._id)
  };
  delete entity._id;
  return entity as SampleSpace;
}

export function toModel(ssEntity?: SampleSpace) {
  if (!ssEntity) return null;
  let model = {
    ...ssEntity,
    _id: has("id")(ssEntity) ? new ObjectId(ssEntity.id) : undefined
  };
  has("id")(model) && delete model.id;
  return model as SampleSpaceModel;
}
