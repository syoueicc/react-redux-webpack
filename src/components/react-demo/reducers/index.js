import { handleAction } from 'redux-actions';
import { combineReducers } from 'redux';
import { TESTACTION } from '../actions';

export const rootReducers = handleAction( TESTACTION, (state = [], action) => {
	return Object.assign(
			{},
			...state,
			{ todo: [...state.todo, action.payload] }
		);	
}, {todo:[]});


export default rootReducers;