import { allP } from 'ramda-adjunct';
import { outcomeCollection, sampleSpaceCollection, } from "@app/infrastructure/persistence/db"
import { Db, ObjectId } from "mongodb";
import { pipe, curry, andThen, map, converge, ifElse, isNotNil, __ } from "ramda";
import { tapDebug } from "@app/infrastructure/utility/tap-debug";
import { OutcomeModel } from "@app/infrastructure/persistence/models/outcome-model";
import { Outcome } from "@app/entities/outcome";
import { toEntity, toModel } from "@app/infrastructure/persistence/outcome-mapping";
import { SampleSpaceModel } from "@app/infrastructure/persistence/models/sample-space-model";
import * as sampleSpaceRepo from "@app/repositories/sample-space.repo";

const getOutcomeModelById = curry(async (db: Db, id: string) => pipe(
  outcomeCollection<OutcomeModel>,
  andThen(c => c.findOne({ _id: new ObjectId(id) }))
)(db));

const getById = curry(async (db: Db, id: string) => {
  let outcomeModel = await getOutcomeModelById(db)(id);
  let sampleSpace = await sampleSpaceRepo.getById(db)(String(outcomeModel.sampleSpaceId));
  return toEntity(outcomeModel, sampleSpace);
})

const create = curry(async (db: Db, outcome: Outcome) => {  
  delete outcome.id;
  return await pipe(
    outcomeCollection<OutcomeModel>,
    andThen(c => c.insertOne(toModel(outcome)))
  )(db);
})

const update = curry(async (db: Db, outcome: Outcome) => {
  let { id, sampleSpace } = outcome;
  delete outcome.id;
  delete outcome.sampleSpace;
  let outcomeResult = pipe(
    outcomeCollection<OutcomeModel>,
    andThen(c => c.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { ...outcome }
      },
    ))
  )(db);
  let results = await allP([
    outcomeResult,
    sampleSpaceRepo.upsert(db)(sampleSpace)
  ]);
  return results;
})

const deleteById = curry(async (db: Db, id: string) => {
  return await pipe(
    outcomeCollection<OutcomeModel>,
    andThen(c => c.deleteOne({ _id: new ObjectId(id) }))
  )(db);
})

export { getById, create, update, deleteById }
