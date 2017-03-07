/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/

export class StockChart extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    // Use d3 to generate a graph
  }
  componentWillReceiveProps(nextProps) {
    // Decide whether to re-generate the graph
  }
  render() {
    return (
      <div className='graph-box' />
    );
  }
}

export default StockChart;
