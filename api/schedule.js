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

/**
 * 通过医生Id和日期获取医生排班信息
 * @param {Object} params 医生Id和日期
 */
export function getByDoctorIdAndDate(params) {
	return request({
		url: `/schedules/doctor`,
		method: 'post',
		data: JSON.stringify(params)
	})
}