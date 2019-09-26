import React from 'react'
import {connect} from "react-redux";
import {
	follow, requestUsers, mergeUsersData,
	setCurrentPage,
	setTotalUsers,
	setUsers,
	toggleIsFetching,
	unfollow
} from "../../redux/users-reducer";
import Friends from "./Friends";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
	getPageSize,
	getUsers,
	getTotalUsersCount,
	getCurrentPage,
	getIsFetching,
	getFollowingInProgress
} from "../../redux/users-selectors";

class FriendsContainer extends React.Component {

	componentDidMount() {
		this.props.requestUsers(this.props.currentPage, this.props.pageSize)
		this.setFriends()
	}

	setFriends() {
		if(this.props.users && this.props.users.length) {
			this.props.requestUsers(1, this.props.totalUsersCount);
			let users = this.props.users.filter(u => u['followed'] === true);
			debugger
		}
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.users !== prevProps.users){
			this.setFriends();
		}
	}

	onPageChanged = (pageNumber) => {
		this.props.requestUsers(pageNumber, this.props.pageSize)
	}

	render() {
		return (
			<>
				{this.props.isFetching ? <Preloader/> : null}
				<Friends users={this.props.users} follow={this.props.follow} unfollow={this.props.unfollow}
				         totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize}
				         currentPage={this.props.currentPage} onPageChanged={this.onPageChanged}
				         isFetching={this.isFetching} followingInProgress={this.props.followingInProgress}/>
			</>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
		followingInProgress: getFollowingInProgress(state)
	}
}

export default compose(
	connect(mapStateToProps, {
		follow,
		unfollow,
		setUsers,
		setCurrentPage,
		setTotalUsers,
		toggleIsFetching,
		mergeUsersData,
		requestUsers
	})
)(FriendsContainer)