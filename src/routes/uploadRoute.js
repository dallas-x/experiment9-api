import express from 'express';
import updatePlayers from '../DB/PLAYERS/updatePlayers';
import updateBobTPP from '../DB/PLAYERS/updateBobTPP';
import authenticationRequired from '../auth/jwtVerifier';

const uploadRouter = express.Router();

uploadRouter
  .route('/upload')
  .get((req, res) => {
    res.send('success');
  })
  .post(authenticationRequired, async (req, res) => {
    const Players = req.body;
    const TPP = Players.length;
    const results = Players.map(({ data }) => {
      const rScore = TPP - data.Rank;
      return {
        Player_ID: data.ID,
        Player: data.Player,
        Score: rScore,
      };
    });
    const trueTPP = await updateBobTPP(TPP);
    console.log(trueTPP.value.TPP);
    updatePlayers(results, trueTPP.value.TPP)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((upsertErr) => {
        res.statusCode(500).json(upsertErr);
      });
  });

export default uploadRouter;
