import dotenv from 'dotenv';
dotenv.config();
const { MongoClient, ObjectID } = require('mongodb');
const PASSWORD = process.env.MONGO_TEST_PASSWORD;
const USERNAME = process.env.MONGO_TEST_USERNAME;
const dbName = 'kd13-testing';

function crudTest() {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@main.llmcq.mongodb.net/kd13-testing?retryWrites=true&w=majority`;

  const loadData = (data) => {
    return new Promise((resolve, reject) => {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      try {
        client
          .connect()
          .then((client) => {
            const db = client.db(dbName);
            console.log(db);
            db.collection('Pizzas')
              .insertMany(data)
              .then((results) => {
                console.log(db);
                resolve(results);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  };
  const get = (query) => {
    query ? query : {};
    return new Promise((resolve, reject) => {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      try {
        client.connect().then((client) => {
          const db = client.db(dbName);
          const items = db.collection('Pizzas').find(query);

          items.toArray((err, results) => {
            resolve(results);
          });
        });
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  };

  const getById = (id) => {
    return new Promise((resolve, reject) => {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      try {
        client.connect().then((client) => {
          const db = client.db(dbName);
          const items = db.collection('Pizzas').find({ _id: ObjectID(id) });

          items.toArray((err, results) => {
            resolve(results);
          });
        });
      } catch (error) {
        reject(error);
      } finally {
        client.close();
      }
    });
  };

  const create = async () => {
    return new Promise((resolve, reject) => {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      try {
        // Connect the client to the server

        // Establish and verify connection
        client.connect().then((client) => {
          console.log(client);
          client.db('kd13-testing').createCollection('Pizzas', (err, results) => {
            if (err) {
              console.error(err);
            }
            console.log('created collection');
            console.log(results);
            resolve(results);
          });
        });
      } catch (error) {
        // Ensures that the client will close when you finish/error
        console.log(error);
      }
    });
  };

  const Upsert = async () => {
    return new Promise((resolve, reject) => {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      const players = [
        { name: 'George', score: 10, id: 'blablablba' },
        { name: 'Wayne', score: 100, id: 'koookooookooo' },
        { name: 'Jhonny', score: 500, id: 'lajsigae' },
        { name: 'David', score: 3, id: 'Testing' },
        { name: 'Dallas', score: 333333, id: 'the realist' },
      ];
      try {
        client.connect().then((client) => {
          const db = client.db(dbName);
          const results = players.map((player) => {
            db.collection('Players').updateOne(
              { Player_Name: player.name },
              {
                $setOnInsert: { Player_Name: player.name },
                $inc: { Score: player.score },
                $set: { id: player.id },
              },
              { upsert: true, multi: true },
            );
          });
          resolve(results);
        });
      } catch (error) {
        console.error(error);
      }
    });
  };

  return { loadData, get, getById, create, Upsert };
}

module.exports = crudTest();
