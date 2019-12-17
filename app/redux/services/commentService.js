import { API_BASE_URL, ACCESS_TOKEN } from 'dan-api/apps/constants';
import request from '../../utils/request';

// ===== create a new comment ======
export function createComment(commentRequest) {

	const CREATE_COMMENT_ENDPOINT = API_BASE_URL + "/comments";
	const options = { method: 'POST', body: JSON.stringify(commentRequest) };

	return request(CREATE_COMMENT_ENDPOINT, options);
}

// ====== update comment totally =====
export function updatCommentWithPut(commentId, commentRequest) {

	const UPDATE_COMMENT_PUT_ENDPOINT = API_BASE_URL + "/comments/" + commentId;	
	const options = { method: 'PUT', body: JSON.stringify(commentRequest) };

	return request(UPDATE_COMMENT_PUT_ENDPOINT, options);
}