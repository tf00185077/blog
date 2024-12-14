'use server'
import { getMongoCollection } from "@/lib/db";

export const getUser = async () => {
  const { client, db } = await getMongoCollection("Test");
  await client.connect();
  const user = await db.collection("Test").find().toArray();
  await client.close();
  const name = user.map(({name}) => name);
  console.log({name});
  return name;
};
