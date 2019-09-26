import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/helper";

const FOLLOW_USER = 'FOLLOW-USER';
const UNFOLLOW_USER = 'UNFOLLOW-USER';
const SET_USERS = 'SET-USERS';
const SET_TOTAL_USERS = 'SET-TOTAL-USERS';
const MERGE_USERS_DATA = 'MERGE-USERS-DATA';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

let initialState = {
	users: [],
	pageSize: 16,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: []
}

export const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW_USER:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", {followed: true} )
			}
		case UNFOLLOW_USER:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", {followed: false} )
			}
		case SET_USERS:
			return {
				...state,
				users: action.users
			}
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.pageID
			}
		case SET_TOTAL_USERS:
			return {
				...state,
				totalUsersCount: action.totalCount
			}
		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching
			}
		case MERGE_USERS_DATA:
			return {
				...state,
				users: action.data
			}
		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id != action.userId)
			}
		default:
			return state;
	}
}

export const followSuccess = (userId) => ({type: FOLLOW_USER, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW_USER, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (pageID) => ({type: SET_CURRENT_PAGE, pageID});
export const setTotalUsers = (totalCount) => ({type: SET_TOTAL_USERS, totalCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const mergeUsersData = (data) => ({type: MERGE_USERS_DATA, data});
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});

export const requestUsers = (currentPage, pageSize) => {
	return async (dispatch) => {
		dispatch(toggleIsFetching(true));
		dispatch(setCurrentPage(currentPage));
		let data = await usersAPI.getUsers(currentPage, pageSize)
		dispatch(toggleIsFetching(false));
		dispatch(setUsers(data.items));
		dispatch(setTotalUsers(data.totalCount));
	}
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {

	dispatch(toggleFollowingProgress(true, userId));
	let response = await apiMethod(userId);
	if (response.data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId) => (dispatch) => {
	followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);

}

export const unfollow = (userId) => (dispatch) => {
	followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
}

export default usersReducer;