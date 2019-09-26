import React from 'react';
import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

let state = {
	posts: [
		{'id': 1, 'message': 'This is my first post', 'likesCount': 3},
		{'id': 2, 'message': 'Hi, I\'m learning ReactJs', 'likesCount': 5}
	],
	profile: null,
	showMoreInfo: false,
	status: ''
}

it('length of post should be incremented', () => {
	let action = addPostActionCreator("Pranik, привет!");

	let newState = profileReducer(state, action);

	expect(newState.posts.length).toBe(3);
})

it('message of new post should be correct', () => {
	let action = addPostActionCreator("Pranik, привет!");

	let newState = profileReducer(state, action);

	expect(newState.posts[2].message).toBe('Pranik, привет!');
})

it('after deleting length of messages should be decrement', () => {
	let action = deletePost(1);

	let newState = profileReducer(state, action);

	expect(newState.posts.length).toBe(1);
})

it('after deleting length of messages should be decrement', () => {
	let action = deletePost(1);

	let newState = profileReducer(state, action);

	expect(newState.posts.length).toBe(1);
})
