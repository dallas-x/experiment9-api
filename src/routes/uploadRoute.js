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
    let Players = req.body;
    let TPP = Players.length;
    let results = Players.map(({ data }) => {
      let rScore = TPP - data.Rank;
      return {
        Player_ID: data.ID,
        Player: data.Player,
        Score: rScore,
        Rank: data.Rank,
        TPP: TPP,
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
