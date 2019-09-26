import React from 'react'
import Messages from "./Messages";
import {connect} from "react-redux";
import {getRecipienProfile, sendMessage} from "../../../redux/dialogs-reducer";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

class MessagesContainer extends React.Component {
	render() {
		return <Messages {...this.props} sendMessage={this.props.sendMessage}/>
	}


	componentDidMount() {
		this.refreshProfile();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.match.params.userId !== prevProps.match.params.userId) {
			this.refreshProfile();
		}
	}

	refreshProfile() {
		let userID = this.props.match.params.userId;
		if (userID) {
			this.props.getRecipienProfile(userID);
		}
	}
}

let mapStateToProps = (state) => {
	return {
		newMessageText: state.dialogsPage.newMessageText,
		messages: state.dialogsPage.messages,
		openedUserId: state.dialogsPage.openedUserId,
		resProfile: state.dialogsPage.resProfile,
		authProfile: state.profilePage.authProfile
	}
}

export default compose(
	connect(mapStateToProps, {sendMessage, getRecipienProfile}),
	withRouter)(MessagesContainer)