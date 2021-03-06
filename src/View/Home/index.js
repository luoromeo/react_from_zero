import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { demoSetState, change } from '../../Action/index';


class Home extends Component {
	componentWillMount () {
	}
	render () {
		return (
			<div>
				<NavLink to='/'>Go Back</NavLink>
				<button onClick={() => {
					// console.log('stop');
					this.props.change('stop');
				}}
				>
					my home
				</button>
				<button onClick={() => {
					// console.log('start');
					// this.props.('start');
				}}
				>
					good
				</button>
				<p>{this.props.isAuth ? 'hello,world' : 'this is my home'}</p>
			</div>
		);
	}
}
Home.propTypes = {
	// cancelInfo: PropTypes.object,
	// memo: PropTypes.string.isRequired,
	isAuth: PropTypes.bool.isRequired,
	// itemList: PropTypes.array.isRequired,
	// fetchUser: PropTypes.func.isRequired,
	change: PropTypes.func.isRequired,
	// demoSetState: PropTypes.func.isRequired
};
function mapStateToProps (state) {
	return {
		isAuth: state.App.isAuth
	};
}
function mapDispatchToProps (dispatch) {
	return {
		change: bindActionCreators(change, dispatch),
		// demoSetState: bindActionCreators(demoSetState, dispatch),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
