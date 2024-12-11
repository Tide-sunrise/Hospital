<template>
	<view class="recordLayout pageBg2">
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
			<view class="info-item">
				<label>支付状态:</label>
				<span>{{ item.isPaid?'已支付':'未支付' }}</span>
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
	
	const recordList = ref([]);
	
	//返回上一页
	const goBack = () => {
		uni.navigateTo({
			url:'/pages/User/User'
		})
	}
</script>

<style lang="scss" scoped>
.recordLayout{
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
	.box{
		width: 690rpx;
		// height: 200rpx;
		border-radius: 30rpx;
		box-shadow: 0 10px 10px rgba(0,0,0,0.1);
		margin: 30rpx auto;
		background: #fff;
		padding: 30rpx 0;
		.info-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			margin: 30rpx 30rpx ;
			label {
				font-weight: bold;
			}
		
			span {
				font-size: 16px;
			}
		}
	}	
}
</style>