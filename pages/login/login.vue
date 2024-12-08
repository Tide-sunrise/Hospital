<template>
	<view>
		你得登录
	</view>
</template>

<script setup>
	import { ref,onMounted } from 'vue'
	import store from '@/store/index.js'
	
	//挂载前检查当前token是否存在或者在有效期内
	onMounted(()=>{
		store.dispatch('checkToken');
		if(store.getters.isAuthenticated){
			uni.navigateTo({
				url: '/pages/index/index'
			})
		}
	})
</script>

<style>
	       
</style>
