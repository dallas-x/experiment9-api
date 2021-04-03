import express from 'express';
import { updatePlayersStats, selectStats } from '../controllers/processGame';

const testRouter = express.Router();
const playerStats = {
  Players: [
    { Rank: 1, Player: 'Dallas Baker', Player_ID: 'kd13', Score: 32, TPP: 10, Games_Played: 5 },
    { Rank: 2, Player: 'Zach n Cody', Player_ID: 'kd42', Score: 12, TPP: 10, Games_Played: 5 },
    { Rank: 3, Player: 'Bob the Builder', Player_ID: 'kd92', Score: 1, TPP: 10, Games_Played: 5 },
    { Rank: 4, Player: 'Goku', Player_ID: 'kd99', Score: 98, TPP: 10, Games_Played: 5 },
  ],
};

testRouter
  .route('/testUpdate')
  .get((req, res) => {
    updatePlayersStats(playerStats.Players)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .post((req, res) => {
    res.send('you can not post sorry :/');
  });

testRouter.route('/testSelect').get((req, res) => {
  selectStats()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

export default testRouter;
