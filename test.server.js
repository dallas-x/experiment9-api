import dotenv from 'dotenv';
import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import path from 'path';
import database from './src/controllers/dbFunc';
import uploadRouter from './src/routes/uploadRoute';
import statsRouter from './src/routes/statsRoute';
import testRouter from './src/routes/testRoute';
import crudTest from './src/DB/test/CRUD';
const debug = require('debug')('app');

const data = require('./src/DB/test/schema/testData.json');

dotenv.config();
const { MongoClient } = require('mongodb');
const PASSWORD = process.env.MONGO_TEST_PASSWORD;
const USERNAME = process.env.MONGO_TEST_USERNAME;
const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@main.llmcq.mongodb.net/pok3r-testing?retryWrites=true&w=majority`;

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/dist')));

// require('./src/config/passport')(app);

app.use(uploadRouter);
app.use(statsRouter);
app.use(testRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});
database.createTables();

async function main() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  await crudTest.create();
  await crudTest.Upsert();
  const results = await crudTest.loadData(data);
  const getItem = await crudTest.get({ name: { $in: ['Roundtable pizza', 'Mikes pizza'] } });
  debug(results);
  debug(getItem);
  // await client.db('pok3r-testing').dropCollection('Pizzas');
  client.close();
}

app.listen(port, (err) => {
  debug(`running on server port ${chalk.green(port)}`);
  main();
  if (err) {
    debug(`Error has accured ${err}`);
  }
});
