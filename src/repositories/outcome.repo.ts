import { allP } from 'ramda-adjunct';
import { outcomeCollection, sampleSpaceCollection, } from "@app/infrastructure/persistence/db"
import { Db, ObjectId } from "mongodb";
import { pipe, curry, andThen, map, converge, ifElse, isNotNil, __, T } from "ramda";
import { tapDebug } from "@app/infrastructure/utility/tap-debug";
import { OutcomeModel } from "@app/infrastructure/persistence/models/outcome-model";
import { Outcome } from "@app/entities/outcome";
import { toEntity, toModel } from "@app/infrastructure/persistence/outcome-mapping";
import * as sampleSpaceRepo from "@app/repositories/sample-space.repo";
import { SampleSpace } from '@app/entities/sample-space';

const getOutcomeModelById = curry(async (db: Db, id: string) => pipe(
  outcomeCollection<OutcomeModel>,
  andThen(c => c.findOne({ _id: new ObjectId(id) }))
)(db));

const getById = curry(async (db: Db, id: string) => {
  let outcomeModel = await getOutcomeModelById(db)(id);
  let sampleSpace: SampleSpace;
  if (outcomeModel.sampleSpaceId)
    sampleSpace = await sampleSpaceRepo.getById(db)(String(outcomeModel.sampleSpaceId));
  return toEntity(outcomeModel, sampleSpace);
})

const create = curry(async (db: Db, outcome: Outcome) => {
  return await pipe(
    outcomeCollection<OutcomeModel>,
    andThen(c => c.insertOne(toModel(outcome)))
  )(db);
})

const update = curry(async (db: Db, outcome: Outcome) => {
  let model = toModel(outcome);
  let outcomeResult = pipe(
    outcomeCollection<OutcomeModel>,
    andThen(c => c.updateOne(
      { _id: model._id },
      {
        $set: model
      },
    ))
  )(db);
  let results = await allP([
    outcomeResult,
    outcome.sampleSpace ? sampleSpaceRepo.upsert(db)(outcome.sampleSpace) : Promise.resolve(null)
  ]);
  return outcomeResult;
})

const deleteById = curry(async (db: Db, id: string) => {
  return await pipe(
    outcomeCollection<OutcomeModel>,
    andThen(c => c.deleteOne({ _id: new ObjectId(id) }))
  )(db);
})

export { getById, create, update, deleteById }
