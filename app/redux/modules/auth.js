import { fromJS } from 'immutable';
import { 
	LOGIN_SUCCESS, 
	LOGIN_ERROR, 
	LOGIN_PENDING,
	LOGOUT_SUCCESS, 
} from 'dan-actions/actionConstants';

const initialState = {
	isAuthenticated: false,
	user: {},
	error: null,
	pending: false,

};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return state.withMutations((mutableState) => {
				mutableState.set('user', action.user);
				mutableState.set('isAuthenticated', true);
				mutableState.set('pending', false);
			});
		case LOGIN_ERROR:
			return state.withMutations((mutableState) => {
				mutableState.set('error', action.error);
				mutableState.set('isAuthenticated', false);
				mutableState.set('pending', false);
			});
		case LOGIN_PENDING:
			return state.withMutations((mutableState) => {
				mutableState.set('pending', true);
			});
		case LOGOUT_SUCCESS:
			return state.withMutations((mutableState) => {
				mutableState.set('isAuthenticated', false);
				mutableState.set('pending', false);
				mutableState.set('user', {});
			});
		default:
			return state;
	}
}