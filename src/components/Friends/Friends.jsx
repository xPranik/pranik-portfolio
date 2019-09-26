import React from 'react'
import styles from './../Users/Users.module.css'
import Paginator from "../common/Paginator/Paginator";
import User from "./../Users/User";

let Friends = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, followingInProgress, unfollow, follow, ...props}) => {
	return (
		<div>
			<Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize} />
			<div className={styles.cards}>
				{
					users.filter(f => f.followed).map(u => <User user={u} followingInProgress={followingInProgress} follow={follow} unfollow={unfollow} key={u.id}/>)
				}
			</div>
		</div>
	)
}

export default Friends
