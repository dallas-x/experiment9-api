import dotenv from 'dotenv';

dotenv.config();
const { MongoClient } = require('mongodb');

const PASSWORD = process.env.MONGO_TEST_PASSWORD;
const USERNAME = process.env.MONGO_TEST_USERNAME;
const dbName = 'kd13-testing';

const resetPlayers = async () => {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@main.llmcq.mongodb.net/kd13-testing?retryWrites=true&w=majority`;
  return new Promise((resolve, reject) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      client.connect().then((client) => {
        const db = client.db(dbName);
        db.collection('Players').updateMany(
          {},
          { $set: { Score: 0, Rank: 0, TPP: 0 } },
          (err, results) => resolve(results),
        );
      });
    } catch {
      reject({ status: 500, reason: 'Database hates you!' });
    } finally {
      client.close();
    }
  });
};

export default resetPlayers;
