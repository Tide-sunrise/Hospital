import request from '@/utils/request.js'

/**
 * 通过id获取用户信息
 * @param {Object} id 用户id
 */
export function getUserInfo(id) {
	return request({
		url: `/users/${id}`,
		method: 'get'
	})
}

/**
 * 账号密码登录
 * @param {Object} data 登录信息
 */
export function login(data) {
	return request({
		url: '/users/login',
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		data: JSON.stringify(data)
	})
}

/**
 * 注册
 * @param {Object} data 注册信息
 */
export function register(data) {
	return request({
		url: '/users',
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
		},
		data: JSON.stringify(data)
	})
}

/**
 * 退出登录
 */
export function loginout(){
	return request({
		url:'/users/logout',
		method:'post'
	})
}