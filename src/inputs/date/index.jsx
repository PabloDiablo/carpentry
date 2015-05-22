'use strict';

var React = require('react');
var GlobalUtils = require('../../utils');
var Utils = require('./utils');
var Input = require('./input');
var Calendar = require('./calendar');

module.exports = React.createClass({
	
	displayName: 'DateInput',
	
	propTypes: {
		className: React.PropTypes.string,
		initDate: function(props, propName, componentName) {
			if (Object.prototype.toString.call(props[propName]) !== '[object Date]')
				return new Error(propName + ' must be a Date. Check' +
					' the props of ' + componentName);
		},
		size: React.PropTypes.number,
		iconSrc: React.PropTypes.string.isRequired,
		format: React.PropTypes.string,
		layout: React.PropTypes.number,
		locale: React.PropTypes.shape({
			dayNames: React.PropTypes.arrayOf(React.PropTypes.string),
			monthNames: React.PropTypes.arrayOf(React.PropTypes.string),
			today: React.PropTypes.string
		}),
		firstDoW: function(props, propName, componentName) {
			if (!GlobalUtils.isNum(props[propName]))
				return new Error(propName + ' must be a Number. Check' +
					' the props of ' + componentName);
			if (props[propName] % 1 !== 0)
				return new Error(propName + ' must be an integer.' +
					' Check the props of ' + componentName);
			if (props[propName] < 0 || 6 < props[propName])
				return new Error(propName + ' must be a value between' +
					' 0 and 6. Check the props of ' + componentName);
		},
		// disabled: React.PropTypes.bool,
		// dateRange: React.PropTypes.shape({
		// 	firstDate: React.PropTypes.object,
		// 	lastDate: React.PropTypes.object
		// }),
		// minDate: React.PropTypes.string,
		// maxDate: React.PropTypes.string,
		setDate: React.PropTypes.func.isRequired
	},
	
	getDefaultProps: function() {
		return {
			className: 'DateInput',
			initDate: new Date(),
			size: 10,
			format: 'YYYY-MM-DD',
			layout: 0,
			locale: {
				dayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
					'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				today: 'Today'
			},
			firstDoW: 1
			// disabled: false,
			// dateRange: null,
			// minDate: null,
			// maxDate: null
		};
	},
	
	getInitialState: function() {
		var initDate = Utils.cloneDate(this.props.initDate);
		
		return {
			selectedDate: initDate,
			visible: false
		};
	},
	
	setDate: function(date) {
		this.setState({ selectedDate: date });
		this.props.setDate(date);
	},
	
	setVisible: function(visible) {
		this.setState({ visible: visible });
	},
	
	// Fix for IE changing focus to child elements which
	// would incorrectly trigger blur and hide the calendar
	onIconMouseDown: function(e) {
		e.preventDefault();
	},
	
	onIconClick: function(e) {
		e.target.focus();
		this.setVisible(true);
	},
	
	onIconFocus: function() {
		this.setVisible(true);
	},
	
	onIconBlur: function() {
		this.setVisible(false);
	},
	
	render: function() {
		return (
			<div
				className={this.props.className}
				style={this.styles.dateInput}>
				<Input
					className={this.props.className}
					size={this.props.size}
					format={this.props.format}
					selectedDate={this.state.selectedDate}
					setDate={this.setDate} />
				{this.props.iconSrc !== null ?
					<div
						className={this.props.className + '__icon'}
						style={GlobalUtils.merge([
							this.styles.icon,
							this.props.layout === 1 &&
								this.styles.iconInside])}>
						<img
							style={this.styles.iconImg}
							src={this.props.iconSrc}
							tabIndex={0}
							onMouseDown={this.onIconMouseDown}
							onClick={this.onIconClick}
							onFocus={this.onIconFocus}
							onBlur={this.onIconBlur} />
					</div>
					: false}
				{this.state.visible ?
					<Calendar
						className={this.props.className}
						locale={this.props.locale}
						firstDoW={this.props.firstDoW}
						selectedDate={this.state.selectedDate}
						setDate={this.setDate}
						setVisible={this.setVisible} />
					: false}
			</div>
		);
	},
	
	styles: {
		dateInput: {
			display: 'inline-block',
			position: 'relative'
		},
		icon: {
			display: 'inline-block',
			verticalAlign: 'top',
			height: '100%'
		},
		iconImg: {
			display: 'block',
			minHeight: '100%',
			maxHeight: '100%',
			cursor: 'pointer'
		},
		iconInside: {
			position: 'absolute',
			top: 0, right: 0
		}
	}
	
});
