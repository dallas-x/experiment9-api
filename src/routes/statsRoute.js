import express from 'express';
import getPlayers from '../DB/PLAYERS/getPlayers';
import resetPlayers from '../DB/PLAYERS/resetPlayers';
import authenticationRequired from '../auth/jwtVerifier';

const statsRouter = express.Router();

statsRouter.route('/players/get').get(authenticationRequired, (req, res) => {
  getPlayers()
    .then((response) => {
      response.status === 200
        ? res.json(response.data)
        : res.json({ Players: [{ Player_ID: 0, Player: 'No Player Found', Score: 0 }] });
    })
    .catch((err) => {
      res.json({
        status: 1,
        reason: err,
        data: { Players: [{ Player_ID: 0, Player: 'No Player Found', Score: 0 }] },
      });
    });
});

statsRouter.route('/players/reset').get(authenticationRequired, (req, res) => {
  resetPlayers()
    .then((response) => {
      response.result.ok === 1 ? res.json({ status: 200 }) : res.json({ status: 500 });
    })
    .catch((err) => {
      res.json({ status: 1, reason: err });
    });
});

export default statsRouter;
