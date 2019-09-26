import React from 'react'
import s from './Dialog.module.css'
import {NavLink} from "react-router-dom";

const Dialog = (props) => {

	let splitString = (stringToSplit, separator) => {
		return stringToSplit.split(separator);
	}

	let newDate = splitString(props.date, 'T');

	return (
		<div className={s.dialog}>
			<NavLink to={`/im/${props.id}`} activeClassName={s.active}>
				<div className={s.dialog_start}>
					<div className={s.dialog_avatar}>
						<img src={props.avatar} alt="avatar"/>
					</div>
				</div>
				<div className={s.dialog_body}>
					<div className={s.dialog_name}>
						{props.name}
					</div>
					<div className={s.dialog_message}>
					</div>
				</div>
				<div className={s.dialog_end}>
					<div className={s.dialog_date}>
						{newDate[0]}
					</div>
				</div>
			</NavLink>
		</div>
	);
};

export default Dialog