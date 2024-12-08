import request from '@/utils/request.js';

/**
 * 通过id获取二级科室信息
 * @param {Object} id 二级科室id
 */
export function getSpecializationById(id) {
	return request({
		url: `/specializations/${id}`,
		method: 'get',
	})
}

/**
 * 通过科室id获取二级科室信息
 * @param {Object} departmentId 科室id
 */
export function getSpecializationByDepartmentId(departmentId) {
	return request({
		url: `/specializations/department/${departmentId}`,
		method: 'get',
	})
}

/**
 * 获取所有二级科室信息
 */
export function getAllSpecialization() {
	return request({
		url: '/specializations/all',
		method: 'get',
	})
}