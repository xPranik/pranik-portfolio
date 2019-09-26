import React from 'react'
import Dialogs from './Dialogs'
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
	getDialogs,
	getMessages,
	getRecipienProfile,
	sendMessage,
	setOpenedUserId,
	startDialog
} from "../../redux/dialogs-reducer";
import {withRouter} from "react-router-dom";

class DialogsContainer extends React.Component {

	componentDidMount() {
		this.props.getDialogs();
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
			this.props.setOpenedUserId(userID);
			this.props.getMessages(userID);
		}
		if(!userID){
			this.props.setOpenedUserId(null);
		}
	}

	render() {
		return <Dialogs {...this.props} startDialog={this.props.startDialog}/>
	}
}


let mapStateToProps = (state) => {
	return {
		dialogs: state.dialogsPage.dialogs,
		isAuth: state.auth.isAuth,
	}
}

export default compose(
	connect(mapStateToProps, {getDialogs, startDialog, getMessages, sendMessage, setOpenedUserId}),
	withRouter,
	withAuthRedirect
)(DialogsContainer)