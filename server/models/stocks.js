'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * StockData object that stores information about the price of a stock over time.
 *
 *    sym   -- Stock ticker symbol for the stock
 *    data  -- A 2-D array listing Date/Price pairs for the stock in chronological order
 *    desc  -- A brief description of the company
 */
const StockData = new Schema({
  sym: {
    type: String,
  },
  data: {
    type: Array,
    validate: (data) => {
      return data.every((d) => {
        return d.length === 2 && d.every((i) => {
          return typeof i === 'number';
        });
      });
    },
  },
  desc: {
    type: String,
  }
});

module.exports = mongoose.model('Stocks', StockData);
