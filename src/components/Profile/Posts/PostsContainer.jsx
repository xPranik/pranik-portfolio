import React from 'react'
import {addPostActionCreator} from "../../../redux/profile-reducer";
import Posts from "./Posts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText,
		profile: state.profilePage.profile
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		addPost: (text) => {
			dispatch(addPostActionCreator(text));
		}
	}
}


const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer