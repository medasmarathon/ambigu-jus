import { ObjectId } from "mongodb";

export type OutcomeModel = {
  _id: ObjectId;
  name: string;
  sampleSpaceId: ObjectId;
}
