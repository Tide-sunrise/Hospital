<template>
	<view class="layout">
		<view class="navbar">
			<view v-if="isBack" class="goBack" @click="goBack" :style="{top:getStatusBarHeight()+'px'}">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="statusBar" :style="{height:getStatusBarHeight()+'px'}"></view>
			<view class="titleBar" :style="{height:getTitleBarHeight()+'px'}">
				<view class="title">{{title}}</view>
				<navigator url="/pages/search/search" class="search">
					<uni-icons class="icon" type="search" size="18" color="#888"></uni-icons>
					<text class="text">搜索</text>
				</navigator>
			</view>
		</view>
		
		<view class="fill" :style="{height:getNavBarHeight()+'px'}">
			
		</view>
	</view>
</template>

<script setup>
import {ref} from 'vue';
import {getStatusBarHeight,getTitleBarHeight,getNavBarHeight} from "@/utils/system.js"

defineProps({
	title:{
		type:String,
		default:"壁纸"
	},
	
	isBack:{
		type:Boolean,
		default:false
	}
	
})


//返回上一页
const goBack = ()=>{
	uni.navigateBack({
		success:()=>{
			
		},
		fail:(err)=>{
			uni.reLaunch({
				url:"/pages/index/index"
			})
		}
	})
}
</script>

<style lang="scss" scoped>
.layout{
	.navbar{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		padding-top: 30rpx;
		background:
		linear-gradient(to bottom,transparent 0%, #fff 400rpx),
		linear-gradient(to left,#beecd8 20%,#b2e0fa);
        display: flex;
		flex-direction: row;//设置布局方向为水平
		.goBack{
			width: 38px;
			height: 38px;
			background: rgba(0, 0, 0, 0.5);
			left: 30rpx;
			margin-left: 30rpx;
			border-radius: 100px;
			top: 0;
			backdrop-filter: blur(10rpx);
			border: 1rpx solid rgba(255, 255, 255, 0.3);
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.statusBar{
			// border: 1px solid red;
		}
		.titleBar{
			display: flex;
			align-items: center;
			padding: 0 30rpx;
			// border: 1px solid green;
			.title{
				font-size: 22px;
				font-weight: 700;
				color: $text-font-color-1;
			}
			.search{
				width: 220rpx;
				height: 50rpx;
				border-radius: 60rpx;
				background: rgba(255,255,255,0.4);
				// border: 1px solid #fff;
				margin-left: 30rpx;
				color: #999;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				.icon{
					margin-left: 5rpx;
				}
				.text{
					padding-left: 10rpx;
				}
			}
		}
	}
	.fill{
		
	}
}	       
</style>