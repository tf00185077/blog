'use server';
import { NextResponse } from "next/server";
import { getMongoCollection } from "@/lib/db";
const getProps = async () => {
  const { client } = await getMongoCollection("Test");
  try {
    await client.connect();
    const db = client.db("BLOG");
    const data = await db.collection("Test").find({}).toArray();
    await client.close();
    await new Promise(resolve => setTimeout(resolve, 5000));
    return NextResponse.json({ status: 200, response:data });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 500, response: "Error" });
  }
};

export default getProps;