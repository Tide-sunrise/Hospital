import request from '@/utils/request.js';

/**
 * 通过id获取患者信息
 * @param {Object} id 患者id
 */
export function getPatientById(id) {
	return request({
		url: `/patients/${id}`,
		method: 'get'
	});
}

/**
 * 获取用户绑定的患者
 * @param {Object} id 用户id
 */
export function getpatients(id){
	return request({
		url:`/patients/userId/${id}`,
		method:'get',
	})
}

/**
 * 添加健康卡
 * @param {Object} data 健康卡信息
 */
export function addHealthCard(data) {
	return request({
		url: '/patients',
		method: 'put',
		data: data
	})
}