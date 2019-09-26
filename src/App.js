import React, {Component} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import AuthContainer from "./components/Auth/AuthContainer";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import store from "./redux/redux-store";
import FriendsContainer from "./components/Friends/FriendsContainer";
import Menu from "./components/Menu/Menu";

const DialogsContainer = React.lazy(() => import ("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import ("./components/Profile/ProfileContainer"));

class App extends Component {

	componentDidMount() {
		this.props.initializeApp();
	}

	render() {

		if (!this.props.initialized) {
			return <Preloader/>
		}

		return (
			<div className="app-wrapper">
				<HeaderContainer/>
				<div className="app-container">
					<Navbar/>
					<div className="app-content">
						<Switch>
							<Route path='/im/:userId?' render={withSuspense(DialogsContainer)}/>
							<Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
							<Route path='/users' render={withSuspense(UsersContainer)}/>
							<Route path='/auth' render={withSuspense(AuthContainer)}/>
							<Route path='/friends' render={withSuspense(FriendsContainer)}/>
							<Redirect from="/" to="/profile/"/>
							<Route path='*' render={() => <div>404 not found!</div>}/>
						</Switch>
					</div>
				</div>
				<Menu/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized
})

let AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);

const PranikJsApp = () => {
	return (
		<HashRouter>
			<Provider store={store}>
				<AppContainer/>
			</Provider>
		</HashRouter>
	)
}

export default PranikJsApp