'use strict';

var React = require('react');
var Utils = require('./utils');

module.exports = React.createClass({
	
	displayName: 'Navbar',
	
	getNavTitle: function() {
		switch (this.props.level) {
			case 0:
				var month = this.props.viewDate.getMonth();
				return this.props.locale.monthNames[month];
			case 1:
				return this.props.viewDate.getFullYear();
			case 2:
				var decade = Utils.getDecadeYears(this.props.viewDate);
				return decade[0].getFullYear() + ' - ' +
					decade[decade.length - 1].getFullYear();
		}
	},
	
	onNavTitleClick: function() {
		this.props.setLevel(+1);
	},
	
	onNavPrevClick: function() {
		switch (this.props.level) {
			case 0:
				var newMonth = Utils.getPrevMonth(this.props.viewDate);
				this.props.setViewDate(newMonth);
				break;
			case 1:
				var newYear = Utils.getPrevYear(this.props.viewDate);
				this.props.setViewDate(newYear);
				break;
			case 2:
				var newDecade = Utils.getPrevDecade(this.props.viewDate);
				this.props.setViewDate(newDecade);
		}
	},
	
	onNavNextClick: function() {
		switch (this.props.level) {
			case 0:
				var newMonth = Utils.getNextMonth(this.props.viewDate);
				this.props.setViewDate(newMonth);
				break;
			case 1:
				var newYear = Utils.getNextYear(this.props.viewDate);
				this.props.setViewDate(newYear);
				break;
			case 2:
				var newDecade = Utils.getNextDecade(this.props.viewDate);
				this.props.setViewDate(newDecade);
		}
	},
	
	render: function() {
		return (
			<div
				className={this.props.className + '__navbar'}
				style={this.styles.navbar}>
				<div
					className={this.props.className + '__navRow'}
					style={this.styles.navRow}>
					<div
						className={this.props.className + '__navPrev'}
						style={this.styles.navPrev}
						onClick={this.onNavPrevClick}>
						{String.fromCharCode('60')}
					</div>
					<div
						className={this.props.className + '__navTitle'}
						style={this.styles.navTitle}
						onClick={this.onNavTitleClick}>
						{this.getNavTitle()}
					</div>
					<div
						className={this.props.className + '__navNext'}
						style={this.styles.navNext}
						onClick={this.onNavNextClick}>
						{String.fromCharCode('62')}
					</div>
				</div>
			</div>
		);
	},
	
	styles: {
		navbar: {
			display: 'table',
			width: '100%',
			cursor: 'pointer'
		},
		navRow: {
			display: 'table-row'
		},
		navPrev: {
			display: 'table-cell'
		},
		navTitle: {
			display: 'table-cell'
		},
		navNext: {
			display: 'table-cell'
		}
	}
	
});
