/*----------Modules----------*/
import React from 'react';

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
            <input type='text' />
            <button type='submit'>Add</button>
          </form>
        </div>
      </div>
    );
  }
}

export default StockCards;
