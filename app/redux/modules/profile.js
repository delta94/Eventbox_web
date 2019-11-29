import { fromJS, List, Map } from 'immutable';
import notif from 'dan-api/ui/notifMessage';
import {
	COMPOSE_PROFILE_BASE,
	DISCARD_PROFILE_BASE,
	COMPOSE_PROFILE_ABOUT,
	DISCARD_PROFILE_ABOUT,
	COMPOSE_PROFILE_INTEREST,
	DISCARD_PROFILE_INTEREST,
	CLOSE_NOTIF
} from 'dan-actions/actionConstants';

const initialState = {
	notifMsg: '',
	openFormBase: false,
	openFormAbout: false,
	openFormInterest: false,
};


const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
	switch (action.type) {
		case COMPOSE_PROFILE_BASE:
			return state.withMutations((mutableState) => {
				mutableState.set('openFormBase', true);
			});
		case DISCARD_PROFILE_BASE:
			return state.withMutations((mutableState) => {
				mutableState
					.set('openFormBase', false)
					.set('notifMsg', notif.discard);
			});
		case COMPOSE_PROFILE_ABOUT:
			return state.withMutations((mutableState) => {
				mutableState.set('openFormAbout', true);
			});
		case DISCARD_PROFILE_ABOUT:
			return state.withMutations((mutableState) => {
				mutableState
					.set('openFormAbout', false)
					.set('notifMsg', notif.discard);
			});
		case COMPOSE_PROFILE_INTEREST:
			return state.withMutations((mutableState) => {
				mutableState.set('openFormInterest', true);
			});
		case DISCARD_PROFILE_INTEREST:
			return state.withMutations((mutableState) => {
				mutableState
					.set('openFormInterest', false)
					.set('notifMsg', notif.discard);
			});
		case CLOSE_NOTIF:
			return state.withMutations((mutableState) => {
				mutableState.set('notifMsg', '');
			});
		default:
			return state;
	}
}
