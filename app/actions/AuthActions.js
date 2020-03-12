import * as types from './actionConstants';
import { loginService } from '../redux/services/authService';
import { ACCESS_TOKEN } from 'dan-api/apps/constants';

const loginBad = { variant: 'error', message: "Your Username or Password is incorrect. Please try again!" };
const loginFailled = { variant: 'error', message: "Sorry! Something went wrong. Please try again!" };
const logoutOk = { variant: 'success', message: "Your successfully logout" };

export function loginAction(loginrequest, props) {
	return dispatch => {
		dispatch(loginPendingAction());

		loginService(loginrequest)
			.then(user => {
				localStorage.setItem(ACCESS_TOKEN, user.accessToken);
				dispatch(loginSuccessAction(user));
				// ===== redirect to good route =====
				const isActive = user.isActive;
				const userInterests = user.interests;
				if (!isActive) {
					props.history.push("/validate_account");
				} else if (userInterests.length === 0) {
					props.history.push("/welcome");
				} else {
					props.history.push("/");
				}
			}).catch(error => {
				dispatch(loginErrorAction(error));
				if (error.status === 401) {
					props.enqueueSnackbar(loginBad.message, {
						variant: loginBad.variant,
						preventDuplicate: true,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'center',
						},
					});
				} else {
					props.enqueueSnackbar(error.message || loginFailled.message, {
						variant: loginFailled.variant,
						preventDuplicate: true,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'center',
						},
					});
				}
			});
	};
}

export function logoutAction(props) {

	return dispatch => {
		//remove the user access token
		localStorage.removeItem(ACCESS_TOKEN);
		dispatch(logoutSuccessAction());
		props.enqueueSnackbar(logoutOk.message, {
			variant: logoutOk.variant,
			preventDuplicate: true,
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'center',
			},
		});
		// redirect to login after logout
		props.history.push("/login");
	}
}

export const loginSuccessAction = user => ({
	type: types.LOGIN_SUCCESS,
	user,
});

export const loginErrorAction = error => ({
	type: types.LOGIN_ERROR,
	error,
});

export const loginPendingAction = () => ({
	type: types.LOGIN_ERROR
});

export const logoutSuccessAction = () =>({
	type: types.LOGOUT_SUCCESS
});