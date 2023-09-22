import { sampleSpaceCollection, } from "@app/infrastructure/persistence/db"
import { toModel } from "@app/infrastructure/utility/mongo-to-model";
import { SampleSpace } from "@app/entities/sample-space"
import { Db, ObjectId } from "mongodb";
import { pipe, curry, andThen, map } from "ramda";

const getById = curry(async (db: Db, id: string) => {
  return await pipe(
    sampleSpaceCollection<SampleSpace>,
    andThen(c => c.findOne({ _id: new ObjectId(id) })),
    andThen(toModel)
  )(db);
})

const create = curry(async (db: Db, sampleSpace: SampleSpace) => {  
  delete sampleSpace.id;
  return await pipe(
    sampleSpaceCollection<SampleSpace>,
    andThen(c => c.insertOne(sampleSpace))
  )(db);
})

const update = curry(async (db: Db, sampleSpace: SampleSpace) => {
  let id = sampleSpace.id;
  delete sampleSpace.id;
  return await pipe(
    sampleSpaceCollection<SampleSpace>,
    andThen(c => c.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { ...sampleSpace }
      },
    ))
  )(db);
})

const deleteById = curry(async (db: Db, id: string) => {
  return await pipe(
    sampleSpaceCollection<SampleSpace>,
    andThen(c => c.deleteOne({ _id: new ObjectId(id) }))
  )(db);
})

export { getById, create, update, deleteById }
