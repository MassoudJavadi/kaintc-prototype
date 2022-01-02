// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://masoud:masoud@cluster0.xkmy0.mongodb.net/slides?retryWrites=true&w=majority"
    );
    const db = client.db();

    const slidesCollection = db.collection("slide");

    const result = await slidesCollection.insertOne(data);

    console.log(result);
  }
}
