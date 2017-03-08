'use strict';
/*eslint-disable require-jsdoc*/
const http = require('http');
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
      let {sym, start, end} = req.body;
      let stockEndpoint = `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22${sym}%22%20and%20startDate%20%3D%20%22${start}%22%20and%20endDate%20%3D%20%22${end}%22&format=json&diagnostics=false&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;
      http.get(stockEndpoint, (httpResponse) => {
        let rawData = '';
        let data = {};
        httpResponse.on('data', (chunk) => {
          rawData += chunk;
        });
        httpResponse.on('end', processRequest);
        function compareStockDates(a, b) {
          if (a[0] < b[0])
            return -1;
          if (a[0] > b[0])
            return 1;
          return 0;
        }
        function processRequest() {
          data = Object.assign(JSON.parse(rawData).query, {sym});
          StockDataModel
            .findOne({sym})
            .then((stock) => {
              let priceData = data
                .results
                .quote
                .map((datum) => {
                  return [
                    datum['Date'],
                    parseFloat(datum['Close']),
                  ];
                });
              if (stock) {
                try {
                  priceData = priceData.concat(stock.data);
                  priceData.sort(compareStockDates);
                  priceData = priceData.filter((datum, i) => {
                    return i === priceData.length - 1
                      ? true
                      : datum[0] !== priceData[i + 1][0];
                  });
                  stock.data = priceData;
                  stock.save();
                  res
                    .status(200)
                    .send(stock);
                } catch (err) {
                  console.log(err);
                  res
                    .status(500)
                    .send({err});
                }
              } else {
                let newStock = new StockDataModel({
                  sym: data.sym,
                  data: priceData.sort(compareStockDates),
                  desc: '',
                });
                newStock
                  .save()
                  .then((stock) => {
                    res
                      .status(200)
                      .send(stock);
                  });
              }
            });
        }
      });
    });

  // app   .route('/login')   .get(sendIndex);
  //
  // app   .route('/logout')   .get(function(req, res) {     req.logout();
  // res.redirect('/login');   }); app   .route('/profile')   .get(isLoggedIn,
  // sendIndex);
  //
  // app   .route('/api/me')   .get(isLoggedIn,     /*istanbul ignore next: not
  // sure how to fake req.isAuthenticated() for tests*/     function(req, res) {
  // res.json(req.user.github);     }); app   .route('/auth/github')
  // .get(passport.authenticate('github'));
  //
  // app   .route('/auth/github/callback')   .get(passport.authenticate('github',
  // {     successRedirect: '/',     failureRedirect: '/login',   }));
};
