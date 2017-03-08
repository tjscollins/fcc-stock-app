/*----------Modules----------*/
import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

/*----------Components----------*/

export class StockCards extends React.Component {
  constructor() {
    super();
  }
  createCard(title, text) {
    return (
      <div className='info-card'>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    );
  }
  createStockCards() {
    // get loaded stocks from state and create info cards
  }
  submit(e) {
    e.preventDefault();
    // Make API Call for new stock and update state with result
    let {startDate, endDate} = this.props;
    let data = JSON.stringify({
      sym: this.refs.sym.value,
      start: startDate,
      end: endDate,
    });
    let request = {
      method: 'GET',
      url: '/stocks',
      data,
      contentType: 'application/json',
      dataType: 'json',
    };
    $
      .ajax(request)
      .done((stock) => {
        dispatch(actions.addStockDisplay(stock.sym, stock.desc, stock.data));
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

          <form onSubmit={this.submit}>
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
  startDate: React.PropTypes.string,
  endDate: React.PropTypes.string,
};

export default connect((state) => state.settings)(StockCards);
