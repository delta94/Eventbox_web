import { ACCESS_TOKEN } from 'dan-api/apps/constants';

export default function request(url, options) {

	const headers = new Headers({
		'Content-Type': 'application/json',
	})

	if (localStorage.getItem(ACCESS_TOKEN)) {
		headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
	}

	const defaults = { headers: headers };

	options = Object.assign({}, defaults, options);

	return fetch(url, options)
		.then(response =>
			response.json().then(json => {
				if (!response.ok) {
					return Promise.reject(json);
				}
				return json;
			})
		);
}