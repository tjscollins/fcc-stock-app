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
import {StockCards} from 'StockCards';

describe('StockCards', () => {
  it('should exist', () => {
    expect(StockCards).toExist();
  });

  it('should render without errors', () => {
    try {
      TestUtils.renderIntoDocument(<StockCards />);
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
