/*----------Modules----------*/
import React from 'react';
import {connect} from 'react-redux';
import {dateFormatter} from 'api';

/*----------Components----------*/

/*----------Redux----------*/
import * as actions from 'actions';

export class ChartControls extends React.Component {
  constructor() {
    super();
  }
  changeDates(event) {
    event.preventDefault();
    const {dispatch} = this.props;
    const {start, end} = this.refs;
    dispatch(actions.changeDates(start.value, end.value));
  }
  setMonthsAgo(months) {
    const {dispatch} = this.props;
    const {end} = this.refs;
    let newStart = end.value.split('-');
    newStart[1] = parseInt(newStart[1]) - months;
    if(newStart[1] < 1) {
      newStart[1] += 12;
      newStart[0] = parseInt(newStart[0]) - 1;
    }
    newStart[1] = newStart[1] > 9 ? newStart[1] : '0'+newStart[1];
    dispatch(actions.changeDates(newStart.join('-'), end.value));
    console.log(newStart.join('-'), this.refs.start.value);
    this.refs.start.value=newStart.join('-');
  }
  setYTD() {
    const {dispatch} = this.props;
    const {end} = this.refs;
    let newStart = end.value.split('-');
    newStart[1] = '01';
    newStart[2] = '01';
    this.refs.start.value=newStart.join('-');
    dispatch(actions.changeDates(newStart.join('-'), end.value));
  }
  render() {
    let [currentYear, currentMonth, currentDate] = dateFormatter();
    return (
      <div className='chart-controls'>
        <div className='time-buttons'>
          <p>Zoom
            <button onClick={this.setMonthsAgo.bind(this, 1)}>1 m</button>
            <button onClick={this.setMonthsAgo.bind(this, 3)}>3 m</button>
            <button onClick={this.setMonthsAgo.bind(this, 6)}>6 m</button>
            <button onClick={this.setYTD.bind(this)}>YTD</button>
            <button onClick={this.setMonthsAgo.bind(this, 12)}>1 y</button>
          </p>
        </div>
        <div className='date-range'>
          <p>From
            <input ref='start' onChange={this.changeDates.bind(this)} type='date' defaultValue={[currentYear - 1, currentMonth, currentDate].join('-')} />
            to
            <input ref='end' onChange={this.changeDates.bind(this)} type='date' defaultValue={[currentYear, currentMonth, currentDate].join('-')} />
          </p>
        </div>
      </div>
    );
  }
}

ChartControls.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect((state) => state)(ChartControls);
