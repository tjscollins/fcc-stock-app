/*----------Modules----------*/
import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

/*----------Components----------*/
import stockChart from 'stockchart';

export class StockChart extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
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
      <div id='stock-chart' className='graph-box' />
    );
  }
}

StockChart.propTypes = {
  stocks: React.PropTypes.object,
  settings: React.PropTypes.object,
};

export default connect((state) => state)(StockChart);
