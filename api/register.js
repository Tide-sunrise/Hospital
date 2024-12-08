import request from '@/utils/request.js';

/**
 * 挂号id获取挂号信息
 * @param {Object} id 挂号id
 */
export function getRegisterInfo(id) {
	return request({
		url: `/appointments/${id}`,
		method: 'get'
	})
}

/**
 * 通过病人id获取挂号信息
 * @param {Object} patientId 病人id
 */
export function getRegisterInfoByPatientId(patientId) {
	return request({
		url: `/appointments/patient/${patientId}`,
		method: 'get'
	})
}

/**
 * 通过医生id获取挂号信息
 * @param {Object} doctorId 医生id
 */
export function getRegisterInfoByDoctorId(doctorId) {
	return request({
		url: `/appointments/doctor/${doctorId}`,
		method: 'get'
	})
}

/**
 * 通过用户id获取挂号信息
 * @param {Object} userId 用户id
 */
export function getRegisterInfoByUserId(userId) {
	return request({
		url: `/appointments/user/${userId}`,
		method: 'get'
	})
}