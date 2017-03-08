/*----------Modules----------*/
import React from 'react';
import {dateFormatter} from 'api';

/*----------Components----------*/

export class ChartControls extends React.Component {
  constructor() {
    super();
  }
  render() {
    let [currentYear, currentMonth, currentDate] = dateFormatter();
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
            <input ref='start' onChange={this.changeDates} type='date' defaultValue={[currentYear - 1, currentMonth, currentDate].join('-')} />
            to
            <input ref='end' onChange={this.changeDates} type='date' defaultValue={[currentYear, currentMonth, currentDate].join('-')} />
          </p>
        </div>
      </div>
    );
  }
}

export default ChartControls;
