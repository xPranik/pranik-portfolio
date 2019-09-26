import React from 'react'
import styles from './Users.module.css'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, followingInProgress, unfollow, follow, ...props}) => {
	return (
		<div>
			<div className={styles.cards}>
				{
					users.map(u => <User user={u} followingInProgress={followingInProgress} follow={follow} unfollow={unfollow} key={u.id}/>)
				}
			</div>
			<Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalUsersCount={totalUsersCount} pageSize={pageSize} />
		</div>
	)
}

export default Users
