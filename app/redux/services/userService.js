import { API_BASE_URL, ACCESS_TOKEN } from 'dan-api/apps/constants';
import request from '../../utils/request';

// ===== return a list of all user profile ====
export function findUsers() {

	const ALL_USERS_ENDPOINT = API_BASE_URL + "/users";	
	const options = { method: 'GET' };

	return request(ALL_USERS_ENDPOINT, options);
}

// ==== return a profile of username =====
export function findUserProfile(username) {

	const USER_PROFILE_ENDPOINT = API_BASE_URL + "/users/" + username;	
	const options = { method: 'GET' };

	if (!localStorage.getItem(ACCESS_TOKEN)) {return Promise.reject("No access token set");}

	return request(USER_PROFILE_ENDPOINT, options);
}

// ====== update user profile totally =====
export function updateUserWithPut(username, userRequest) {

	const UPDATE_USER_PUT_ENDPOINT = API_BASE_URL + "/users/" + username;	
	const options = { method: 'PUT', body: JSON.stringify(userRequest) };

	return request(UPDATE_USER_PUT_ENDPOINT, options);
}

//===== update user profile partially ====
export function updateUserWithPatch(username, userRequest) {

	const UPDATE_USER_PATCH_ENDPOINT = API_BASE_URL + "/users/" + username;	
	const options = { method: 'PATCH', body: JSON.stringify(userRequest) };
	const ctype = 'application/merge-patch+json';

	return request(UPDATE_USER_PATCH_ENDPOINT, options, ctype);
}

