import React from 'react'
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import icon_home from "./../../assets/icons/home_icon.svg"
import icon_messages from "./../../assets/icons/messages_icon.svg"
import icon_users from "./../../assets/icons/users_icon.svg"

const Navbar = () => {
	return (
		<nav className={s.nav}>
			<ul>
				<li className={`${s.item} ${s.active}`}>
					<NavLink to="/profile" activeClassName={s.active}>
                        <span className={s.icon}>
                            <img src={icon_home} alt="home"/>
                        </span>
						<span className={s.page_name}>Моя страница</span>
					</NavLink>
				</li>
				<li className={s.item}>
					<NavLink to="/im" activeClassName={s.active}>
                        <span className={s.icon}>
                            <img src={icon_messages} alt="home"/>
                        </span>
						<span className={s.page_name}>Сообщения</span>
					</NavLink>
				</li>
				<li className={s.item}>
					<NavLink to="/users" activeClassName={s.active}>
                        <span className={s.icon}>
                            <img src={icon_users} alt="home"/>
                        </span>
						<span className={s.page_name}>Люди</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar