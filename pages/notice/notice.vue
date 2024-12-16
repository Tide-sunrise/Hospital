<template>
	<view class="noticeLayout pageBg2">
		<myEmpty height="50rpx"></myEmpty>
		<view class="box">
			<view class="titleBox">
				<view class="goBack" @click="goBack" :style="{top:getStatusBarHeight()+'px'}">
					<uni-icons type="back" color="#000" size="20"></uni-icons>
				</view>
				<view class="title">
					公告
				</view>
			</view>
			<view class="notice" v-for="item in 8" @click="navToDetail">
				这是一条公告
			</view>
		</view>
	</view>
</template>

<script setup>
import {ref} from 'vue';
import {getStatusBarHeight,getTitleBarHeight,getNavBarHeight} from "@/utils/system.js"	


//返回上一页
const goBack = ()=>{
	uni.navigateTo({
		url:"/pages/index/index"
	})
}

//跳转到详情页
const navToDetail = ()=>{
	uni.navigateTo({
		url:"/pages/notice/detail"
	})
}
</script>

<style lang="scss" scoped>
.noticeLayout{
	padding: 30rpx 0;
	// margin: 30rpx;
	.box{
		width: 690rpx;
		height: 60rpx;
		margin: 0 30rpx;
		.titleBox{
			// position: relative;
			margin: 0 0 30rpx 0;
			display: flex;
			flex-direction: row;
			width: 690rpx;
			// margin: 0 30rpx;
			background: white;
			border-radius: 30rpx;
			box-shadow: 0 10px 10px rgba(0,0,0,0.1);
			.goBack{
				margin: 5rpx;
				width: 50rpx;
				height: 50rpx;
				// background: rgba(0, 0, 0, 0.5);
				left: 30rpx;
				// margin-left: 30rpx;
				border-radius: 100px;
				top: 0;
				// backdrop-filter: blur(10rpx);
				// border: 1rpx solid rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.title{
				// background: red;
				width: 630rpx;
				height: 60rpx;
				padding-right: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.notice{
			display: flex;
			padding-left: 30rpx;
			// justify-content: center;
			align-items: center;
			flex-direction: row;
			margin: 30rpx 0;
			width: 690rpx;
			height: 60rpx;
			// margin: 0 30rpx;
			background: white;
			border-radius: 30rpx;
			box-shadow: 0 10px 10px rgba(0,0,0,0.1);
		}
	}
}   
</style>
