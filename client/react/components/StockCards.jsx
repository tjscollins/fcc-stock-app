/*----------Modules----------*/
import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

/*----------Redux----------*/
import * as actions from 'actions';

/*----------Components----------*/

export class StockCards extends React.Component {
  constructor() {
    super();
  }
  createCard(stock) {
    return (
      <div className='info-card'>
        <h1>{stock.sym}</h1>
        <p>{stock.desc}</p>
      </div>
    );
  }
  createStockCards() {
    // get loaded stocks from state and create info cards
    let {stocks: {list}} = this.props;
    return list.map(this.createCard);
  }
  submit(e) {
    e.preventDefault();
    // Make API Call for new stock and update state with result
    let {settings: {startDate, endDate}, dispatch} = this.props;
    let data = JSON.stringify({
      sym: this.refs.sym.value,
      start: startDate,
      end: endDate,
    });
    let request = {
      method: 'POST',
      url: '/stocks',
      data,
      contentType: 'application/json',
      dataType: 'json',
    };
    $
      .ajax(request)
      .done((stock) => {
        console.log(stock);
        dispatch(actions.addStockDisplay(stock.sym, stock.desc, stock.data));
        this.refs.sym.value = '';
      })
      .fail((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div className='stock-cards'>
        {this.createStockCards()}

        <div className='search-card'>
          <form onSubmit={this.submit.bind(this)}>
            <label>
              Search for stocks:
            </label>
            <input ref='sym' type='text' />
            <button type='submit'>Add</button>
          </form>
        </div>
      </div>
    );
  }
}

StockCards.propTypes = {
  settings: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  stocks: React.PropTypes.object,
};

export default connect((state) => state)(StockCards);
