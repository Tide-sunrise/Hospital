<template>
	<view class="catalogsLayout">
		<view class="imageBackground">
			<image src="../../common/image/xiangya2.jpg" mode="aspectFill"></image>
		</view>
		
		<view class="logo">
			<image src="../../common/image/genshin.jpg" mode="aspectFill"></image>
		</view>
		<view class="content ">
			<view class="title">米家医院</view>
			<view class="box">
				<view class="swiper-item-view">
				    <small-icon v-for="item in 8"></small-icon>
				</view>
			</view>
		</view>
		<myEmpty height="300rpx"></myEmpty>
		<myTabBar :item="itemTab"></myTabBar>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import {tabBarList} from '../../common/data/data.js'

const itemTab=ref({myTabbar:1})


</script>

<style lang="scss" scoped>
.catalogsLayout{
	.imageBackground{
		width: 100%;
		height: 400rpx;
		position: relative; /* 使得相对定位生效 */
		overflow: hidden; /* 隐藏溢出的部分，如果需要的话 */
		image{
			width: 130%;
			height: 100%;
			margin-left: -15%; /* 向左移动 25%，以达到居中效果 */
			border-radius:0 0 50% 50% ;

		}
	}
	.logo{
		position: absolute;
		top: 275rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 250rpx;
		height: 250rpx;
		border-radius: 50%;
		overflow: hidden;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.content{
		padding: 20rpx;
		.title{
			padding: 150rpx 0 60rpx 0;
			display: flex;
			font-size: 56rpx;
			color: #000;
			justify-content: center;
		}
		.box {
		    height: 400rpx;
			border-radius:0 0 30rpx 30rpx;
			// background: red;
			
			.swiper-item-view {
			   height: 600rpx;
			   text-align: center;
			   padding: 0rpx 80rpx;
			   display: grid;
			   grid-template-columns: repeat(3,1fr);
			   column-gap: 100rpx;
			   row-gap: 10rpx;
			}
		}
	}
}	       
</style>
