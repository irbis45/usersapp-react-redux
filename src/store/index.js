import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers';

export default () => {
	const middleware = process.env.NODE_ENV !== 'production' ? composeWithDevTools(applyMiddleware(thunk, logger)) : composeWithDevTools(applyMiddleware(thunk));

	let store = createStore(rootReducer, middleware);

	if (process.env.NODE_ENV !== 'production') {
		if (module.hot) {
			module.hot.accept('../reducers', () => {
				store.replaceReducer(rootReducer);
			});
		}
	}

	return store;
};