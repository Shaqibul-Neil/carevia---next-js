import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.URI;
const dbName = process.env.DBNAME;

export const collections = {
  USERS: "users",
  SERVICES: "services",
  BOOKINGS: "bookings",
  PAYMENTS: "payments",
  MESSAGES: "messages",
};

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const dbConnect = (cName) => {
  return client.db(dbName).collection(cName);
};
