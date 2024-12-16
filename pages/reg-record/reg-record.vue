<template>
	<view class="recordLayout pageBg2">
		<myEmpty height="50rpx"></myEmpty>
		
		<view class="layout">
			
			<view class="navbar">
				<view class="goBack" @click="goBack">
					<uni-icons type="back" color="#000" size="20"></uni-icons>
				</view>
				<view class="text">
					挂号记录
				</view>
				<view class="goBack">
					<!-- <uni-icons type="back" color="#fff" size="20"></uni-icons> -->
				</view>
			</view>
		</view>
		<view class="em">

		</view>
		<view class="box" v-for="(item,index) in recordList">
			<view class="info-title" v-if="!item.isPaid">
				<label>订单已失效</label>
			</view>
			<view class="info-item">
				<label>订单生成时间:</label>
				<span>{{ item.orderTime }}</span>
			</view>
			<view class="info-item">
				<label>医生姓名:</label>
				<span>{{ item.doctorName }}</span>
			</view>
			<view class="info-item">
				<label>科室:</label>
				<span>{{ item.department }}</span>
			</view>
			<view class="info-item">
				<label>金额:</label>
				<span>{{ item.amount }} 元</span>
			</view>
			<view class="info-item">
				<label>患者姓名:</label>
				<span>{{ item.patientName }}</span>
			</view>
			<view class="info-item">
				<label>挂号时间段:</label>
				<span>{{ item.time }}</span>
			</view>
			<view class="button">
				<wd-button type="warning" @click="nogate(item.appointmentId)" :disabled="!item.isPaid">取消挂号</wd-button>
			</view>
		</view>
	</view>

</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		getStatusBarHeight,
		getTitleBarHeight,
		getNavBarHeight
	} from "@/utils/system.js"
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		getAppointmentsByUserId
	} from '@/api/appointment.js'
	import {
		getDoctorInfo
	} from '@/api/doctor.js'
	import {
		cancelAppointmentById
	} from '@/api/appointment.js'
	import store from '@/store/index.js'
	import {
		format
	} from 'date-fns';
	import {
		zhCN
	} from 'date-fns/locale';

	const recordList = ref([1]);

	//输入挂号的目标时间，在到达这个时间的前一个小时前可以取消挂号，下面的函数是判断是否可以取消挂号
	const canCancel = (time) => {
		let now = new Date();
		let target = new Date(time);
		if (target - now < 3600000) {
			return false;
		} else {
			return true;
		}
	}

	const makeTime = (a) => {
		return `${a.appointmentDate}T${a.appointmentTimeInfo.split(" - ")[0]}:00`
	}

	async function getRecordList() {
		//获取挂号记录
		let res = await getAppointmentsByUserId(store.state.user);
		//对res.data中的appointmentId排序
		res.data.sort((a, b) => {
			return a.appointmentId - b.appointmentId;
		})
		recordList.value = [];
		//将数据转换为页面所需的格式
		for (let i = 0; i < res.data.length; i++) {
			let item = {
				appointmentId: res.data[i].appointmentId,
				orderTime: format(new Date(res.data[i].createdTimeStamp), 'yyyy-MM-dd HH:mm:ss'),
				doctorName: res.data[i].doctorName,
				department: res.data[i].specializationName,
				amount: parseFloat(res.data[i].fee).toFixed(2) / 100,
				patientName: res.data[i].patientName,
				time: res.data[i].appointmentDate + ' ' + res.data[i].appointmentTimeInfo,
				isPaid: canCancel(makeTime(res.data[i])) && (res.data[i].status == 2)
			}
			recordList.value.push(item);
		}
		console.log(recordList)
	}

	onLoad(() => {
		getRecordList()
	})

	//返回上一页
	const goBack = () => {
		uni.navigateTo({
			url: '/pages/User/User'
		})
	}

	//取消挂号
	const nogate = async (id) => {
		uni.showModal({
			title: '提示',
			content: '是否取消挂号',
			success: async function(res) {
				if (res.confirm) {
					try {
						let response = await cancelAppointmentById({
							appointmentId: id
						});
						console.log(response);
						await getRecordList();
						uni.showToast({
							title: '取消成功',
							icon: 'success',
							duration: 2000
						});
						//刷新页面
					} catch (error) {
						console.error(error);
						uni.showToast({
							title: '取消失败',
							icon: 'none',
							duration: 2000
						});
					}
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
</script>

<style lang="scss" scoped>
	.recordLayout {
		.layout {
			.navbar {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				z-index: 10;
				padding: 80rpx 0 30rpx 0;
				background:
					linear-gradient(to bottom, transparent 0%, #fff 400rpx),
					linear-gradient(to left, #beecd8 20%, #b2e0fa);
				display: flex;
				flex-direction: row; //设置布局方向为水平

				.goBack {
					width: 38rpx;
					height: 38rpx;
					// background: rgba(0, 0, 0, 0.5);
					// left: 30rpx;
					margin: 0 30rpx;
					border-radius: 100px;
					top: 0;
					backdrop-filter: blur(10rpx);
					border: 1rpx solid rgba(255, 255, 255, 0.3);
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.text {
					width: 554rpx;
				}
			}
		}

		.em {
			height: 98rpx;
		}

		.box {
			width: 690rpx;
			// height: 200rpx;
			border-radius: 30rpx;
			box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
			margin: 30rpx auto;
			background: #fff;
			padding: 30rpx 0;

			.info-title {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 30rpx;

				label {
					font-size: 15px;
					font-weight: bold;
					color: #f00;
				}
			}

			.info-item {
				display: flex;
				justify-content: space-between;
				align-items: center;

				margin: 30rpx 30rpx;

				label {
					font-weight: bold;
				}

				span {
					font-size: 16px;
				}
			}

			.button {
				display: flex;
				justify-content: center;
				margin-top: 30rpx;
			}
		}
	}
</style>