import { sampleSpaceCollection, } from "@app/infrastructure/persistence/db"
import { SampleSpace } from "@app/entities/sample-space"
import { Db, ObjectId } from "mongodb";
import { pipe, curry, andThen, map, ifElse, isNotNil } from "ramda";
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
  return await pipe(
    sampleSpaceCollection<SampleSpaceModel>,
    andThen(c => c.insertOne(toModel(sampleSpace)))
  )(db);
})

const update = curry(async (db: Db, sampleSpace: SampleSpace) => {
  let model = toModel(sampleSpace);
  return await pipe(
    sampleSpaceCollection<SampleSpaceModel>,
    andThen(c => c.updateOne(
      { _id: model._id },
      {
        $set: model
      },
    ))
  )(db);
})

const upsert = curry(async (db: Db, sampleSpace: SampleSpace) => {
  return await ifElse(
    isNotNil,
    _ => update(db, sampleSpace),
    _ => create(db, sampleSpace)
  )(sampleSpace?.id)
})

const deleteById = curry(async (db: Db, id: string) => {
  return await pipe(
    sampleSpaceCollection<SampleSpaceModel>,
    andThen(c => c.deleteOne({ _id: new ObjectId(id) }))
  )(db);
})

export { getById, create, update, upsert, deleteById }
