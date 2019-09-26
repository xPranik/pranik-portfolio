import React from 'react'
import Auth from "./Auth";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {compose} from "redux";

class AuthContainer extends React.Component{
	render() {
		return(
			<Auth {...this.props} login={this.props.login}/>
		)
	}
}

let mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	captchaUrl: state.auth.captchaUrl
})

export default compose(
	connect(mapStateToProps, {login})
)(AuthContainer)