import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';

const getMongoClient = () => new MongoClient(uri, {
  connectTimeoutMS: 600000,
  socketTimeoutMS: 600000,
  serverSelectionTimeoutMS: 600000,
  auth: {
    username: 'admin',
    password: 'yourpassword'
  },
  authSource: 'admin'
});

export const getMongoCollection = async (collectionName: string) => {
  const client = getMongoClient();
  await client.connect();
  const db = client.db('BLOG');
  return { client, collection: db.collection(collectionName),db };
};