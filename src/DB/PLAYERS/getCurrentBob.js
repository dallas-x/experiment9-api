import dotenv from 'dotenv';

dotenv.config();
const { MongoClient } = require('mongodb');

const PASSWORD = process.env.MONGO_TEST_PASSWORD;
const USERNAME = process.env.MONGO_TEST_USERNAME;
const dbName = 'kd13-testing';

const createWeek = () => {
  const todaydate = new Date();
  // find the year of the current date
  const oneJan = new Date(todaydate.getFullYear(), 0, 1);
  // calculating number of days in given year before a given date
  const numberOfDays = Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000));
  // adding 1 since to current date and returns value starting from 0
  return `${oneJan}-${Math.ceil((todaydate.getDay() + 1 + numberOfDays) / 7)}`;
};

const getCurrentBob = async () => {
  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@main.llmcq.mongodb.net/kd13-testing?retryWrites=true&w=majority`;
  const weekNumber = createWeek();
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const con = await client.connect();
  const db = con.db(dbName);
  const collection = db.collection('BobStats');
  return new Promise((resolve, reject) => {
    collection.find({ Week: weekNumber }).toArray((err, season) => {
      if (err) reject(err);
      resolve(season);
    });
  });

  // implicit return => result doc from mongodb: Consider rewrite to forEach
  // eslint-disable-next-line array-callback-return
};

export default getCurrentBob;
