// @ts-nocheck
import { MongoClient } from "mongodb";

const password = process.env.PASSWORD;
const mongodbURL = `mongodb+srv://agenttango:${password}@places.54eqipc.mongodb.net/?retryWrites=true&w=majority`;

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(mongodbURL);
    const db = client.db();
    const meetupsCollection = db.collection("places");
    const result = await meetupsCollection.insertOne({ data });
    client.close();
    res.status(201).json({
      message: "New meetup created!",
    });
  }
}

export default handler;
