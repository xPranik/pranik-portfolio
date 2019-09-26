import React from 'react'
import s from './Message.module.css'
import {NavLink} from "react-router-dom";
import defaultAvatar from "./../../../../assets/images/default_avatar.png";

const Message = (props) => {

    let date = props.date.split('T');
    let time = date[1].split('.');

    return (
        <div className={`${s.message} ${s[props.msgClass]}`}>
            <div className={s.message_body}>
                <div className={s.message_start}>
                    <div className={s.message_avatar}>
                        {props.senderId !== props.authProfile.userId &&
                            <img src={props.resProfile.data.photos.small ? props.resProfile.data.photos.small : defaultAvatar} alt="avatar"/>
                        }
                        {props.senderId === props.authProfile.userId &&
                            <img src={props.authProfile.photos.small ? props.authProfile.photos.small : defaultAvatar} alt="avatar"/>
                        }
                    </div>
                </div>
                <div className={s.message_content}>
                    <NavLink to={"/profile/"+props.userId} className={s.message_name}>{props.name}</NavLink>
                    <div className={s.message_text}>
                        {props.text}
                    </div>
                </div>
            </div>
            <div className={s.message_date}>
                <span>{date[0]}</span>
                <span>{time[0]}</span>
            </div>
        </div>
    );
};

export default Message