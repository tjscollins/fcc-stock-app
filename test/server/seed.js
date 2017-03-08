'use strict';

const {ObjectID} = require('mongodb');
const UserModel = require('./../../server/models/users.js');
const StockDataModel = require('../../server/models/stocks');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [
  {
    _id: userOneID,
    github: {
      id: '123',
      displayName: 'John Doe',
      username: 'jdoe',
      publicRepos: 1,
    },
  },
  {
    _id: userTwoID,
    github: {
      id: '321',
      displayName: 'Jane Doe',
      username: 'janeBetterThanJohn',
      publicRepos: 100,
    },
  },
];

const stocks = [
  {
    sym: 'SYM',
    data: [
      [
        '1', 1,
      ],
      [
      '  2', 1,
      ],
      [
        '3', 2,
      ],
    ],
    desc: 'A new company'
  },
  {
    sym: 'TAG',
    data: [
      [
        '1', 6,
      ],
      [
        '2', 5,
      ],
      [
        '3', 4,
      ],
    ],
    desc: 'An old company'
  },

];

const populateServer = (done) => {
  UserModel
    .remove({})
    .then(() => {
      return UserModel.insertMany(users);
    });
  StockDataModel
    .remove({})
    .then(() => {
      return StockDataModel.insertMany(stocks);
    });
  done();
};

module.exports = {
  stocks, users, populateServer,
};
