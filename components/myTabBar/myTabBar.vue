<template>
	<view class="myTabBar">
		<wd-tabbar shape="round" active-color="#ee0a24" inactive-color="#000" fixed v-model="tabbar" @change="handleChange1">
		  <wd-tabbar-item title="首页" icon="home" ></wd-tabbar-item>
		  <wd-tabbar-item title="医院信息" icon="list"></wd-tabbar-item>
		  <wd-tabbar-item title="我的" icon="user"></wd-tabbar-item>
		</wd-tabbar>
	</view>
</template>

<script setup>
import {tabBarList} from '../../common/data/data.js'
import { ref } from 'vue';
const props = defineProps({
	item:{
		type:Object,
		default(){
			return {
				myTabbar:0,
			}
		}
	}
})

//导航栏
const handleChange1=({ value })=> {
  console.log(value);
  console.log(tabBarList[value].url);
  uni.reLaunch({
  	url:tabBarList[value].url
  })
}

const tabbar=ref(props.item.myTabbar)
const defaultUrl="/pages/index/index"


</script>

<style lang="scss" scoped>
	       
</style>