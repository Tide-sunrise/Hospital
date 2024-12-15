<template>
	<view class="doctorDetailLayout pageBg2">
		<view class="logoBackground">
			<view class="logo">
				<image src="../../static/zxj/male.png" mode="aspectFill"></image>
			</view>
			<view class="box">
				<view class="name">
					{{data.name}}
				</view>
				<view class="reservation">
					{{titlehash[data.titleId]}}
				</view>
			</view>
		</view>
		<view class="time-of-registration">
			<view class="time">
				<text>就诊时间： <uni-dateformat :date="date" format="yyyy-MM-dd"></uni-dateformat></text>
			</view>
			<view class="time-detail">
				<view class="morning" v-if="f1">
					<view class="text">上午 （08：30-11：30） 有号 </view>
					<view class="button">
						<wd-button size="small" @click="timeSelect1">预约</wd-button>
					</view>
				</view>
				<view class="morning" v-else>
					<view class="text">上午 （08：30-11：30） 无号 </view>
					<view class="button">
						<wd-button size="small" @click="timeSelect1" disabled>预约</wd-button>
					</view>
				</view>
				<view class="afternoon" v-if="f2">
					<view class="text">下午 （14：30-17：30） 有号</view>
					<view class="button">
						<wd-button size="small" @click="timeSelect2">预约</wd-button>
					</view>
				</view>
				<view class="afternoon" v-else>
					<view class="text">下午 （14：30-17：30） 无号</view>
					<view class="button">
						<wd-button size="small" @click="timeSelect2" disabled>预约</wd-button>
					</view>
				</view>
			</view>
		</view>
		<view class="patient">
			<view class="title">
				<view class="text">当前就诊人</view>
				<view class="button">
					<wd-button size="small" type="info" @click="cardSelect">健康卡管理</wd-button>
				</view>
			</view>
			<view class="logo">
				<up-avatar :text="healthcard.name" fontSize="12" randomBgColor size="50"></up-avatar>
			</view>
			<view class="name">
				{{healthcard.name}}
			</view>
			<view class="id">
				身份证号：{{healthcard.id}}
			</view>
		</view>

		<view class="w-button">
			<wd-button block @click="navBack">返回上一页</wd-button>
		</view>


		<uni-popup ref="infoPopup1" type="bottom">
			<view class="infoPopup">
				<view class="title">
					请选择时间段
				</view>
				<view class="grid">
					<!-- <up-button @click="navToInfo(1)" color="rgb(66, 83, 216)" shape="circle">
						8:30-9:30</up-button>
					<up-button @click="navToInfo(2)" color="rgb(66, 83, 216)" shape="circle">
						9:30-10:30</up-button>
					<up-button @click="navToInfo(3)" color="rgb(66, 83, 216)" shape="circle">
						10:30-11:30 {{uu}}</up-button> -->
					<up-button v-for="item,index in data.morning" @click="navToInfo(index)" color="rgb(66, 83, 216)"
						shape="circle" :disabled="item<=0">
						{{timehash[index]}} 剩余号量:{{item}}
					</up-button>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="infoPopup2" type="bottom">
			<view class="infoPopup">
				<view class="title">
					请选择时间段
				</view>
				<view class="grid">
					<!-- <up-button @click="navToInfo(4)" color="rgb(66, 83, 216)" shape="circle">
						14:30-15:30</up-button>
					<up-button @click="navToInfo(5)" color="rgb(66, 83, 216)" shape="circle">
						15:30-16:30</up-button>
					<up-button @click="navToInfo(6)" color="rgb(66, 83, 216)" shape="circle">
						16:30-17:30</up-button> -->
					<up-button v-for="item,index in data.afternoon" @click="navToInfo(index)" color="rgb(66, 83, 216)"
						shape="circle" :disabled="item<=0">
						{{timehash[index]}} 剩余号量:{{item}}
					</up-button>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<health-card v-for="(item,index) in Allhealthcards" :cardinfo="{isExist:true,isChoose:false,name:item.name,id:item.id}" 
				:key="index" @click="choseHealthcard(index)"></health-card>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import store from '../../store/index.js';
	import {
		ref
	} from 'vue';
	import {
		onLoad,onShow
	} from '@dcloudio/uni-app'
	import {
		convertToCurrentYearDate
	} from '@/utils/date.js'
	import {
		getByDoctorIdAndDate
	} from '@/api/schedule.js'
	import {
		getpatients
	} from '@/api/patient.js'

	//预约
	const infoPopup1 = ref(null)
	const infoPopup2 = ref(null)
	const infoPopup = ref(null)
	const doctorId = ref(0)
	const date = ref(new Date().getTime())
	const data = ref({
		name: '',
		titleId: 0,
		morning: {
			1: 0,
			2: 0,
			3: 0
		},
		afternoon: {
			4: 0,
			5: 0,
			6: 0
		}
	})
	const scheduleIdhash = ref({
		1: -1,
		2: -1,
		3: -1,
		4: -1,
		5: -1,
		6: -1,
		})
		
	const f1 = ref(false)
	const f2 = ref(false)
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
	const healthcard = ref({
		patientId: 0,
		name: '原神',
		id: '114514191981011451'
	})
	const Allhealthcards = ref([])

	async function getSchedule(z) {
		let res = await getByDoctorIdAndDate(z)
		res = res.data
		let morning = {}
		let afternoon = {}
		data.value.name = res[0].doctorName
		data.value.titleId = res[0].titleId
		for (let i = 0; i < res.length; i++) {
			if (parseInt(res[i].time) < 4) {
				f1.value = true
				data.value.morning[res[i].time] = res[i].availableNumber
				scheduleIdhash.value[res[i].time] = res[i].scheduleId
			} else {
				f2.value = true;
				data.value.afternoon[res[i].time] = res[i].availableNumber
				scheduleIdhash.value[res[i].time] = res[i].scheduleId
			}
		}
		console.log(data)
	}

	async function getHealthcard() {
		let res = await getpatients(store.state.user)
		res = res.data
		healthcard.value.patientId = res[0].patientId
		healthcard.value.name = res[0].name
		healthcard.value.id = res[0].cleartextId
		for (let i = 0; i < res.length; i++) {
			Allhealthcards.value.push({
				patientId: res[i].patientId,
				name: res[i].name,
				id: res[i].cleartextId,
			})
		}
	}

	onLoad((option) => {
		doctorId.value = option.id
		//option.date是类似于12-12的字符串，需要转换为时间
		date.value = convertToCurrentYearDate(option.date)
		let z = {
			doctorId: parseInt(doctorId.value, 10),
			date: date.value.toLocaleString('zh-CN', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			}).replace(/\//g, '-')
		}
		getSchedule(z)
		getHealthcard()
	})
	onShow(()=>{
		let z = {
			doctorId: parseInt(doctorId.value, 10),
			date: date.value.toLocaleString('zh-CN', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			}).replace(/\//g, '-')
		}
		getSchedule(z)
	})

	const timeSelect1 = () => {
		infoPopup1.value.open();
	}
	const timeSelect2 = () => {
		infoPopup2.value.open();
	}

	const cardSelect = () => {
		infoPopup.value.open();
	}
	const navToCards = () => {
		uni.navigateTo({
			url: '/pages/health-cards/health-cards'
		})
	}

	const navToInfo = (time) => {
		console.log(time);
		let obj = {
			patientId: healthcard.value.patientId,
			user: store.state.user,
			doctorId: doctorId.value,
			date: date.value,
			time: time,
			scheduleId: scheduleIdhash.value[time]
		}
		let info = encodeURIComponent(JSON.stringify(obj))
		uni.navigateTo({
			url: '/pages/reg-info/reg-info?info=' + info
		});
	};


	const navBack = () => {
		uni.navigateBack()
	}
	
	const choseHealthcard = (index) => {
		healthcard.value = Allhealthcards.value[index]
		infoPopup.value.close()
	}
