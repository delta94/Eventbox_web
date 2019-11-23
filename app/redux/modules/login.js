import {
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR
} from 'dan-actions/actionConstants';

export default function(state = [], action) {

	let response = action.response;

	switch (action.type) {
		case LOGIN_USER_SUCCESS:
			return { ...state, response };
		case LOGIN_USER_ERROR:
			return { ...state, response };
		default:
			return state;
	}
}