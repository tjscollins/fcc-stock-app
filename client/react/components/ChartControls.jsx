/*----------Modules----------*/
import React from 'react';

/*----------Components----------*/

export class ChartControls extends React.Component {
  constructor() {
    super();
  }
  render() {
    let today = new Date();
    let [currentYear, currentMonth, currentDate] = [today.getFullYear(), today.getMonth() + 1, today.getDate()];
    currentMonth = currentMonth > 9 ? currentMonth : '0' + currentMonth;
    currentDate = currentDate > 9 ? currentDate : '0' + currentDate;
    let lastYear = currentYear - 1;
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
            <input type='date' value={[lastYear, currentMonth, currentDate].join('-')} />
            to
            <input type='date' value={[currentYear, currentMonth, currentDate].join('-')} />
          </p>
        </div>
      </div>
    );
  }
}

export default ChartControls;
