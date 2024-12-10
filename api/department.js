import request from '@/utils/request.js';

/**
 * 通过科室id获取科室信息
 * @param {Object} id 科室id
 */
export function getDepartmentById(id) {
    return request({
        url: `/departments/${id}`,
        method: 'get',
    })
}

/**
 * 获取所有科室信息
 */
export function getAllDepartments() {
    return request({
        url: '/departments/all',
        method: 'get',
    })
}