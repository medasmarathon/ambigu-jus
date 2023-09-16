import { MongoClient } from "mongodb";

const DATABASE_NAME = "probability";

const COLLECTION_NAMES = {
  SAMPLE_SPACES: "sampleSpaces",
  OUTCOMES: "outcomes",
  EVENTS: "events",
};

const mongoDbUri = "mongodb://localhost:27017";

const dbClient = new MongoClient(mongoDbUri);

function probabilityDatabase() {
  return dbClient.db(DATABASE_NAME);
}
async function sampleSpaceCollection<T>() {
  let db = probabilityDatabase();
  return db.collection<T>(COLLECTION_NAMES.SAMPLE_SPACES);
}

async function outcomeCollection(sampleSpaceName: string) {
  let db = probabilityDatabase();
  let collectionList = await db.listCollections({
    name: `${COLLECTION_NAMES.OUTCOMES}_${sampleSpaceName}`
  }).toArray();
  if (collectionList.length > 0) {
    return db.collection(`${COLLECTION_NAMES.OUTCOMES}_${sampleSpaceName}`);
  }

  let collection = await db.createCollection(`${COLLECTION_NAMES.OUTCOMES}_${sampleSpaceName}`);
  return collection;
}

async function eventCollection(sampleSpaceName: string) {
  let db = probabilityDatabase();
  let collectionList = await db.listCollections({
    name: `${COLLECTION_NAMES.EVENTS}_${sampleSpaceName}`
  }).toArray();
  if (collectionList.length > 0) {
    return db.collection(`${COLLECTION_NAMES.EVENTS}_${sampleSpaceName}`);
  }

  let collection = await db.createCollection(`${COLLECTION_NAMES.EVENTS}_${sampleSpaceName}`);
  return collection;
}

export { dbClient, sampleSpaceCollection, outcomeCollection, eventCollection };
