import { fromJS, List, Map } from 'immutable';
import notif from 'dan-api/ui/notifMessage';
import dummy from 'dan-api/dummy/dummyContents';
import {
	FETCH_TIMELINE_DATA,
	POST,
	TOGGLE_LIKE,
	FETCH_COMMENT_DATA,
	POST_COMMENT,
	COMPOSE_MAIL,
	SEND_MAIL,
	DISCARD_MESSAGE,
	CLOSE_NOTIF
} from 'dan-actions/actionConstants';
import { getDate, getTime } from '../helpers/dateTimeHelper';

const initialState = {
	dataTimeline: List([]),
	commentIndex: 0,
	eventIndex: 0,
	notifMsg: '',
	openForm: false,
};

const icon = privacyType => {
	switch (privacyType) {
		case 'public':
			return 'language';
		case 'friends':
			return 'people';
		default:
			return 'lock';
	}
};

const buildTimeline = (title, privacy, text, image) => {
	const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	const imageSrc = image !== undefined ? URL.createObjectURL(image[0]) : '';
	return Map({
		id,
		name: 'John Doe',
		date: getDate(),
		time: getTime(),
		icon: icon(privacy),
		avatar: dummy.user.avatar,
		image: imageSrc,
		content: text,
		liked: false,
		title: title,
		comments: List([])
	});
};

const buildComment = (message, curData) => {
	const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	const newData = Map({
		id,
		from: 'John Doe',
		avatar: dummy.user.avatar,
		date: getDate(),
		message,
	});
	return curData.push(newData);
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
	switch (action.type) {
		case FETCH_TIMELINE_DATA:
			return state.withMutations((mutableState) => {
				const index = state.get('dataTimeline').indexOf(action.item);
				const items = fromJS(action.items);
				mutableState.set('dataTimeline', items);
				mutableState.set('eventIndex', index);
			});
		case POST:
			return state.withMutations((mutableState) => {
				mutableState
					.update(
						'dataTimeline',
						dataTimeline => dataTimeline.unshift(
							buildTimeline(action.title, action.privacy, action.text, action.media)
						)
					)
					.set('notifMsg', notif.posted);
			});
		case TOGGLE_LIKE:
			return state.withMutations((mutableState) => {
				const index = state.get('dataTimeline').indexOf(action.item);
				mutableState.update('dataTimeline', dataTimeline => dataTimeline
					.setIn([index, 'liked'], !state.getIn(['dataTimeline', index, 'liked']))
				);
			});
		case FETCH_COMMENT_DATA:
			return state.withMutations((mutableState) => {
				const index = state.get('dataTimeline').indexOf(action.item);
				mutableState.set('commentIndex', index);
			});
		case POST_COMMENT:
			return state.withMutations((mutableState) => {
				mutableState
					.update('dataTimeline',
						dataTimeline => dataTimeline.setIn(
							[state.get('commentIndex'), 'comments'],
							buildComment(action.comment, state.getIn(['dataTimeline', state.get('commentIndex'), 'comments']))
						)
					)
					.set('notifMsg', notif.commented);
			});
		case COMPOSE_MAIL:
			return state.withMutations((mutableState) => {
				mutableState.set('openForm', true);
			});
		case SEND_MAIL:
			return state.withMutations((mutableState) => {
				const newMail = null; // to check
				mutableState
					.update('inbox', inbox => inbox.unshift(newMail))
					.set('selectedMailId', '')
					.set('openForm', false)
					.set('notifMsg', notif.sent);
			});
		case DISCARD_MESSAGE:
			return state.withMutations((mutableState) => {
				mutableState
					.set('openForm', false)
					.set('selectedMailId', '')
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
