import React, {useState} from 'react'
import s from "./Auth.module.css";
import formStyle from "./../common/FormsControls/FormsControls.module.css"
import {reduxForm} from "redux-form";
import {Redirect} from "react-router-dom";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";

const LoginForm = ({handleSubmit, error, captchaUrl}) => {

	let [showCredentials, setShowCredentials] = useState(false);

	let onClickDemoCred = () => {
		setShowCredentials(!showCredentials)
	}

	return (
		<form className={s.auth_form} onSubmit={handleSubmit}>
			{createField("Email", "email", [required], Input, {id: 'email', className: formStyle.form__input})}
			{createField("Password", "password", [required], Input, {type: 'password', id: "password", className: formStyle.form__input})}
			<label htmlFor="rememberMe">Remember Me</label>
			{createField(null, "rememberMe", [], Input, {type: 'checkbox', id: 'rememberMe', className: formStyle.form__input_checkbox})}
			{error ?
				<div className={s.formError}> {error} </div>
				: ''
			}
			{captchaUrl && <div className={s.captcha}>
				<img src={captchaUrl} alt="captcha" className={formStyle.captcha}/>
				{createField("Captcha", "captcha", [required], Input, {className: formStyle.form__input_captcha})}
			</div>}
			<button type="submit">Вход</button>
			<div className={s.demo}>
				<div className={s.demo_btn} onClick={onClickDemoCred}>{!showCredentials ? 'Показать' : 'Скрыть'} демо доступы</div>
				{showCredentials &&
					<div className={s.credentials}>
						<div className={s.credentials__row}>
							<span>Email:</span>
							<span>free@samuraijs.com</span>
						</div>
						<div className={s.credentials__row}>
							<span>Password:</span>
							<span>free</span>
						</div>
					</div>
				}
			</div>
		</form>
	)
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Auth = (props) => {

	let onSubmit = (formdata) => {
		props.login(formdata)
	}
	if(props.isAuth) return <Redirect to={'/profile'}/>
	return(
		<div>
			<LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit} />
		</div>
	)
}

export default Auth
