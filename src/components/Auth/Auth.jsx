import React from 'react'
import s from "./Auth.module.css";
import formStyle from "./../common/FormsControls/FormsControls.module.css"
import {reduxForm} from "redux-form";
import {Redirect} from "react-router-dom";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";


const LoginForm = ({handleSubmit, error, captchaUrl}) => {
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
		</form>
	)
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Auth = (props) => {

	let onSubmit = (formdata) => {
		alert(formdata.email + ' ' + formdata.password)
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
