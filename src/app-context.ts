import { MongoClient } from "mongodb";

const mongoDbUri = "mongodb://localhost:27017";

const dbClient = new MongoClient(mongoDbUri);

export const AppContext = {
  Db: dbClient
}
