import dotenv from 'dotenv';

dotenv.config();
const { MongoClient } = require('mongodb');

const PASSWORD = process.env.MONGO_TEST_PASSWORD;
const USERNAME = process.env.MONGO_TEST_USERNAME;
const dbName = 'kd13-testing';

const updatePlayers = async (Players, TPP) => {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@main.llmcq.mongodb.net/kd13-testing?retryWrites=true&w=majority`;
  return new Promise((resolve, reject) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      client.connect().then((cluster) => {
        const db = cluster.db(dbName);
        // implicit return => result doc from mongodb: Consider rewrite to forEach
        // eslint-disable-next-line array-callback-return
        const results = Players.map((player) => {
          db.collection('Players')
            .updateOne(
              { Player_Name: player.Player_ID },
              {
                $setOnInsert: {
                  Player_ID: player.Player_ID,
                  Player: player.Player,
                },
                $inc: { Score: player.Score, Games_Played: 1, TPP },
                $set: { Rank: player.Rank },
              },
              { upsert: true, multi: true },
            )
            .then((result) => result);
        });
        resolve(results);
      });
    } catch (error) {
      console.error(error);
      reject(error);
    } finally {
      client.close();
    }
  });
};

export default updatePlayers;
