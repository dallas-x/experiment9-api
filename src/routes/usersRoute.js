import express from 'express';
import getUsers from '../DB/PLAYERS/getUsers';
import authenticationRequired from '../auth/jwtVerifier';

const statsRouter = express.Router();

statsRouter.route('/users/get').get(authenticationRequired, (req, res) => {
  getUsers()
    .then((response) => {
      console.log(response.data);
      response.status === 200 ? res.json(response.data) : res.json([]);
    })
    .catch((err) => {
      res.json({
        status: 1,
        reason: err,
        data: [{ Player_ID: 0, Player: 'No Player Found', Score: 0 }],
      });
    });
});

// Make this Delete user!
// statsRouter.route('/players/reset').get(authenticationRequired, (req, res) => {
//   resetPlayers()
//     .then((response) => {
//       response.result.ok === 1 ? res.json({ status: 200 }) : res.json({ status: 500 });
//     })
//     .catch((err) => {
//       res.json({ status: 1, reason: err });
//     });
// });

export default statsRouter;
