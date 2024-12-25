import { MongoClient } from 'mongodb';
const uri = process.env.MONGO_URI ?? 'mongodb://localhost:27018';
let client: MongoClient | null = null;
const getMongoClient = () => {
  if (!client) {
    client = new MongoClient(uri, {
      connectTimeoutMS: 600000,
      socketTimeoutMS: 600000,
      serverSelectionTimeoutMS: 600000,
      // auth: {
      //   username: 'admin',
      //   password: 'yourpassword'
      // },
      // authSource: 'admin'
    });
  }
  return client;
};
export const getMongoCollection = async (collectionName: string) => {
  const client = getMongoClient();
  await client.connect();
  const db = client.db('BLOG');
  return { client, collection: db.collection(collectionName), db };
};