</script>

<style lang="scss" scoped>
	.doctorDetailLayout {
		padding: 100rpx 0 0 0;

		.logoBackground {
			margin: 20rpx 0;

			.logo {
				position: absolute;
				// border-color: #000;
				top: 50rpx;
				left: 50%;
				z-index: 20;
				transform: translateX(-50%);
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					// display: flex;
					// justify-content: center;
					// align-items: center;
				}
			}

			.box {
				z-index: 1;
				width: 690rpx;
				margin: 0 auto;
				height: 200rpx;
				position: relative;
				/* 使得相对定位生效 */
				overflow: hidden;
				/* 隐藏溢出的部分，如果需要的话 */
				background: white;
				border-radius: 20rpx;
				box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
				padding-top: 70rpx;
				display: flex;
				// justify-content: center;
				align-items: center;
				flex-direction: column;

				.name {
					margin-bottom: 20rpx;
				}
			}

		}

		.time-of-registration {
			z-index: 1;
			width: 690rpx;
			margin: 40rpx auto;
			height: 300rpx;
			position: relative;
			/* 使得相对定位生效 */
			overflow: hidden;
			/* 隐藏溢出的部分，如果需要的话 */
			// background: skyblue;
			border-radius: 20rpx;
			box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
			background: white;
			// display: flex;
			// justify-content: center;
			// align-items: center;
			flex-direction: column;

			.time {
				width: 690rpx;
				height: 100rpx;
				padding-top: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				// background: white;
			}

			.time-detail {
				width: 690rpx;
				height: 150rpx;
				// background: white;
				display: flex;
				justify-content: center;
				// align-items: center;
				flex-direction: column;
				gap: 20rpx;

				.morning {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: row;

					.text {
						width: 500rpx;
					}
				}

				.afternoon {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: row;

					.text {
						width: 500rpx;
					}
				}
			}
		}

		.patient {
			z-index: 1;
			width: 690rpx;
			margin: 40rpx auto;
			height: 350rpx;
			position: relative;
			/* 使得相对定位生效 */
			overflow: hidden;
			/* 隐藏溢出的部分，如果需要的话 */
			// background: skyblue;
			border-radius: 20rpx;
			box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
			background: white;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.title {
				height: 100rpx;
				width: 690rpx;
				padding-top: 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: row;

				.text {
					width: 450rpx;
				}
			}

			.logo {
				height: 100rpx;
				width: 100rpx;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					border-radius: 50%;
					height: 100%;
					width: 100%;
				}

				// background: white;
			}

			.name {
				height: 50rpx;
				padding-top: 25rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				// background: white;
			}

			.id {
				height: 100rpx;
				padding-top: 0rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				// background: white;
			}
		}

		.w-button {
			width: 690rpx;
			margin: 0 30rpx;
		}

		.infoPopup {
			background: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			overflow: hidden;
			padding-bottom: 100rpx;

			.title {
				font-size: 30rpx;
				text-align: center;
				margin-bottom: 30rpx;
			}

			.grid {
				display: grid;
				grid-template-columns: repeat(1, 1fr);
				column-gap: 20rpx;
				row-gap: 20rpx;

				.tabs {
					background: #f5f5f5;
					border-radius: 20rpx;
					padding: 20rpx;
					text-align: center;
				}
			}
		}
	}
</style>