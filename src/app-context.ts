import { MongoClient } from "mongodb";

const DATABASE_NAME = "probability";
const mongoDbUri = "mongodb://localhost:27017";

const dbClient = new MongoClient(mongoDbUri);

const probabilityDatabase = ({ DbClient: client }: { DbClient: MongoClient }) => {
  return client.db(DATABASE_NAME);
}

export const AppContext = {
  Db: probabilityDatabase({ DbClient: dbClient })
}
