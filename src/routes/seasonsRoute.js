import express from 'express';
import resetPlayers from '../DB/PLAYERS/resetPlayers';
import resetBob from '../DB/PLAYERS/resetBob';
import getCurrentBob from '../DB/PLAYERS/getCurrentBob';
import authenticationRequired from '../auth/jwtVerifier';

const uploadRouter = express.Router();

uploadRouter.route('/seasons/reset').get(authenticationRequired, async (req, res) => {
  const tpp = await resetBob();
  resetPlayers()
    .then((response) => {
      response.result.ok === 1 ? res.json({ status: 200, tpp }) : res.json({ status: 500 });
    })
    .catch((err) => {
      res.json({ status: 1, reason: err });
    });
});

uploadRouter.route('/seasons/current').get(authenticationRequired, async (req, res) => {
  getCurrentBob().then((currentBob) => {
    res.json(currentBob);
  });
});

//   uploadRouter
//   .route('/seasons/delete')
//   .get(authenticationRequired, async (req, res) => {
//     const resetBob = await updateBobTPP(0);
//     resetPlayers()
//       .then((response) => {
//         response.result.ok === 1 ? res.json({ status: 200 }) : res.json({ status: 500 });
//       })
//       .catch((err) => {
//         res.json({ status: 1, reason: err });
//       });
//   });

export default uploadRouter;
