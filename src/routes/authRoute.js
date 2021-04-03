import express from 'express';
import passport from 'passport';

const authRouter = express.Router();

authRouter
  .route('/Login')
  .get((req, res) => {
    res.json('What do you want to login?');
  })
  .post(
    passport.authenticate('okta', {
      successRedirect: '/beta/home',
      failureRedirect: '/auth/signIn',
    }),
  );

module.exports = authRouter;
