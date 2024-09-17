<template>
	<view class="cardLayout pageBg2">
		<health-card v-for="item in 4" :cardinfo="{isExist:true}"></health-card>
		<health-card v-for="item in 1" :cardinfo="{isExist:false}"></health-card>	
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
.cardLayout{
	padding: 30rpx;
}       
</style>
