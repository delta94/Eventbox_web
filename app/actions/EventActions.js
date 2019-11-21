import * as types from './actionConstants';

export const fetchAction = items => ({
	type: types.FETCH_TIMELINE_DATA,
	items,
});

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

export const postCommentAction = (comment) => ({
	type: types.POST_COMMENT,
	comment,
});

export const closeNotifAction = {
	type: types.CLOSE_NOTIF
};

export const composeAction = {
	type: types.COMPOSE_MAIL,
};

export const sendAction = (to, subject, content, attachment) => ({
	type: types.SEND_MAIL,
	to,
	subject,
	content,
	attachment,
});

export const discardAction = {
	type: types.DISCARD_MESSAGE,
};