import { Db, MongoClient } from "mongodb";

const DATABASE_NAME = "probability";

const COLLECTION_NAMES = {
  SAMPLE_SPACES: "sampleSpaces",
  OUTCOMES: "outcomes",
  EVENTS: "events",
};

const mongoDbUri = "mongodb://localhost:27017";

const dbClient = new MongoClient(mongoDbUri);

const probabilityDatabase = ({ Db }: { Db: MongoClient }) => {
  return Db.db(DATABASE_NAME);
}
const sampleSpaceCollection = (db: Db) => async <T>() => {
  return db.collection<T>(COLLECTION_NAMES.SAMPLE_SPACES);
}

const outcomeCollection = (db: Db) => async (sampleSpaceName: string) => {
  let collectionList = await db.listCollections({
    name: COLLECTION_NAMES.OUTCOMES
  }).toArray();
  if (collectionList.length > 0) {
    return db.collection(COLLECTION_NAMES.OUTCOMES);
  }

  let collection = await db.createCollection(COLLECTION_NAMES.OUTCOMES);
  return collection;
}

const eventCollection = (db: Db) => async (sampleSpaceName: string) => {
  let collectionList = await db.listCollections({
    name: COLLECTION_NAMES.EVENTS
  }).toArray();
  if (collectionList.length > 0) {
    return db.collection(COLLECTION_NAMES.EVENTS);
  }

  let collection = await db.createCollection(COLLECTION_NAMES.EVENTS);
  return collection;
}

export { dbClient, sampleSpaceCollection, outcomeCollection, eventCollection };
