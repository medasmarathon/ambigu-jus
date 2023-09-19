import { sampleSpaceCollection, } from "@app/infrastructure/db"
import { toModel } from "@app/infrastructure/utility/mongo-to-model";
import { SampleSpace } from "@app/models/sample-space"
import { Db, ObjectId } from "mongodb";
import { pipe } from "types-ramda";

const getById = (db: Db) => async (id: string) => {
  pipe(
    probabilityDatabase
  )
  let collection = await sampleSpaceCollection<SampleSpace>();
  return toModel(await collection.findOne({ _id: new ObjectId(id) }));
}

const create = (db: Db) => async (sampleSpace: SampleSpace) => {  
  let collection = await sampleSpaceCollection<SampleSpace>();
  delete sampleSpace.id;
  return await collection.insertOne(sampleSpace);
}

const update = (db: Db) => async (sampleSpace: SampleSpace) => {  
  let collection = await sampleSpaceCollection<SampleSpace>();
  let id = sampleSpace.id;
  delete sampleSpace.id;
  return await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: { ...sampleSpace }
    },
  )
}

const deleteById = (db: Db) => async (id: string) => {  
  let collection = await sampleSpaceCollection<SampleSpace>();
  return await collection.deleteOne({ _id: new ObjectId(id) });
}

export { getById, create, update, deleteById }
