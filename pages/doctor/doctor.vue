<template>
	<view class="doctorLayout pageBg">
		<view class="layout">
			<view class="navbar">
				<view class="goBack" @click="goBack">
					<uni-icons type="back" color="#000" size="20"></uni-icons>
				</view>
				<view class="text">
					医生日期选择
				</view>
				<view class="goBack">
					<!-- <uni-icons type="back" color="#fff" size="20"></uni-icons> -->
				</view>
			</view>
		</view>
		<view class="em">
			
		</view>
		<view class="upBar">
			<view class="anyDay" @click="showAllDoctorList">
				<text class="t1">所有</text>
				<text class="t2">医生</text>
			</view>
			<scroll-view :show-scrollbar="false" scroll-x="true" class="fixedDay">
				<view class="fixDay" v-for="item in date">
					<view class="box" @click="showThisDay(item.date)">
						<text class="t1">{{item.week}}</text>
						<text class="t2">{{item.date}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="doctor" v-for="item in showDoctorList">
			<view class="up-content">
				<view class="box2">
					<view class="image">
						<image :src="item.avatar" mode="aspectFill"></image>
					</view>
					<view class="row">
						<view class="text">{{item.name}}</view>
						<view class="smallText">{{item.title}}</view>
					</view>
				</view>
			</view>
			<view class="bar"></view>
			<view class="down-content">
				<scroll-view :show-scrollbar="false" scroll-x="true" class="downFixedDay">
					<view class="downFixDay" v-for="item in item.schedule" >
						<view class="box" @click="navToDetail">
							<text class="t1">{{item.week}}</text>
							<text class="t2">{{item.date}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getBySpecializationId } from '@/api/schedule.js'
import { formatDateToChinese } from '@/utils/date.js'

const titlehash = {
	'1': '医士',
	'2': '医师',
	'3': '主治医师',
	'4': '副主任医师',
	'5': '主任医师',
	'6': '专家'
}
const specializationsId = ref()
const date = ref([])
const showDoctorList = ref([
	{
		name: '原神',
		title: 'mihoyo',
		avatar: '../../common/image/genshin.jpg',
		schedule: [
			{
				date: '9-15',
				week: '周日',
			},
			{
				date: '9-15',
				week: '周一',
			},
			{
				date: '9-15',
				week: '周二',
			},
			{
				date: '9-15',
				week: '周三',
			},
			{
				date: '9-15',
				week: '周四',
			},
			{
				date: '9-15',
				week: '周五',
			},
			{
				date: '9-15',
				week: '周六',
			}
		],
	},
	{
		name: '原神',
		title: 'mihoyo',
		avatar: '../../common/image/genshin.jpg',
		schedule: [
			{
				date: '9-15',
				week: '周日',
			},
			{
				date: '9-15',
				week: '周一',
			},
			{
				date: '9-15',
				week: '周二',
			},
			{
				date: '9-15',
				week: '周三',
			},
			{
				date: '9-15',
				week: '周四',
			},
			{
				date: '9-15',
				week: '周五',
			},
			{
				date: '9-15',
				week: '周六',
			}
		],
	}
])
const doctorList = ref([])

onLoad((option)=>{
	specializationsId.value = option.specializationId
	async function getDoctorList(){
		//获取现在的日期与周几
		let now = new Date()
		date.value.push(formatDateToChinese(now))
		//将包括今天在内7天的总日期存入date中
		for(let i=1;i<7;i++){
			now.setDate(now.getDate()+1)
			date.value.push(formatDateToChinese(now));
		}
		//获取到所有该科室下医生的排班信息
		let res = await getBySpecializationId(specializationsId.value)
		console.log(res)
		let doctorHash = {}
		res = res.data
		for(let i = 0;i<res.length;i++){
			if(doctorHash.hasOwnProperty(res[i].doctorId)){
				let part = formatDateToChinese(new Date(res[i].date))
				doctorHash[res[i].doctorId].schedule.push({
					date: part.date,
					week: part.week,
					time: res[i].time,
					remain: res[i].availableNumber
				})
			}
			else{
				let doctor = {}
				doctor.doctorId = res[i].doctorId
				doctor.name = res[i].doctorName
				doctor.title = titlehash[res[i].titleId]
				doctor.schedule = []
				let part = formatDateToChinese(new Date(res[i].date))
				doctor.schedule.push({
					date: part.date,
					week: part.week,
					time: res[i].time,
					remain: res[i].availableNumber
				})
				doctorHash[res[i].doctorId] = doctor
			}
		}
		console.log(doctorHash)
		for(let key in doctorHash){
			doctorList.value.push(doctorHash[key])
		}
		if(doctorList.value) showDoctorList.value = doctorList.value;
	}
	getDoctorList()
})

const showAllDoctorList = () => {
	showDoctorList.value = doctorList.value
}
const showThisDay = (date) => {
	showDoctorList.value = doctorList.value.filter((item)=>{
		for(let i=0;i<item.schedule.length;i++){
			if(item.schedule[i].date == date) return true
		}
		return false
	})
	console.log(showDoctorList)
}
const navToDetail = () => {
	uni.navigateTo({
		url: '/pages/doctor-details/doctor-details'
	})
}
const goBack = () => {
	uni.navigateTo({
		url:'/pages/registration/registration'
	})
}
</script>

<style lang="scss" scoped>
.doctorLayout{
	.layout {
		.navbar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 10;
			padding: 30rpx 0;
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
			.text{
				width: 554rpx;
			}
		}
	}
	.em{
		height: 98rpx;
	}
	.upBar{
		display: flex;
		flex-direction: row;
		padding: 0 30rpx;
		// background: #e8e8e4;
		.anyDay{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 120rpx;
			height: 120rpx;
			padding: 10rpx 0 10rpx 0;
			margin-top: 10rpx;
			margin-right: 10rpx;
			background-color: white;
			border-radius: 20rpx;
			box-shadow: 0px 10px 10px rgba(0,0,0,0.1);
			flex-direction: column;
		}
		.fixedDay{
			display: flex;
			flex-direction: row;
			max-width: 560rpx;
			height: 140rpx;
			padding: 10rpx 0 10rpx 0;
			white-space:nowrap; 
			scroll-behavior: smooth;
			-webkit-overflow-scrolling: touch;
			.fixDay{
				width: 120rpx;
				height: 120rpx;
				margin: 0 5rpx 0 5rpx;
				background-color: white;
				// background-color: red;
				border-radius: 20rpx;
				box-shadow: 0 10px 10px rgba(0,0,0,0.1);
				display: inline-block;
				.box{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					flex-direction: column;
					.t1{
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 30rpx;
						color: #333;
					}
					.t2{
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 30rpx;
						color: #666;
					}
				}
				
			}
		}
	}
	.doctor{
		height: 400rpx;
		width: 690rpx;
		border-radius: 30rpx;
		box-shadow: 0 10px 10px rgba(0,0,0,0.1);
		margin: 20rpx auto;
		background-color: white;
		// background: red;
		.up-content{
			height: 250rpx;
			// background: skyblue;
			border-radius: 30rpx 30rpx 0 0;
			.box2{
				display: flex;
				flex-direction: row;
				.image{
					width: 250rpx;
					box-sizing: border-box;
					height: 250rpx;
					image{
						margin:25rpx ;
						width: 200rpx;
						height: 200rpx;
						border-radius: 50%;
					}
				}
				.row{
					width: 440rpx;
					height: 200rpx;
					margin: 25rpx;
					display: flex;
					flex-direction: column;
					// justify-content: center;
					// align-items: center;
					font-size: 18px;
					// background: red;
					color:#333;
					.text{
						// padding:0rpx;
					}
					.smallText{
						// padding-right:0 5px;
						// margin-bottom: 180rpx;
						font-size: 25rpx;
					}
				}
			}
		}
		.bar{
			height: 5rpx;
			background: #e8e8e4;
		}
		.down-content{
			height: 145rpx;
			// background: pink;
			border-radius: 0 0 30rpx 30rpx;
			.downFixedDay{
				display: flex;
				flex-direction: row;
				max-width: 670rpx;
				height: 145rpx;
				padding: 10rpx;
				white-space:nowrap; 
				scroll-behavior: smooth;
				-webkit-overflow-scrolling: touch;
				.downFixDay{
					width: 125rpx;
					height: 125rpx;
					margin: 0 5rpx 0 5rpx;
					// background-color: red;
					border-radius: 20rpx;
					box-shadow: 0 10px 10px rgba(0,0,0,0.1);
					display: inline-block;
					.box{
						display: flex;
						align-items: center;
						justify-content: center;
						width: 100%;
						height: 100%;
						flex-direction: column;
						.t1{
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 30rpx;
							color: #333;
						}
						.t2{
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 30rpx;
							color: #666;
						}
					}
					
				}
			}
		}
	}
}   
</style>
