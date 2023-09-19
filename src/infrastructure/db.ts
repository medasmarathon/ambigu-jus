import { Db, MongoClient } from "mongodb";
import { curry } from "ramda";


const COLLECTION_NAMES = {
  SAMPLE_SPACES: "sampleSpaces",
  OUTCOMES: "outcomes",
  EVENTS: "events",
};

const sampleSpaceCollection = async <T>(db: Db) => {
  return db.collection<T>(COLLECTION_NAMES.SAMPLE_SPACES);
}

const outcomeCollection = curry(async (db: Db, sampleSpaceName: string) => {
  let collectionList = await db.listCollections({
    name: COLLECTION_NAMES.OUTCOMES
  }).toArray();
  if (collectionList.length > 0) {
    return db.collection(COLLECTION_NAMES.OUTCOMES);
  }

  let collection = await db.createCollection(COLLECTION_NAMES.OUTCOMES);
  return collection;
})

const eventCollection = curry(async (db: Db, sampleSpaceName: string) => {
  let collectionList = await db.listCollections({
    name: COLLECTION_NAMES.EVENTS
  }).toArray();
  if (collectionList.length > 0) {
    return db.collection(COLLECTION_NAMES.EVENTS);
  }

  let collection = await db.createCollection(COLLECTION_NAMES.EVENTS);
  return collection;
})

export { sampleSpaceCollection, outcomeCollection, eventCollection };
