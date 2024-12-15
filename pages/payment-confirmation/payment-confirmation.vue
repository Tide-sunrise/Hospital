<template>
	<view class="paymentInfoLayout pageBg2">
		<view class="title">
			支付信息确认
		</view>
		<view class="box">
			<view class="info-item">
				<label>订单生成时间:</label>
				<span>{{ orderTime }}</span>
			</view>
			<view class="info-item">
				<label>医生姓名:</label>
				<span>{{ doctorName }}</span>
			</view>
			<view class="info-item">
				<label>科室:</label>
				<span>{{ department }}</span>
			</view>
			<view class="info-item">
				<label>金额:</label>
				<span>{{ amount }} 元</span>
			</view>
			<view class="info-item">
				<label>患者姓名:</label>
				<span>{{ patientName }}</span>
			</view>
			<view class="info-item">
				<label>挂号时间段:</label>
				<span>{{ time }}</span>
			</view>
		</view>
		<view class="button">
			<up-button :disabled="isPaid" @click="handlePayment" color="rgb(66, 83, 216)"
				shape="circle">确认支付</up-button>
		</view>
		<view class="button">
			<up-button @click="abandonPayment" color="rgb(66, 83, 216)"
				shape="circle">{{!isPaid?'放弃挂号':'返回首页'}}</up-button>
		</view>
	</view>

	<uni-popup ref="infoPopup" type="bottom">
		<view class="paymentLayout">
			<view class="layout">
				<view v-if="isSuccess" class="icon">
					<image src="../../common/image/zhifu-zhifuchenggong.svg" mode="aspectFill"></image>
				</view>
				<view v-else class="icon">
					<image src="../../common/image/zhifu-zhifushibai.svg" mode="aspectFill"></image>
				</view>
				<view class="success-text">
					付款{{isSuccess?"成功":"失败"}}
				</view>
				<view v-if="isSuccess" class="money">
					{{ amount }} 元
				</view>
				<view class="detail">
					<view class="time">
						<label>付款时间</label>
						<span>
							<uni-dateformat :date="Date.now() + 8 * 60 * 60 * 1000" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
						</span>
					</view>
					<view class="method">
						<label>付款方式</label>
						<span>
							直接支付
						</span>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import store from '../../store';
	import {
		getPatientById
	} from '@/api/patient.js'
	import {
		addAppointment,
		payCallback
	} from '@/api/appointment.js'
	import {
		format
	} from 'date-fns';
	import {
		zhCN
	} from 'date-fns/locale';
	

	// 假定的数据，实际应用中应该从后端获取
	const orderTime = ref('2024-12-11 13:36'); // 挂号订单生成的时间
	const doctorName = ref('张三'); // 医生姓名
	const department = ref('内科'); // 科室名称
	const amount = ref(50); // 金额
	const patientName = ref('李四'); // 患者姓名
	const time = ref('14:30-15:30')
	const patient = ref({}); // 患者信息
	const appointmentData = ref({}); // 挂号信息

	const isPaid = ref(false)
	const infoPopup = ref(null)
	const isSuccess = ref(false)
	const regId = -1;
	const timehash = {
		'1': '8:30-9:30',
		'2': '9:30-10:30',
		'3': '10:30-11:30',
		'4': '14:30-15:30',
		'5': '15:30-16:30',
		'6': '16:30-17:30'
	}

	async function getPatient(id) {
		let res = await getPatientById(id)
		res = res.data
		console.log(res)
		patientName.value = res.name;
		return res
	}
	async function addappointment() {
		try {
			console.log(appointmentData.value)
			let res = await addAppointment(appointmentData.value)
			appointmentData.value.appointmentId = res.data
			console.log(res)
		} catch (e) {
			console.error(e)
			uni.navigateBack({
				delta: 2
			})
		}
	}
	async function cancelappointment() {
		try {
			let res = await payCallback({
				appointmentId: appointmentData.value.appointmentId,
				isPaid: false
			})
			console.log(res)
			uni.navigateBack({
				delta: 2
			})
		} catch (e) {
			console.error(e)
		}
	}
	async function payCall() {
		try {
			let res = await payCallback({
				appointmentId: appointmentData.value.appointmentId,
				isPaid: isPaid.value
			})
			console.log(res)
		} catch (e) {
			console.error(e)
		}
	}

	onLoad((options) => {
		const decodedInfo = decodeURIComponent(options.info);
		let data = JSON.parse(decodedInfo);
		const nowtime = new Date()
		const chinaTime = new Date(nowtime.getTime() + 8 * 60 * 60 * 1000);
		orderTime.value = format(chinaTime, 'yyyy-MM-dd HH:mm');
		console.log(orderTime.value)
		doctorName.value = data.doctorName;
		department.value = data.specialization;
		amount.value = data.amount;
		patient.value = getPatient(data.patientId);
		time.value = data.date + '  ' + timehash[data.time];
		console.log(data)
		//regId.value = parseInt(options.regId, 10);
		appointmentData.value = {
			scheduleId: data.scheduleId,
			doctorId: parseInt(data.doctorId),
			patientId: data.patientId,
			userId: parseInt(store.state.user),
			appointmentDate: data.date,
			appointmentTime: parseInt(data.time),
			createTime: orderTime.value.substring(0, 10),
			fee: parseInt(data.amount) * 100
		}
		console.log(appointmentData.value)
		addappointment();
	})

	const handlePayment = () => {
		//将数据库订单状态切为已支付，并将其传回isPaid
		isPaid.value = true
		isSuccess.value = isPaid.value
		infoPopup.value.open();
		payCall();
	}

	const abandonPayment = () => {
		if (!isPaid.value) cancelappointment();
		else {
			uni.navigateTo({
				url: '/pages/index/index'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.paymentInfoLayout {
		display: flex;
		flex-direction: column;
		padding: 20px;
		// background-color: #f9f9f9;
		border-radius: 8px;

		.title {
			font-size: 20px;
			font-weight: bold;
			margin-bottom: 20px;
			text-align: center;
		}

		.box {
			width: 690rpx;
			// height: 200rpx;
			border-radius: 30rpx;
			box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
			margin: 30rpx auto;
			background: #fff;

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
		}

		.button {
			margin: 30rpx 0;
		}
	}

	.paymentLayout {
		background: #fff;
		border-radius: 50rpx 50rpx 0 0;

		.layout {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 30rpx;

			.icon {
				margin-top: 100rpx;
				width: 200rpx;
				height: 200rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.success-text {
				font-size: 60rpx;
				color: #333;
				margin-top: 30rpx;
			}

			.money {
				font-size: 80rpx;
				color: #333;
				margin-top: 30rpx;
				// margin-bottom: 30rpx;
			}

			.detail {
				margin-top: 30rpx;
				display: flex;
				// background: red;
				flex-direction: column;
				// align-items: center;
				width: 690rpx;
				margin: 50rpx auto;
				margin-bottom: 50rpx;

				.time {
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

				.method {
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
			}

			.buttons {
				display: flex;
				flex-direction: column;
				width: 100%;
				margin-top: 100rpx;

				.watch {
					margin-bottom: 20rpx;
				}

				.back {
					margin-bottom: 20rpx;
				}
			}
		}
	}
</style>