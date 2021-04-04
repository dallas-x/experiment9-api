import express from 'express';
import updatePlayers from '../DB/PLAYERS/updatePlayers';
import authenticationRequired from '../auth/jwtVerifier';

const uploadRouter = express.Router();

uploadRouter
  .route('/upload')
  .get((req, res) => {
    res.send('success');
  })
  .post(authenticationRequired, (req, res) => {
    const Players = req.body;
    const TPP = Players.length;
    const results = Players.map(({ data }) => {
      const rScore = TPP - data.Rank;
      return {
        Player_ID: data.ID,
        Player: data.Player,
        Score: rScore,
        Rank: data.Rank,
        TPP,
      };
    });
    updatePlayers(results, TPP)
      .then((response) => {
        res.sendStatus(200);
      })
      .catch((upsert_err) => {
        res.sendStatus(500);
      });
  });

export default uploadRouter;
