import { createAction } from 'redux-actions';

export const TESTACTION = 'TESTACTION';

export const testAction = createAction( TESTACTION, async todo => {
	//let result = await fetch('/api').then( res => res.json() );

	return todo;
});