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