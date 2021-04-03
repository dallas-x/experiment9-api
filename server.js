import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import uploadRouter from './src/routes/uploadRoute';
import statsRouter from './src/routes/statsRoute';
const debug = require('debug')('app');

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(uploadRouter);
app.use(statsRouter);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/dist/index.html'));
// });

// app.listen(port, (err) => {
//   debug(`running server on port ${chalk.green(port)}`);
//   if (err) {
//     debug(`Error has accured ${err}`);
//   }
// });

module.exports = app;
