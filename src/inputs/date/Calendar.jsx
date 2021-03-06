'use strict';

import Buttons from './Buttons';
import Grid from './Grid';
import Navbar from './Navbar';
import React from 'react';

export default React.createClass({
	
	displayName: 'Calendar',
	
	getInitialState() {
		return {
			viewDate: new Date(this.props.selectedDate.getTime()),
			level: 0
		};
	},
	
	onCalendarMouseDown(e) {
		// Prevent button losing focus whilst navigating calendar
		e.preventDefault();
	},
	
	setViewDate(date) {
		this.setState({
			viewDate: date
		});
	},
	
	setLevel(modifier) {
		const newLevel = this.state.level + modifier;
		
		if (0 <= newLevel && newLevel <= 2) {
			this.setState({
				level: newLevel
			});
		}
	},
	
	render() {
		return (
			<div className={this.props.className + '__positioner'}>
				<div className={this.props.className + '__calendar'}
					onMouseDown={this.onCalendarMouseDown}>
					<Navbar className={this.props.className} viewDate={this.state.viewDate}
						level={this.state.level} monthNames={this.props.monthNames}
						setViewDate={this.setViewDate} setLevel={this.setLevel} />
					<Grid className={this.props.className} viewDate={this.state.viewDate}
						level={this.state.level} monthNames={this.props.monthNames}
						dayNames={this.props.dayNames} firstDoW={this.props.firstDoW}
						selectedDate={this.props.selectedDate} setViewDate={this.setViewDate}
						setSelectedDate={this.props.setSelectedDate} setLevel={this.setLevel}
						setVisible={this.props.setVisible} />
					<Buttons className={this.props.className} setVisible={this.props.setVisible}
						setSelectedDate={this.props.setSelectedDate} today={this.props.today} />
				</div>
			</div>
		);
	}
});
