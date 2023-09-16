import { WithId } from "mongodb";

export function toModel<T>(mongoDoc?: WithId<T>) {
  if (!mongoDoc) return null;
  let model = {
    ...mongoDoc,
    id: mongoDoc._id
  };
  delete model._id;
  return model as T;
}
