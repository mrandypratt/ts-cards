import { MongoClient } from 'mongodb';

const mongoURI = process.env.mongoURI || "";

const client = new MongoClient(mongoURI);

async function run(): Promise<any> {

  try {
    const db = client.db("CardsWithFriends");
    const coll = db.collection("Cards");

    const query = { this: "YayaDingDong" }
    const card = await coll.findOne(query)

    console.log(card)

  } finally {
      await client.close();
  }
}

run().catch(console.dir);
