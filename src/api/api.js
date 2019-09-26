import * as axios from "axios";

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-KEY": "4dd11e25-4d13-4146-a568-3123d3b64f3e"
	}
})

export const usersAPI = {
	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`,
		).then(response => response.data)
	},
	follow(userId) {
		return instance.post(`follow/` + userId)
	},
	unfollow(userId) {
		return instance.delete(`follow/` + userId)
	}
}

export const authAPI = {
	getAuthMe() {
		return instance.get(`auth/me`)
	},
	login(formdata) {
		return instance.post('auth/login', formdata)
	},
	logout() {
		return instance.delete('auth/login')
	}
}

export const securityAPI = {
	getCaptcha() {
		return instance.get('security/get-captcha-url')
	}
}

export const dialogsAPI = {
	getDialogs() {
		return instance.get(`dialogs`)
	},
	startDialog(userId) {
		return instance.put(`dialogs/` + userId)
	},
	sendMessage(userId, body) {
		return instance.post(`dialogs/` + userId + '/messages', {body})
	},
	getMessages(userId) {
		return instance.get(`dialogs/` + userId + `/messages`)
	},
	getRecipienProfile(userId) {
		return instance.get(`profile/` + userId + ``)
	},
}

export const profileAPI = {
	getProfile(userId) {
		return instance.get(`profile/` + userId).then(response => response.data)
	},
	getStatus(userId) {
		return instance.get(`profile/status/` + userId)
	},
	updateStatus(status) {
		return instance.put(`profile/status`, {status})
	},
	setUserAvatar(photo) {
		let formData = new FormData();
		formData.append("image", photo);
		return instance.put(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},
	saveProfile(profile) {
		return instance.put('profile', profile);
	}
}
