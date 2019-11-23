import * as types from './actionConstants';

export const registerUserAction = (user) => ({
	type: types.REGISTER_USER,
	user
});

export const loginUserAction = (user) => ({
	type: types.LOGIN_USER,
	user
});