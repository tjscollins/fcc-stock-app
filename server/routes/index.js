'use strict';
/*eslint-disable require-jsdoc*/

const StockDataModel = require('../models/stocks');

const path = process.cwd();

module.exports = function(app, passport) {
  function sendIndex(req, res) {
    res.sendFile(`${path}/public/index.html`);
  }

  function isLoggedIn(req, res, next) {
    /*istanbul ignore next: not sure how to fake req.isAuthenticated() for tests*/
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  app
    .route('/')
    .get(sendIndex);

  app
    .route('/stocks')
    .get((req, res) => {
      StockDataModel
        .find({})
        .then((stocks) => {
          res
            .status(200)
            .send({stocks});
          })
        .catch((err) => {
          console.log(err);
        });
    })
    .post((req, res) => {
      let stock = new StockDataModel(req.body.stock);
      stock
        .save()
        .then(() => {
          StockDataModel
            .find({})
            .then((stocks) => {
              // console.log(stocks);
              res
              .status(200)
              .send({stocks});
            });
        });
    });

  // app
  //   .route('/login')
  //   .get(sendIndex);
  //
  // app
  //   .route('/logout')
  //   .get(function(req, res) {
  //     req.logout();
  //     res.redirect('/login');
  //   });

  // app
  //   .route('/profile')
  //   .get(isLoggedIn, sendIndex);
  //
  // app
  //   .route('/api/me')
  //   .get(isLoggedIn,
  //     /*istanbul ignore next: not sure how to fake req.isAuthenticated() for tests*/
  //     function(req, res) {
  //       res.json(req.user.github);
  //     });

  // app
  //   .route('/auth/github')
  //   .get(passport.authenticate('github'));
  //
  // app
  //   .route('/auth/github/callback')
  //   .get(passport.authenticate('github', {
  //     successRedirect: '/',
  //     failureRedirect: '/login',
  //   }));
};
