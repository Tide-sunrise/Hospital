import request from '@/utils/request.js';

/**
 * 通过id获取职称信息
 * @param {Object} id 职称id
 */
export function getTitleById(id) {
	return request({
		url: `/titles/${id}`,
		method: 'get',
	})
}

/**
 * 获取所有职称信息
 */
export function getTitles() {
	return request({
		url: '/titles/all',
		method: 'get',
	})
}