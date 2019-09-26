import React, {useState} from 'react'
import s from './WideProfileColumn.module.css'
import PostsContainer from "../Posts/PostsContainer";
import Preloader from "../../common/Preloader/Preloader";
import {ProfileInfo} from "./ProfileInfo";
import ProfileInfoForm from "./ProfileInfoForm";
import {ProfileStatus} from "./ProfileStatus";
import formStyle from "../../common/FormsControls/FormsControls.module.css";

const WideProfileColumn = ({saveProfile, startDialog, history, store, profile, status, isOwner, updateStatus,showState,toggleUserInfo}) => {

	let [editMode, setEditMode] = useState(false);

	if (!profile) {
		return <Preloader/>
	}
	const onSubmit = (formdata) => {
		formdata['fullName'] = profile.fullName;
		saveProfile(formdata).then(()=>{
			setEditMode(false);
		})
	}

	let onStartDialog = (userId) => {
		history.push(`/im/`+userId);
		//startDialog(userId);
	}
	return (
		<div className={s.wide_column_wrap}>
			<div className={s.page__block}>
				<div className={s.profile__data}>
					<div className={s.profile__data_top}>
						<div className={s.profile__data_top_left}>
							<div className={s.profile__data_avatar}>
								<img src={profile.photos.small} alt="avatar"/>
							</div>
						</div>
						<div className={s.profile__data_top_right}>
							<div className={s.name}>{profile.fullName}</div>
							<ProfileStatus isOwner={isOwner} status={status} updateStatus={updateStatus}/>
						</div>
					</div>
					<div className={s.profile__data_middle}>
						{!isOwner &&
						<div className={s.start_dialog + ' show_mob'}>
							<a className={formStyle.form__input_file} onClick={()=>{onStartDialog(profile.userId)}}>Написать</a>
						</div>
						}
						<div className={s.profile_info + ' ' + s.profile_info_short}>
							<div className={s.profile__info_row}>
								<div className={s.profile__info_label}>День рождения:</div>
								<div className={s.profile__info_labeled}>23 июня</div>
							</div>
							<div className={s.profile__info_row}>
								<div className={s.profile__info_label}>Город:</div>
								<div className={s.profile__info_labeled}>Николаев</div>
							</div>
							<div className={s.profile_more_info}>
								<a className={`${s.profile_more_info_link} + ${showState ? s.shown : ''}`}
								   onClick={toggleUserInfo}>
									<span className={s.profile_label_more}>Показать подробную информацию</span>
									<span className={s.profile_label_less}>Скрыть подробную информацию</span>
								</a>
							</div>
						</div>
						{editMode ? <ProfileInfoForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> : <ProfileInfo showState={showState} isOwner={isOwner} profile={profile} toEditMode={() => {setEditMode(true)} }/>}
					</div>
				</div>
			</div>
			<PostsContainer store={store}/>
		</div>
	);
};

export default WideProfileColumn