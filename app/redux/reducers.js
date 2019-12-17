/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import uiReducer from './modules/ui';
import initval from './modules/initForm';
import events from './modules/events';
import contact from './modules/contact';
import chat from './modules/chat';
import profile from './modules/profile';
import ecommerce from './modules/ecommerce';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
	const rootReducer = combineReducers({
		form,
		ui: uiReducer,
		initval,
		profile,
		events,
		contact,
		chat,
		ecommerce,
		language: languageProviderReducer,
		router: connectRouter(history),
		...injectedReducers,
	});

	// Wrap the root reducer and return a new root reducer with router state
	const mergeWithRouterState = connectRouter(history);
	return mergeWithRouterState(rootReducer);
}
