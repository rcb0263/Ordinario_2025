import { ApolloServer } from "@apollo/server";
import { MongoClient } from "mongodb";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./schema.ts";
import { resolvers } from "./resolvers.ts";
import { RestaurantModel } from "./types.ts";


const MONGO_URL = Deno.env.get("N_MONGO");
console.info(MONGO_URL)
if (!MONGO_URL) {
  throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");


const mongoDB = mongoClient.db("databasename");
const restaurantCollection = mongoDB.collection<RestaurantModel>("restaurant");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ restaurantCollection }),
});

console.info(`Server ready at ${url}`);