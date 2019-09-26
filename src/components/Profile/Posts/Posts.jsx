import React from 'react'
import s from './Posts.module.css'
import formStyles from './../../common/FormsControls/FormsControls.module.css'
import Post from './Post/Post'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const Posts = React.memo(props => {

	let onAddPost = (values) => {
		props.addPost(values.postText);
	}

	let postsArr = props.posts.map(m => <Post likes={m.likesCount} profile={props.profile} key={m.id} message={m.message}/>);

	return (
		<div className={s.posts_wrap}>
			<AddPostFormRedux onSubmit={onAddPost}/>
			<div className={s.posts}>
				{postsArr}
			</div>
		</div>
	);
});

const maxLength150 = maxLengthCreator(150)

const AddPostForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit} className={s.add_post}>
			<Field component={Textarea} validate={[maxLength150]} name="postText" placeholder="Type some text..." className={formStyles.form__input_textarea}/>
			<div className={s.button_wrap}>
				<button>Опубликовать</button>
			</div>
		</form>
	)
}

const AddPostFormRedux = reduxForm({
	form: 'addPostForm'
})(AddPostForm)

export default Posts