import React from 'react'
import s from './Profile.module.css'
import WideProfileColumn from "./WideProfileColumn/WideProfileColumn";
import NarrowProfileColumn from "./NarrowProfileColumn/NarrowProfileColumn";
import {Redirect} from "react-router-dom";

const Profile = (props) => {
    if(!props.isAuth) return <Redirect to={'/auth'}/>

    return (
        <div className={s.profile}>
            <NarrowProfileColumn isOwner={props.isOwner} history={props.history} startDialog={props.startDialog} setUserAvatar={props.setUserAvatar} profile={props.profile}/>
            <WideProfileColumn saveProfile={props.saveProfile} history={props.history} startDialog={props.startDialog} isOwner={props.isOwner} profile={props.profile} toggleUserInfo={props.toggleUserInfo} showState={props.showState} status={props.status} updateStatus={props.updateStatus}/>
        </div>
    );
};

export default Profile