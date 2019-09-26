import React from 'react'
import s from "./WideProfileColumn.module.css";
import icon_edit from "./../../../assets/icons/edit_icon.svg"

const Contact = ({contactTitle, contactValue}) => {
	return (
	    <div>
            {contactValue &&
            <div className={s.profile__info_row}>
                <div className={s.profile__info_label}>{contactTitle}:</div>
                <div className={s.profile__info_labeled}><a href={contactValue}>{contactValue}</a></div>
            </div>
            }
        </div>
)
}

export const ProfileInfo = ({showState, isOwner, profile, toEditMode}) => {
	return (
		<div className={s.profile_info_full} style={{display: +showState ? `block` : `none`}}>
			<div className={s.profile_info_block}>
				<div className={s.profile_info_header_wrap}>
					<span className={s.profile_info_header}>Контактная информация</span>
					{isOwner && <div className={s.profile_info_header_edit}>
						<button onClick={toEditMode} className="hide_mob">Редактировать</button>
						<button onClick={toEditMode} className="show_mob"><img src={icon_edit} alt="edit"/></button>
					</div>}
				</div>
				<div className={s.profile__info}>
					{Object.keys(profile.contacts).map(key => {
						return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
					})}
				</div>
			</div>
			<div className={s.profile_info_block}>
				<div className={s.profile_info_header_wrap}>
					<span className={s.profile_info_header}>Карьера</span>
				</div>
				<div className={s.profile__info}>
					<div className={s.profile__info_row}>
						<div className={s.profile__info_label}>Ищу работу:</div>
						<div className={s.profile__info_labeled}>{profile.lookingForAJob ? 'Да' : 'Нет'}</div>
					</div>
					{profile.lookingForAJobDescription && <div className={s.profile__info_row}>
						<div className={s.profile__info_label}>Описание:</div>
						<div className={s.profile__info_labeled}>{profile.lookingForAJobDescription}</div>
					</div>}
					<div className={s.profile__info_row}>
						<div className={s.profile__info_label}>Обо мне:</div>
						<div className={s.profile__info_labeled}>{profile.aboutMe}</div>
					</div>
				</div>
			</div>
		</div>
	)
}