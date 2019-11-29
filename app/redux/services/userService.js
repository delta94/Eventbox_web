import { API_BASE_URL, ACCESS_TOKEN } from 'dan-api/apps/constants';
import request from '../../utils/request';

export function getCurrentUser() {

	const CURRENT_USER_ENDPOINT = API_BASE_URL + "/user/me";
	
	const options = { method: 'GET' }

	return request(CURRENT_USER_ENDPOINT, options);
}