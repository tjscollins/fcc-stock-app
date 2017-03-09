/*----------Modules----------*/
import React from 'react';
import {connect} from 'react-redux';

/*----------Components----------*/
import stockChart from 'stockchart';

export class StockChart extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    // Use d3 to generate a graph
    let {stocks, settings: {startDate, endDate}} = this.props;
    stockChart(stocks, startDate, endDate);
  }
  componentWillReceiveProps(nextProps) {
    // Decide whether to re-generate the graph
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
