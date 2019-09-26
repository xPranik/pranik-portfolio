import React from 'react'
import s from './NarrowProfileColumn.module.css'
import formStyle from './../../common/FormsControls/FormsControls.module.css'
import Preloader from "../../common/Preloader/Preloader";
import defaultAvatar from "../../../assets/images/default_avatar.png";
import cameraIcon from "../../../assets/icons/photo-camera.svg";
import {NavLink, Redirect} from "react-router-dom";

const NarrowProfileColumn = (props) => {
	if (!props.profile) {
		return <Preloader/>
	}

	let avatarInput = React.createRef();

	const onAvatarSelected = (e) => {
		if (e.target.files.length) {
			let file = e.target.files[0]
			props.setUserAvatar(file);
		}
	}

	const focusAvatarInput = () => {
		avatarInput.current.click()
	}
	let onStartDialog = (userId) => {
		const { history } = props;
		history.push(`/im/`+userId);
		props.startDialog(userId);
	}

	return (
		<div className={s.narrow_column_wrap}>
			<div className={s.page__block}>
				<div className={s.avatar__wrap}>
					<div className={s.avatar}>
						<img src={props.profile.photos.large != null ? props.profile.photos.large : defaultAvatar}
						     alt="avatar"/>
						{props.isOwner &&
						<div className={s.uploadPhoto} onClick={focusAvatarInput}><img src={cameraIcon} alt="camera"/>
						</div>}
						{props.isOwner &&
						<input className={s.hidden} ref={avatarInput} onChange={onAvatarSelected} type="file"/>}
					</div>
				</div>
				{props.isOwner &&
				<div className={s.avatar_inp_wrap}>
					<label htmlFor="avatar_inp" className={formStyle.form__input_file}>Сменить фото<input
						className={s.hidden} id="avatar_inp" ref={avatarInput} onChange={onAvatarSelected} type="file"/></label>
				</div>
				}
				{!props.isOwner &&
					<div className={s.start_dialog}>
						<a className={formStyle.form__input_file} onClick={()=>{onStartDialog(props.profile.userId)}}>Написать</a>
					</div>
				}
			</div>
		</div>
	);
};

export default NarrowProfileColumn