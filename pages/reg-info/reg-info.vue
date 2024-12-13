<template>
	<view class="registration-container pageBg2">
		<view class="header">
			<text class="title">挂号信息</text>
		</view>
		<view class="info-block">
			<view class="info-item"><text><strong>挂号日期:</strong>
					{{data.date.getFullYear()}}年{{data.date.getMonth()+1}}月{{data.date.getDate()}}日</text></view>
			<view class="info-item"><text><strong>挂号时间:</strong> {{ registrationTime }}</text></view>
			<view class="info-item"><text><strong>挂号金额:</strong> ¥{{data.titleFee}}</text></view>
			<view class="info-item"><text><strong>医生信息:</strong>
					{{data.name}}&nbsp&nbsp&nbsp{{data.specializationName+data.title}}</text></view>
		</view>
		<view v-if="!isPaid" class="payment-section">
			<up-button @click="handlePayment" color="rgb(66, 83, 216)" shape="circle">确认挂号</up-button>
		</view>
		<view v-else class="success-message">
			<text>挂号成功！请于指定时间前往医院就诊。</text>
		</view>
		<wd-button v-if="isPaid" block @click="navBack">返回主页</wd-button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		getDoctorInfo
	} from '@/api/doctor.js'

	// 定义响应式变量
	const isPaid = ref(false);
	const registrationTime = ref('');
	const isisPaid = ref(true);
	const timehash = {
		'1': '8:30-9:30',
		'2': '9:30-10:30',
		'3': '10:30-11:30',
		'4': '14:30-15:30',
		'5': '15:30-16:30',
		'6': '16:30-17:30'
	}
	const titlehash = {
		'1': '医士',
		'2': '医师',
		'3': '主治医师',
		'4': '副主任医师',
		'5': '主任医师',
		'6': '专家'
	}
	const data = ref({})

	async function getDoctor(id) {
		let res = await getDoctorInfo(id)
		res = res.data
		data.value.name = res.name
		data.value.title = res.titleName
		data.value.specializationName = res.specializationName
		data.value.titleFee = parseFloat(res.titleFee)
		data.value.titleFee /= 100
		data.value.titleFee = data.value.titleFee.toFixed(2)
		console.log(data.value)
	}

	// // 模拟页面加载时获取传递过来的时间参数
	onLoad((options) => {
		data.value = JSON.parse(options.info)
		//转换时区为本地时区
		data.value.date = new Date(data.value.date);
		registrationTime.value = timehash[data.value.time] || '8:30-9:30';
		isPaid.value = options.isPaid === 'true' || false;
		isisPaid.value = isPaid.value
		getDoctor(data.value.doctorId);
	});

	//重新切回页面时诱发函数效果,但是第一次进入不需要
	// onLoad(()=>{
	// 	if(isisPaid.value){
	// 		uni.showToast({
	// 			title: '挂号成功！请于指定时间前往医院就诊。',
	// 			icon: 'none',
	// 			duration: 2000
	// 		});
	// 	}
	// })


	// 处理支付逻辑
	const handlePayment = () => {
		// 这里可以添加实际的支付处理逻辑，比如调用支付API等
		uni.showModal({
			title: '支付确认',
			content: '是否确认支付' + data.value.titleFee + '?',
			success: (res) => {
				if (res.confirm) {
					// 模拟支付成功后的状态改变
					//先把这条数据提交了,再获取挂号信息id
					setTimeout(() => {
						isPaid.value = true;
						console.log(data.value)
						let obj = {
							doctorName: data.value.name,
							specialization: data.value.specializationName,
							amount: data.value.titleFee,
							patientId: data.value.patientId,
							time: timehash[data.value.time],
							date: data.value.date.toLocaleString('zh-CN', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit'
							}).replace(/\//g, '-')
						}
						uni.navigateTo({
							url: '/pages/payment-confirmation/payment-confirmation?info=' +
								encodeURIComponent(JSON.stringify(obj))
						})
					}, 0); // 假设需要1秒来完成支付过程
				}
			}
		});
	};


	const navBack = () => {
		uni.navigateTo({
			url: '/pages/index/index'
		})
	}
</script>

<style lang="scss" scoped>
	.registration-container {
		padding: 20px;
		background-color: #f7f7f7;
		border-radius: 10px;
		text-align: center;

		.header {
			margin-bottom: 20px;

			.title {
				font-size: 24px;
				color: #333;
			}
		}

		.info-block {
			background-color: white;
			padding: 20px;
			border-radius: 8px;
			margin-bottom: 20px;
			box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

			.info-item {
				margin: 5px 0;
				font-size: 16px;
				color: #666;

				strong {
					color: #333;
				}
			}
		}

		.payment-section {
			margin-bottom: 20px;
		}

		.success-message {
			background-color: #e6ffed;
			padding: 20px;
			border-radius: 8px;
			color: #28a745;
			font-weight: bold;
			margin-bottom: 40rpx;
		}
	}
</style>