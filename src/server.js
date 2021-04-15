import express from 'express';
import cors from 'cors';
import uploadRouter from './routes/uploadRoute';
import statsRouter from './routes/statsRoute';
import usersRouter from './routes/usersRoute';
import seasonsRouter from './routes/seasonsRoute';

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(uploadRouter);
app.use(statsRouter);
app.use(usersRouter);
app.use(seasonsRouter);

app.get('/', (req, res) => {
  res.json({ status: 200, message: 'hello' });
});

app.listen(port, (err) => {
  console.log(`running server on port ${port}`);
  if (err) {
    console.log(`Error has accured ${err}`);
  }
});

module.exports = app;
