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
import {ChartControls} from 'ChartControls';

describe('ChartControls', () => {
  it('should exist', () => {
    expect(ChartControls).toExist();
  });

  it('should render without errors', () => {
    try {
      TestUtils.renderIntoDocument(<ChartControls />);
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
