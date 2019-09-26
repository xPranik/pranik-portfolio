import React from 'react'
import s from './Dialogs.module.css'
import Dialog from "./Dialog/Dialog";
import MessagesContainer from "./Messages/MessagesContainer";
import {Redirect} from "react-router-dom";

const Dialogs = (props) => {
	let DialogElements = props.dialogs && props.dialogs.length > 0 ? props.dialogs.map(item => <Dialog name={item.userName}
	                                                       date={item.lastDialogActivityDate} key={item.id}
	                                                       avatar={item.photos.small}
	                                                       id={item.id}/>) : '';
	if (!props.isAuth) return <Redirect to={'/auth'}/>

	return (
		<div className={s.dialogs__wrap}>
			<div className={s.dialogs}>
				{DialogElements}
			</div>
			<div className={s.messages_wrap}>
				<MessagesContainer store={props.store}/>
			</div>
		</div>
	)
};


export default Dialogs