import request from '@/utils/request.js';

/**
 * 通过医生id获取医生信息
 * @param {Object} id 医生id
 */
export function getDoctorInfo(id) {
	    return request({
        url: `/doctors/${id}`,
        method: 'get',
    })
}

/**
 * 通过医生专业id获取医生信息
 * @param {Object} specialization_id 专业id
 */
export function getDoctorInfoBySpecialization(specialization_id) {
	    return request({
        url: `/doctors/specialization/${specialization_id}`,
        method: 'get',
    })
}

/**
 * 通过部门id获取医生信息
 * @param {Object} department_id 部门id
 */
export function getDoctorInfoByDepartment(department_id) {
	    return request({
        url: `/doctors/department/${department_id}`,
        method: 'get',
    })
}

/**
 * 获取所有医生信息
 */
export function getAllDoctorInfo() {
	    return request({
        url: '/doctors/all',
        method: 'get',
    })
}