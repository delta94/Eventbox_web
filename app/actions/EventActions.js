import * as types from './actionConstants';
import { findUserFutureEvents, findFutureEvents } from '../redux/services/eventService';

export const fetchAction = items => ({
	type: types.FETCH_TIMELINE_DATA,
	items,
});

export const fetchEventSuccessAction = items => ({
	type: types.FETCH_EVENT_SUCCESS,
	items,
});

export const fetchEventErrorAction = error => ({
	type: types.FETCH_EVENT_ERROR,
	error,
});

export const fetchEventPendingAction = () => ({
	type: types.FETCH_EVENT_PENDING,
})

export const postAction = (title, privacy, text, media) => ({
	type: types.POST,
	title,
	privacy,
	text,
	media,
});

export const toggleLikeAction = item => ({
	type: types.TOGGLE_LIKE,
	item,
});

export const fetchCommentAction = item => ({
	type: types.FETCH_COMMENT_DATA,
	item,
});

export const detailAction = item => ({
	type: types.SHOW_DETAIL_EVENT,
	item
});

export const postCommentAction = (comment) => ({
	type: types.POST_COMMENT,
	comment,
});

export const closeNotifAction = {
	type: types.CLOSE_NOTIF
};

export const composeAction = {
	type: types.COMPOSE_EVENT,
};

export const discardAction = {
	type: types.DISCARD_EVENT,
};

export const searchAction = keyword => ({
	type: types.SEARCH_EVENT,
	keyword,
});

export function fetchUserFutureEventAction(userId) {
	return dispatch => {
		dispatch(fetchEventPendingAction());

		findFutureEvents()
			.then(events => {
				dispatch(fetchEventSuccessAction(events));
			}).catch(error => {
				dispatch(fetchEventErrorAction(error));
			});
	};
}