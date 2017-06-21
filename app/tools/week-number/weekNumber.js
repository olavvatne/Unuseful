import React from 'react';
import Moment from 'moment';

class WeekNumber extends React.Component {

	constructor() {
		super();

		this.state = {
			weeknumber: null,
			weekStart: null,
			weekEnd: null
		};
	}

	componentDidMount() {
		// Update state to force re-render.
		// This will ensure that the component is rendered on the client, potentially fixing timezone issues.
		var date = new Date();
		var weeknumber = Moment(date).isoWeek();

		var weekStart = Moment().day("Monday").isoWeek(weeknumber);
		var weekEnd = Moment().day("Sunday").isoWeek(weeknumber);

		weekStart = weekStart.format('dddd[,] MMM D YYYY');
		weekEnd = weekEnd.format('dddd[,] MMM D YYYY');

		this.setState({
			weeknumber: weeknumber,
			weekStart: weekStart,
			weekEnd: weekEnd
		});
	}

	render() {
		return (
      <div className="mui-container">
  			<div className="mui-row">
  				<div className="mui-col-md12">
  					<div className="mui--text-accent mui--text-center" id="weeknumber">
  						{this.state.weeknumber}
  					</div>
  				</div>
  			</div>
  			<div className="mui-row">
  				<div className="mui-col-md12 mui--text-center">
  					<p>This week started at <b>{this.state.weekStart}</b> and ends at <b>{this.state.weekEnd}</b>.</p>
  				</div>
        </div>
			</div>
		);
	}
}

module.exports = WeekNumber;
