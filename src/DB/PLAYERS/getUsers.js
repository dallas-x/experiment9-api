import dotenv from 'dotenv';

dotenv.config();
const { MongoClient } = require('mongodb');

const PASSWORD = process.env.MONGO_TEST_PASSWORD;
const USERNAME = process.env.MONGO_TEST_USERNAME;
const dbName = 'kd13-testing';

const getUsers = () => {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@main.llmcq.mongodb.net/kd13-testing?retryWrites=true&w=majority`;
  return new Promise((resolve, reject) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      client.connect().then((con) => {
        const db = con.db(dbName);
        db.collection('Players')
          .find()
          .sort({ Player: 1 })
          .toArray((err, players) =>
            resolve({ status: 200, reason: 'The database liked you!', data: players }),
          );
      });
    } catch (error) {
      reject(error);
    } finally {
      client.close();
    }
  });
};

export default getUsers;
