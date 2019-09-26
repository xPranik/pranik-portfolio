import React, {useState, useEffect} from 'react'
import s from './WideProfileColumn.module.css'

export const ProfileStatus = (props) => {

	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.status);

	useEffect( () => {
		setStatus(props.status);
	}, [props.status]);

	const activateEditMode = () => {
		if(props.isOwner){
			setEditMode(true);
		}
	}

	const deactivateEditMode = () => {
		setEditMode(false);
		props.updateStatus(status)
	}

	const onStatusChange = (e) => {
		setStatus(e.currentTarget.value)
	}

	return (
		<div>
			{ !editMode &&
			<div>
				<span onClick={ activateEditMode } onTouchEnd={ activateEditMode } className={s.status}>{props.status}</span>
			</div>
			}
			{editMode && props.isOwner ?
			<div>
				<input autoFocus={true} className={s.status_inp} onChange={onStatusChange} onBlur={deactivateEditMode} value={status}/>
			</div>
			: ""
			}
		</div>
	);
};
