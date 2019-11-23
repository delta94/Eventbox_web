import { API_BASE_URL } from 'dan-api/apps/constants';
import request from '../../utils/request';

export function registerService(registerRequest) {

	const REGISTER_API_ENDPOINT = API_BASE_URL + '/auth/register';
	const options = {
		method: 'POST',
		body: JSON.stringify(registerRequest)
	}
	return request(REGISTER_API_ENDPOINT, options);
}

export function loginService(loginRequest) {

	const LOGIN_API_ENDPOINT = API_BASE_URL + '/auth/login';
	const options = {
		method: 'POST',
		body: JSON.stringify(loginRequest)
	}
	return request(LOGIN_API_ENDPOINT, options);
}

export function checkUsernameAvailability(username) {

	const CHECK_USERNAME_ENDPOINT = API_BASE_URL + '/auth/checkUsernameAvailability?username=' + username;
	const options = {
		method: 'GET',
	}
	return request(CHECK_USERNAME_ENDPOINT, options);
}

export function checkEmailAvailability(email) {

	const CHECK_EMAIL_ENDPOINT = API_BASE_URL + '/auth/checkEmailAvailability?email=' + email;
	const options = {
		method: 'GET',
	}
	return request(CHECK_EMAIL_ENDPOINT, options);
}