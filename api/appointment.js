import request from '@/utils/request.js';

/**
 * 添加挂号信息，即预约，后端检查预约是否合法
 * @param {Object} data 预约信息
 */
export function addAppointment(data) {
	    return request({
        url: '/appointments',
        method: 'put',
        data: data
    })
}

/**
 * 取消挂号
 * @param {Object} data 预约信息
 */
export function cancelAppointment(data) {
	    return request({
        url: '/appointments/cancel',
        method: 'post',
        data: data
    })
}

/**
 * 支付回调
 * @param {Object} data 支付信息
 */
export function payCallback(data) {
	    return request({
        url: '/appointments/payment',
        method: 'post',
        data: data
    })
}