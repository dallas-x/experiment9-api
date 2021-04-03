import dotenv from 'dotenv';
dotenv.config();
const { MongoClient } = require('mongodb');
const PASSWORD = process.env.MONGO_TEST_PASSWORD;
const USERNAME = process.env.MONGO_TEST_USERNAME;
const dbName = 'kd13-testing';

const updatePlayers = (Players, TPP) => {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@main.llmcq.mongodb.net/kd13-testing?retryWrites=true&w=majority`;
  return new Promise((resolve, reject) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      client.connect().then((client) => {
        const db = client.db(dbName);
        const results = Players.map((player) => {
          db.collection('Players').updateOne(
            { Player_Name: player.Player_ID },
            {
              $setOnInsert: {
                Player_ID: player.Player_ID,
                Player: player.Player,
              },
              $inc: { Score: player.Score, Games_Played: 1, TPP: TPP },
              $set: { Rank: player.Rank },
            },
            { upsert: true, multi: true },
          );
        });

        resolve(results);
      });
    } catch (error) {
      console.error(error);
    } finally {
      client.close();
    }
  });
};

export default updatePlayers;
