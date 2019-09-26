import React from 'react'
import s from './Menu.module.css'
import {NavLink} from "react-router-dom";
import icon_home from "./../../assets/icons/home_icon.svg"
import icon_messages from "./../../assets/icons/messages_icon.svg"
import icon_users from "./../../assets/icons/users_icon.svg"

const Menu = () => {
    return (
        <ul className={s.menu}>
            <li className={`${s.menu__item} ${s.active}`}>
                <NavLink to="/profile" activeClassName={s.active}>
                    <span className={s.icon}>
                        <img src={icon_home} alt="home"/>
                    </span>
                </NavLink>
            </li>
            <li className={s.menu__item}>
                <NavLink to="/im" activeClassName={s.active}>
                    <span className={s.icon}>
                        <img src={icon_messages} alt=""/>
                    </span>
                </NavLink>
            </li>
            <li className={s.menu__item}>
                <NavLink to="/users" activeClassName={s.active}>
                    <span className={s.icon}>
                        <img src={icon_users} alt=""/>
                    </span>
                </NavLink>
            </li>
        </ul>
    );
};

export default Menu