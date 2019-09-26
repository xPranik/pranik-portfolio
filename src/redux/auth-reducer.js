import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const LOGOUT = 'LOGOUT';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

let initialState = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	isFetching: false,
	captchaUrl: null
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload,
				isAuth: true
			}
		case LOGOUT:
			return {
				...state,
				isAuth: false
			}
		case SET_CAPTCHA_URL:
			return {
				...state,
				captchaUrl: action.url
			}
		default:
			return state;
	}
}

export const onLogout = () => ({type: LOGOUT});
export const getCuptchaUrlSuccess = (url) => ({type: SET_CAPTCHA_URL, url});
export const setAuthUserData = (userId, email, login, isAuth) => ({
	type: SET_USER_DATA,
	payload: {userId, email, login, isAuth}
});

export const getAuthMe = () => async (dispatch) => {
	let response = await authAPI.getAuthMe();

	if (response.data.resultCode === 0) {
		let {id, login, email} = response.data.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
}

export const login = (formdata) => async (dispatch) => {
	let response = await authAPI.login(formdata);
	if (response.data.resultCode === 0) {
		dispatch(getAuthMe());
		dispatch(getCuptchaUrlSuccess(null))
	} else {
		if(response.data.resultCode === 10){
			dispatch(getCaptchaUrl())
		}
		let message = response.data.messages.length > 0 ? response.data.messages : `Some error`;
		dispatch(stopSubmit("login", {_error: message}))
	}
}
export const getCaptchaUrl = () => async (dispatch) => {
	const response = await securityAPI.getCaptcha();
	const captchaUrl = response.data.url;

	dispatch(getCuptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => {
	const response = await authAPI.logout();
	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
		dispatch(onLogout());
	}
}

export default authReducer;