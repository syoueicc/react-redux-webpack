import React from 'react';
import { render } from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import { testAction } from './actions';
import rootReducers from './reducers';

import App from './components';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

let DevList = [];
const middleware = applyMiddleware(
	promiseMiddleware
);

const DevTools = createDevTools(
	<DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q'>
		<LogMonitor theme='tomorrow' />
	</DockMonitor>
);

if(process.env.NODE_ENV == "development") {
	DevList = [middleware, DevTools.instrument()];
}else {
	DevList = [middleware];
}

const createStoreWithMiddleware = compose(
    ...DevList
);

const initialState = window.__INITIAL_STATE__;

const store = createStoreWithMiddleware(createStore)( rootReducers, initialState );

render(
	<Provider store={store}>
		<div>
			<App />
    		<DevTools />
		</div>
	</Provider>,
    document.querySelector('#rootElement')
);