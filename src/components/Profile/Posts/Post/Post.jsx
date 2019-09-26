import React from 'react'
import s from './Post.module.css'
import defaultAvatar from "./../../../../assets/images/default_avatar.png";
import {NavLink} from "react-router-dom";

const Post = (props) => {
    return (
        <div className={s.post}>
            <div className={s.post__topline}>
                <div className={s.post__avatar}>
                    <img src={props.profile.photos.small ? props.profile.photos.small : defaultAvatar}/>
                </div>
                <NavLink to={`profile/?userid=`+props.profile.userId} className={s.post__author}>{props.profile.fullName}</NavLink>
            </div>
            <div className={s.post__content}>
                <div className={s.post__text}>
                    {props.message}
                </div>
            </div>
            <div className={s.post__bottom}>
                <div className={s.post__likes}>
                    <a href="#" onClick={(e)=>{e.preventDefault()}}>
                        <span>like</span>
                    </a>
                    <div className={s.post__likecount}>
                        {props.likes}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post