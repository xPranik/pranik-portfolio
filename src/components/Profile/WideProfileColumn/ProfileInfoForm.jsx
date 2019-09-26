import React from 'react'
import s from "./WideProfileColumn.module.css";
import formStyle from "./../../common/FormsControls/FormsControls.module.css";
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import icon_done from "./../../../assets/icons/check_icon.svg"

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={s.profile__info_row}>
            <div className={s.profile__info_label}>{contactTitle}:</div>
            <div className={s.profile__info_labeled}>{contactValue}</div>
        </div>
    )
}

const ProfileInfoForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit} className={s.profile_info_full}>
            <div className={s.profile_info_block}>
                <div className={s.profile_info_header_wrap}>
                    <span className={s.profile_info_header}> Контактная информация</span>
                    <div className={s.profile_info_header_edit}>
                        <button className="hide_mob">Сохранить</button>
                        <button className="show_mob"><img src={icon_done} alt="edit"/></button>
                    </div>
                </div>
                <div className={s.profile__info}>
                    {Object.keys(profile.contacts).map(key => {
                        return <div className={s.profile__info_row} key={key}>
                            <div className={s.profile__info_label}>{key}:</div>
                            <div className={s.profile__info_labeled}>{createField(key, 'contacts.'+key, [], Input, {className: formStyle.form__input_profile})}</div>
                        </div>
                    })}
                </div>
            </div>
            <div className={s.profile_info_block}>
                <div className={s.profile_info_header_wrap}>
                    <span className={s.profile_info_header}>Поиск работы</span>
                </div>
                <div className={s.profile__info}>
                    <div className={s.profile__info_row}>
                        <div className={s.profile__info_label}>Ищу работу:</div>
                        <div
                            className={s.profile__info_labeled}>
                            <div className={s.profile__info_field}>
                                {createField('Ищу работу', 'lookingForAJob', null, Input, {
                                    type: 'checkbox',
                                    className: formStyle.form__input_checkbox
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={s.profile__info_row}>
                        <div className={s.profile__info_label}>Описание:</div>
                        <div className={s.profile__info_labeled}>
                            <div className={s.profile__info_field}>
                                {createField('Мои умения', 'lookingForAJobDescription', null, Textarea, {className: formStyle.form__input_textarea})}
                            </div>
                        </div>
                    </div>
                    <div className={s.profile__info_row}>
                        <div className={s.profile__info_label}>Обо мне:</div>
                        <div className={s.profile__info_labeled}>

                            <div className={s.profile__info_field}>
                                {createField('Обо мне', 'aboutMe', null, Textarea, {className: formStyle.form__input_textarea})}
                            </div>
                        </div>
                    </div>
                    <div className={s.profile__info_row}>
                        <div className={s.profile__info_label}>Контакты:</div>
                        <div className={s.profile__info_labeled}>

                            <div className={s.profile__info_field}>
                                {createField('Обо мне', 'aboutMe', null, Textarea, {className: formStyle.form__input_textarea})}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {error ?
                <div className={s.formError}> {error} </div>
            : ''
        }
        </form>
    )
}

const ProfileInfoFormReduxForm = reduxForm({
    form: 'edit-profile-data'
})(ProfileInfoForm)

export default ProfileInfoFormReduxForm
