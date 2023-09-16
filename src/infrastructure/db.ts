import { MongoClient } from "mongodb";

const DATABASE_NAME = "probability";

const COLLECTION_NAMES = {
  SAMPLE_SPACES: "sampleSpaces",
  OUTCOMES: "outcomes",
  EVENTS: "events",
};

const mongoDbUri = "mongodb://localhost:27017";

const dbClient = new MongoClient(mongoDbUri);

function sampleSpaceCollection(name: string) {
  return dbClient.db(DATABASE_NAME).collection(COLLECTION_NAMES.SAMPLE_SPACES);
}

function outcomeCollection(name: string, sampleSpaceName: string) {
  return dbClient
    .db(DATABASE_NAME)
    .collection(`${COLLECTION_NAMES.OUTCOMES}_${sampleSpaceName}`);
}

function eventCollection(name: string, sampleSpaceName: string) {
  return dbClient
    .db(DATABASE_NAME)
    .collection(`${COLLECTION_NAMES.EVENTS}_${sampleSpaceName}`);
}

export { dbClient, sampleSpaceCollection, outcomeCollection, eventCollection };
