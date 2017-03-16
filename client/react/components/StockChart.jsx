/*----------Modules----------*/
import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

/*----------Components----------*/
import stockChart from 'stockchart';

/*----------Redux----------*/
import * as actions from 'actions';

export class StockChart extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    let {settings: {startDate, endDate}, dispatch} = this.props;
    let request = {
      method: 'GET',
      url: '/stocks',
      contentType: 'application/json',
      dataType: 'json',
    };
    $
      .ajax(request)
      .done(({stocks}) => {
        stocks.forEach((stock) => {
          dispatch(actions.addStockDisplay(stock.sym, stock.desc, stock.data));
        });
      })
      .fail((error) => {
        console.error(error);
      });
  }
  componentWillReceiveProps(nextProps) {
    // Decide whether to re-generate the graph
    // Use d3 to generate a graph
    let {stocks, settings: {startDate, endDate}} = nextProps;
    $('#linear-chart').remove();
    stockChart(stocks, startDate, endDate);
  }
  render() {
    return (
      <div id='stock-chart' className='graph-box'>
        <div id='tooltip' className='tooltip' style={{opacity: 0}} />
      </div>
    );
  }
}

StockChart.propTypes = {
  stocks: React.PropTypes.object,
  settings: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

export default connect((state) => state)(StockChart);
