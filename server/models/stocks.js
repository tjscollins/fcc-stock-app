'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * StockData object that stores information about the price of a stock over time.
 *
 *    sym       -- Stock ticker symbol for the stock
 *    data      -- A 2-D array listing Date/Price pairs for the stock in chronological order
 *    desc      -- A brief description of the company
 *    displayed -- A flag to indicate whether a user should display a stock on initial load
 */
const StockData = new Schema({
  sym: {
    type: String,
  },
  data: {
    type: Array,
    validate: (data) => {
      return data.every((d) => {
        return d.length === 2 && typeof d[0] === 'string' && typeof d[1] === 'number';
      });
    },
  },
  desc: {
    type: String,
  },
  displayed: {
    type: Boolean,
  }
});

module.exports = mongoose.model('Stocks', StockData);
