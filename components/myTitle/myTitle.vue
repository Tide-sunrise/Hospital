<template>
	<view class="title">
		<view class="line">
			<view class="navbar">
				<view class="goBack" @click="goBack">
					<uni-icons type="back" color="#000" size="20"></uni-icons>
				</view>
				<view class="text">
					医院介绍
				</view>
				<view class="goBack">
					<!-- <uni-icons type="back" color="#fff" size="20"></uni-icons> -->
				</view>
			</view>
			<view class="logo">
				<image :src="item.src" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
defineProps({
	item:{
		type:Object,
		default(){
			return {
				text:"你好",
				src:"../../common/image/长字.png"
			}
		}
	}
})	
const goBack = () => {
	uni.navigateBack();
};

</script>

<style lang="scss" scoped>
.title{
	
	width: 690rpx;
	// text-align: center;
	font-size: 40rpx;
	font-weight: bold;
	display: flex;
	flex-direction: column;
	// justify-content: space-between; // 分散布局
	// justify-content: center;
	// align-items: center; // 垂直居中
	// flex-shrink: 0;
	/* 条件编译 */
	/* #ifdef MP-WEIXIN */
	margin-top: 50rpx;
	
	height: 120rpx;
	/* #endif */
	.line{
		width: 690rpx;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		// justify-content: space-between;
		//让logo紧贴左侧
		.navbar{
			// position: fixed;
			// top: 0;
			// left: 0;
			// width: 100%;
			// z-index: 10;
			// padding: 30rpx 0;
			// background:
			// 	linear-gradient(to bottom, transparent 0%, #fff 400rpx),
			// 	linear-gradient(to left, #beecd8 20%, #b2e0fa);
			height: 80rpx;
			display: flex;
			flex-direction: row; //设置布局方向为水平
			width: 610rpx;	
			.goBack {
				width: 80rpx;
				height: 80rpx;
				// background: rgba(0, 0, 0, 0.5);
				// left: 30rpx;
				// margin: 0 30rpx;
				border-radius: 100px;
				top: 0;
				backdrop-filter: blur(10rpx);
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.text{
				// width: 554rpx;
				height: 80rpx;
				display: flex;
				align-items: center;
				font-size: 20px;
			}
		}
		.logo{
			width: 80rpx;
			height: 80rpx;
			margin-right: 30rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	
	

	margin-bottom: 10rpx;
}	       
</style>