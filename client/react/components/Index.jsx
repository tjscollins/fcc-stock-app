/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/
import ChartControls from 'ChartControls';
import Footer from 'Footer';
import StockCards from 'StockCards';
import StockChart from 'StockChart';

export class Index extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <div className='chartbox'>
          <h1>{'Stock Chart'}</h1>
          <ChartControls />
          <StockChart />
          <StockCards />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Index;
