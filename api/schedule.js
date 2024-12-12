import request from '@/utils/request'

/**
 * 通过二级科室id获取所有医生排班信息
 * @param {Object} id 二级科室id
 */
export function getBySpecializationId(id) {
	return request({
		url: `/schedules/specialization/${id}`,
		method: 'get'
	})
}