import { ACCESS_TOKEN } from 'dan-api/apps/constants';

/**
 * Parses the JSON returned by a network request
 */
export function parseJSON(response) {
	if (response.status === 204 || response.status === 205) {
		return null;
	}
	if (response.status === 201) {return response;}
	return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 */
export function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

export default function request(url, options, ctype = 'application/json') {

	const headers = new Headers({
		'Content-Type': ctype,
	})

	if (localStorage.getItem(ACCESS_TOKEN)) {
		headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
	}

	const defaults = { headers: headers };

	options = Object.assign({}, defaults, options);

	return fetch(url, options)
		.then(checkStatus)
		.then(parseJSON);
}