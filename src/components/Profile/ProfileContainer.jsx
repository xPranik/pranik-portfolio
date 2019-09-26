import React from 'react'
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfile,
    getStatus, saveProfile,
    setUserAvatar,
    setUserProfile,
    toggleUserInfo,
    updateStatus
} from "../../redux/profile-reducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {startDialog} from "../../redux/dialogs-reducer";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userID = this.props.match.params.userId;
        if (!userID) {
            userID = this.props.autorizedUserId;
            if (!userID) {
                this.props.history.push('/auth')
            }
        }
        if(userID){
            this.props.getProfile(userID);
            this.props.getStatus(userID);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile isOwner={!this.props.match.params.userId} {...this.props} startDialog={this.props.startDialog} saveProfile={this.props.saveProfile} setUserAvatar={this.props.setUserAvatar} autorizedUserId={this.autorizedUserId}/>
        );
    }
};


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    showState: state.profilePage.showMoreInfo,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    autorizedUserId: state.auth.userId
})

export default compose(
    connect(mapStateToProps, {setUserProfile, toggleUserInfo, getProfile, getStatus, updateStatus, setUserAvatar, saveProfile, startDialog}),
    withRouter,
)(ProfileContainer)