<template>
	<view class="smallIcon">
		<navigator class="box"
		:url="item.url">
			<!-- <view class="empty"></view> -->
			<image class="pic" :src="item.picurl || defaultPicurl" mode="aspectFit"></image>
			<view class="text">{{item.name}}</view>
		</navigator>
	</view>
</template>

<script setup>
// import { defineProps } from 'vue';

import { ref } from 'vue';

defineProps({
	item:{
		type:Object,
		default(){
			return {
				name:"默认名称",
				picurl:"../../static/logo.png",
			}
		}
	}
})
const defaultPicurl = ref("../../static/logo.png");
const defaultUrl = ref("/pages/registration/registration");

</script>

<style lang="scss" scoped>
.smallIcon{
	height: 100%;
	.box{
		height: 100%;
		overflow: hidden;
		position: relative;
		.pic{
			margin-top: 15%;
			width: 100%;
			height: 60%;
			border-radius: 35rpx;
		}
		.text{
			width: 100%;
			height: 25%;
			margin-bottom: 0%;
			position: relative;
			bottom: 0;
			color: #000;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 600;
			font-size: 25rpx; 
		}
	}
	
}	       
</style>