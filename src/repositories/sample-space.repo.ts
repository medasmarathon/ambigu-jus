import { sampleSpaceCollection, } from "@app/infrastructure/persistence/db"
import { SampleSpace } from "@app/entities/sample-space"
import { Db, ObjectId } from "mongodb";
import { pipe, curry, andThen, map } from "ramda";
import { SampleSpaceModel } from "@app/infrastructure/persistence/models/sample-space-model";
import { toEntity, toModel } from "@app/infrastructure/persistence/sample-space-model-mapping";
import { tapDebug } from "@app/infrastructure/utility/tap-debug";

const getById = curry(async (db: Db, id: string) => {
  return await pipe(
    sampleSpaceCollection<SampleSpaceModel>,
    andThen(c => c.findOne({ _id: new ObjectId(id) })),
    andThen(toEntity)
  )(db);
})

const create = curry(async (db: Db, sampleSpace: SampleSpace) => {  
  delete sampleSpace.id;
  return await pipe(
    sampleSpaceCollection<SampleSpaceModel>,
    andThen(c => c.insertOne(toModel(sampleSpace)))
  )(db);
})

const update = curry(async (db: Db, sampleSpace: SampleSpace) => {
  let id = sampleSpace.id;
  delete sampleSpace.id;
  return await pipe(
    sampleSpaceCollection<SampleSpaceModel>,
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
    sampleSpaceCollection<SampleSpaceModel>,
    andThen(c => c.deleteOne({ _id: new ObjectId(id) }))
  )(db);
})

export { getById, create, update, deleteById }
