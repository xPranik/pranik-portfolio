import {dialogsAPI} from "../api/api";
import {reset} from "redux-form";

const ADD_MESSAGE = "ADD_MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE_NEW_MESSAGE_TEXT";
const GET_DIALOGS = "GET_DIALOGS";
const GET_MESSAGES = "GET_MESSAGES";
const SET_OPENED_USER_ID = "SET_OPENED_USER_ID";
const SET_RECIPIEN_PROFILE = "SET_RECIPIEN_PROFILE";

let initialState = {
	dialogs: null,
	messages: null,
	newMessageText: '',
	openedUserId: null,
	resProfile: null
}

export const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_NEW_MESSAGE_TEXT: {
			return {
				...state,
				newMessageText: action.newText
			}
		}
		case GET_DIALOGS: {
			return {
				...state,
				dialogs: action.dialogs
			}
		}
		case GET_MESSAGES: {
			return {
				...state,
				messages: action.body
			}
		}
		case SET_OPENED_USER_ID: {
			return {
				...state,
				openedUserId: action.userId
			}
		}
		case SET_RECIPIEN_PROFILE: {
			return {
				...state,
				resProfile: action.profile
			}
		}
		default:
			return state;
	}
}

export const getDialogsSuccess = (dialogs) => ({type: GET_DIALOGS, dialogs});
export const sendMessageSuccess = (body) => ({type: GET_MESSAGES, body});
export const setOpenedUserId = (userId) => ({type: SET_OPENED_USER_ID, userId});
export const setRecipienProfile = (profile) => ({type: SET_RECIPIEN_PROFILE, profile});

export const getDialogs = () => async (dispatch) => {
	let response = await dialogsAPI.getDialogs();
	dispatch(getDialogsSuccess(response.data));
}
export const startDialog = (userId) => async (dispatch) => {
	let response = await dialogsAPI.startDialog(userId);
	if(response.data.resultCode === 0) {
		dispatch(getDialogsSuccess(response.data));
	}

}

export const getMessages = (userId) => async (dispatch) => {
	let response = await dialogsAPI.getMessages(userId);
	dispatch(sendMessageSuccess(response.data.items));
}
export const getRecipienProfile = (userId) => async (dispatch) => {
	let response = await dialogsAPI.getRecipienProfile(userId);
	dispatch(setRecipienProfile(response));
}

export const sendMessage = (userId, body) => async (dispatch) => {
	let response = await dialogsAPI.sendMessage(userId, body);
	if(response.data.resultCode === 0){
		dispatch(getMessages(userId))
		dispatch(reset('dialogAddMessageForm'));
	}
}

export default dialogsReducer;