import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "ADD_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_AUTH_USER_PROFILE = "SET_AUTH_USER_PROFILE";
const TOGGLE_USER_INFO = "TOGGLE_USER_INFO";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";


let initialState = {
	posts: [
		{'id': 1, 'message': 'This is my first post', 'likesCount': 3},
		{'id': 2, 'message': 'Hi, I\'m learning ReactJs', 'likesCount': 5}
	],
	profile: null,
	authProfile: null,
	showMoreInfo: false,
	status: ''
}

const profileReducer = (state = initialState, action) => {

	switch (action.type) {
		case ADD_POST: {
			let newPost = {
				id: 3,
				message: action.text,
				likesCount: 0
			};
			return {
				...state,
				posts: [...state.posts, newPost],
			}
		}
		case UPDATE_NEW_POST_TEXT: {
			return {
				...state,
				newPostText: action.newPostText
			};
		}
		case SET_USER_PROFILE: {
			return {
				...state,
				profile: action.profile
			};
		}
		case SET_AUTH_USER_PROFILE: {
			return {
				...state,
				authProfile: action.profile
			};
		}
		case TOGGLE_USER_INFO: {
			return {
				...state,
				showMoreInfo: !state.showMoreInfo
			};
		}
		case SET_STATUS: {
			return {
				...state,
				status: action.status
			};
		}
		case DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter(p => p.id != action.postId)
			};
		}
		case SAVE_PHOTO_SUCCESS: {
			return {
				...state,
				profile: {...state.profile, photos: action.photos}
			};
		}
		default:
			return state
	}
}

export const addPostActionCreator = (text) => ({type: ADD_POST, text});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setAuthUserProfile = (profile) => ({type: SET_AUTH_USER_PROFILE, profile});
export const toggleUserInfo = () => ({type: TOGGLE_USER_INFO});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});

export const getProfile = (userID) => async (dispatch) => {
	let response = await profileAPI.getProfile(userID);
	dispatch(setUserProfile(response));
}
export const getAuthProfile = (userID) => async (dispatch) => {
	let response = await profileAPI.getProfile(userID);
	dispatch(setAuthUserProfile(response));
}

export const getStatus = (userID) => async (dispatch) => {
	let response = await profileAPI.getStatus(userID);
	dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
	let response = await profileAPI.updateStatus(status);
	if (response.data.resultCode === 0) {
		dispatch(setStatus(status));
	}
}

export const setUserAvatar = (file) => async (dispatch) => {
	let response = await profileAPI.setUserAvatar(file);
	if (response.data.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.data.photos));
	}
}

export const saveProfile = (profile) => async (dispatch, getState) => {
	const userId = getState().auth.userId;
	let response = await profileAPI.saveProfile(profile);

	if (response.data.resultCode === 0) {
		dispatch(getProfile(userId))
	} else{
		let message = response.data.messages.length > 0 ? response.data.messages : `Some error`;
		dispatch(stopSubmit("edit-profile-data", {_error: response.data.messages[0]}));
		return Promise.reject({_error: response.data.messages[0]})
	}
}


export default profileReducer;