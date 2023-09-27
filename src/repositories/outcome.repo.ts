import { outcomeCollection, sampleSpaceCollection, } from "@app/infrastructure/persistence/db"
import { Db, ObjectId } from "mongodb";
import { pipe, curry, andThen, map } from "ramda";
import { toEntity, toModel } from "@app/infrastructure/persistence/sample-space-model-mapping";
import { tapDebug } from "@app/infrastructure/utility/tap-debug";
import { OutcomeModel } from "@app/infrastructure/persistence/models/outcome-model";
import { Outcome } from "@app/entities/outcome";

const getById = curry(async (db: Db, id: string) => {
  return await pipe(
    outcomeCollection<OutcomeModel>,
    andThen(c => c.findOne({ _id: new ObjectId(id) })),
    andThen(toEntity)
  )(db);
})

const create = curry(async (db: Db, outcome: Outcome) => {  
  delete outcome.id;
  return await pipe(
    outcomeCollection<OutcomeModel>,
    andThen(c => c.insertOne(toModel(outcome)))
  )(db);
})

const update = curry(async (db: Db, outcome: Outcome) => {
  let id = outcome.id;
  delete outcome.id;
  return await pipe(
    outcomeCollection<OutcomeModel>,
    andThen(c => c.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { ...outcome }
      },
    ))
  )(db);
})

const deleteById = curry(async (db: Db, id: string) => {
  return await pipe(
    outcomeCollection<OutcomeModel>,
    andThen(c => c.deleteOne({ _id: new ObjectId(id) }))
  )(db);
})

export { getById, create, update, deleteById }
