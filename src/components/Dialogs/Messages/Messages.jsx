import React from 'react'
import s from './Messages.module.css'
import Message from "./Message/Message";
import {Field, reduxForm, reset} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator} from "../../../utils/validators/validators";
import send_button from './../../../assets/icons/tg.png'


const Messages = (props) => {

	let MessagesElements = props.messages ? props.messages.map(m => <Message resProfile={props.resProfile} authProfile={props.authProfile} senderId={m.senderId} text={m.body} key={m.id} date={m.addedAt} name={m.senderName}/>) : '';

	let onSubmit = (values) => {
		if(props.openedUserId){
			props.sendMessage(props.openedUserId, values.body);
		}
	}

	return (
		<div className={s.messages__wrap}>
			<div className={s.messages}>
				{MessagesElements}
			</div>
			<div className={s.typing_wrap}>
				{MessagesElements.length === 0 && 'Нет сообщений'}
			</div>
			<AddMessageFormRedux onSubmit={onSubmit}/>
		</div>

	);
};

const maxLength300 = maxLengthCreator(300)

const AddMessageForm = (props) => {

	return (
		<form onSubmit={props.handleSubmit} className={s.messages_form}>
			<Field component={Textarea} validate={[maxLength300]} placeholder="Write a message..."
			       className={s.messages_textarea}
			       name="body"/>
			<button className={s.send}>
				<img src={send_button}
				     alt="send"/>
			</button>
		</form>
	)
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'} )(AddMessageForm)

export default Messages