/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
import React from 'react';
// import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

/*----------Redux----------*/
// import {Provider} from 'react-redux'; import {configure} from
// 'configureStore';

/*----------Components----------*/
import {StockChart} from 'StockChart';

describe('StockChart', () => {
  it('should exist', () => {
    expect(StockChart).toExist();
  });

  it('should render without errors', () => {
    try {
      TestUtils.renderIntoDocument(<StockChart />);
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
