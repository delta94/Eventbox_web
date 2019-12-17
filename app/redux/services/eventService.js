import { API_BASE_URL, ACCESS_TOKEN } from 'dan-api/apps/constants';
import {request, parseJSON, checkStatus} from '../../utils/request';

// ===== create a new event ======
export function createEvent(file, title, desc, location, category, start, end, userId) {

	const CREATE_EVENT_ENDPOINT = API_BASE_URL + "/events";
	const myHeaders = new Headers();
	if (localStorage.getItem(ACCESS_TOKEN)) {
		myHeaders.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
	}
	var startTime = new Date(start);
	var endTime = new Date(end);

	var formData = new FormData();
	formData.append("file", file);
	formData.append("title", title);
	formData.append("desc", desc);
	formData.append("location", location);
	formData.append("category", category);
	formData.append("startTime", startTime.toISOString());
	formData.append("endTime", endTime.toISOString());
	formData.append("organizerId", userId);

	return fetch(CREATE_EVENT_ENDPOINT, {
		method: "POST",
		body: formData,
		headers: myHeaders,
	}).then(checkStatus).then(parseJSON);
}

// ===== join a event ======
export function joinEvent(eventId, userId) {

	const JOIN_EVENT_ENDPOINT = API_BASE_URL + "/events/" + eventId + "/join";
	const options = { method: 'POST', body: JSON.stringify(userId) };

	return request(JOIN_EVENT_ENDPOINT, options);
}

// ===== find one event by his id =====
export function findEvent(eventId) {

	const FIND_EVENT_ENDPOINT = API_BASE_URL + "/events/" + eventId;
	const options = { method: 'GET' };

	return request(FIND_EVENT_ENDPOINT, options);
}

//===== update one event partially ====
export function updateEventWithPatch(eventId, eventRequest) {

	const UPDATE_EVENT_PATCH_ENDPOINT = API_BASE_URL + "/events/" + eventId;
	const options = { method: 'PATCH', body: JSON.stringify(eventRequest) };
	const ctype = 'application/merge-patch+json';

	return request(UPDATE_EVENT_PATCH_ENDPOINT, options, ctype);
}



//===== find all user matchs events =====
export function matchEvents(userId) {

	const MATCH_EVENT_ENDPOINT = API_BASE_URL + "/events/" + userId + "/matchs";
	const options = { method: 'GET' };

	return request(MATCH_EVENT_ENDPOINT, options);
}

//===== find all user events =====
export function findUserEvents(userid) {

	const USER_EVENT_ENDPOINT = API_BASE_URL + "/events/" + userid + "/all";
	const options = { method: 'GET' };

	return request(USER_EVENT_ENDPOINT, options);
}

//===== find all past events =====
export function findPastEvents() {

	const PAST_EVENT_ENDPOINT = API_BASE_URL + "/events/past";
	const options = { method: 'GET' };

	return request(PAST_EVENT_ENDPOINT, options);
}

//===== find all user past events =====
export function findUserPastEvents(userId) {

	const USER_PAST_EVENT_ENDPOINT = API_BASE_URL + "/events/" + userId + "/past";
	const options = { method: 'GET' };

	return request(USER_PAST_EVENT_ENDPOINT, options);
}

//===== find all incoming events =====
export function findFutureEvents() {

	const FUTURE_EVENT_ENDPOINT = API_BASE_URL + "/events/future";
	const options = { method: 'GET' };

	return request(FUTURE_EVENT_ENDPOINT, options);
}

//===== find all user incoming events =====
export function findUserFutureEvents(userId) {

	const USER_FUTURE_EVENT_ENDPOINT = API_BASE_URL + "/events/" + userId + "/future";
	const options = { method: 'GET' };

	return request(USER_FUTURE_EVENT_ENDPOINT, options);
}

