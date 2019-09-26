import React from 'react'
import Header from "./Header";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {getAuthProfile} from "../../redux/profile-reducer";

class HeaderContainer extends React.Component{

	componentDidMount() {
		if(this.props.isAuth){
			this.props.getAuthProfile(this.props.userId);
		}
	}

	render() {
		return(
			<Header {...this.props} logout={this.props.logout} />
		)
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
	userId: state.auth.userId,
	profile: state.profilePage.authProfile,
})

withRouter(HeaderContainer);

export default connect(mapStateToProps ,{logout, getAuthProfile})(HeaderContainer)