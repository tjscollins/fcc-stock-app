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
import {Footer} from 'Footer';

describe('Footer', () => {
  it('should exist', () => {
    expect(Footer).toExist();
  });

  it('should render without errors', () => {
    try {
      TestUtils.renderIntoDocument(<Footer />);
    } catch (error) {
      expect(error).toNotExist();
    }
  });
});
