import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { testAction } from '../actions';


export class App extends Component {
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		const { dispatch } = this.props;
	}

	say() {
		const { dispatch } = this.props;
		dispatch(testAction(this.refs.text.value));
	}

	render() {
		const { result } = this.props;
		return (
			<div>
				<h1>HELLO WORLD!!!</h1>
				<textarea ref='text'></textarea>
				<br />
				<button onClick={() => this.say() }>点击</button>
				{
					result.map( (item,index) => {
						return <p key={index}> {item} </p>;
					})
				}
			</div>
		)
	}
}

App.propTypes = {
	result: PropTypes.arrayOf( PropTypes.string )
}

function selector(state) {
	return {
		result: state.todo
	}
}

export default connect(selector)(App);