import React from 'react'
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import defaultAvatar from "../../assets/images/default_avatar.png";
import Preloader from "../common/Preloader/Preloader";
import logo from "./../../assets/icons/logo.svg";
let Header = (props) => {

	let logout = () => {
		props.logout();
	}

	return (
		<header className={s.header}>
			<div className="container">
				<div className={s.header__body}>
					<NavLink to={"/"} className={s.logo}>
						<img src={logo} alt="logo"/>
					</NavLink>
					<div className={s.profile}>
						{props.isAuth ?
							<button className={s.profile__content}>
								<div className={s.name}> {props.login} </div>
								<div className={s.avatar}>
									{props.profile
										? <img
											src={props.profile.photos.small != null ? props.profile.photos.small : defaultAvatar}
											alt="avatar"/>
										: <Preloader/>
									}
								</div>
								<div className={s.dropdown}>
									<a onClick={logout}>Выйти</a>
								</div>
							</button>
							:
							<div className={s.link}>
								<NavLink to="/auth">Войти</NavLink>
							</div>
						}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header