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
    this.fetchStockData(this.props);
  }
  componentWillReceiveProps(nextProps) {
    // Decide whether to re-generate the graph
    // Use d3 to generate a graph
    let {stocks, settings: {startDate, endDate}} = nextProps;
    if(startDate !== this.props.settings.startDate
    || endDate !== this.props.settings.endDate) {
      this.fetchStockData(nextProps);
    }
    if($('#linear-chart').length === 0
      || stocks !== this.props.stocks
      || startDate !== this.props.settings.startDate
      || endDate !== this.props.settings.endDate) {
      $('#linear-chart').remove();
      stockChart(stocks, startDate, endDate);
    }
  }
  fetchStockData(props) {
    let {settings: {startDate, endDate}, dispatch, stocks: {list}} = props;
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
          dispatch(actions.updateStockData(stock.sym, stock.desc, stock.data));
        });
      })
      .fail((error) => {
        console.error(error);
      });
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
