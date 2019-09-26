import React from 'react'
import styles from './Users.module.css'
import defaultAvatar from '../../assets/images/default_avatar.png'
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

let User = ({user, followingInProgress, follow, unfollow}) => {
	return (
		<div className={styles.user_card}>
			<div className={styles.user_card_top}>
				<div className={styles.user_avatar_wrap}>
					<NavLink to={'/profile/' + user.id}>
						<img src={user.photos.small != null ? user.photos.small : defaultAvatar} alt="avatar"
						     className={styles.userPhoto}/>
					</NavLink>
				</div>
				<div className={styles.user_content}>
					<p> {user.name} </p>
				</div>
			</div>
			<div className={styles.user_follow}>
				{
					user.followed
						? <button disabled={followingInProgress.some(id => id === user.id)}
						          className={styles.button} onClick={() => {
							unfollow(user.id)
						}}>unfollow</button>
						: <button disabled={followingInProgress.some(id => id === user.id)}
						          className={styles.button} onClick={() => {
							follow(user.id)
						}}>follow</button>}
			</div>
		</div>
	)
}

export default User
