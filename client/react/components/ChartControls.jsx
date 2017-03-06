/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/

export class ChartControls extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className='chart-controls'>
        <div className='time-buttons'>
          <p>Zoom
            <button>1 m</button>
            <button>3 m</button>
            <button>6 m</button>
            <button>YTD</button>
            <button>1 y</button>
            <button>All</button>
          </p>
        </div>
        <div className='date-range'>
          <p>From
            <input />
            to
            <input />
          </p>
        </div>
      </div>
    );
  }
}

export default ChartControls;
