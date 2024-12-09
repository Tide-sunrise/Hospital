<template>
	<view class="health-card">
		<view v-if="cardExist" class="exist" @click="navToCards">
			<view class="box2">
				<view class="image">
					<up-avatar :text="cardinfo.name" fontSize="18" randomBgColor size="80"></up-avatar>
				</view>
				<view class="row">
					<view class="text">姓名：{{cardinfo.name}}</view>
					<view class="smallText">身份证号：{{cardinfo.id}}</view>
				</view>
			</view>
		</view>
		<view v-else class="none" @click="navToform">
			<uni-icons type="plus" size="100"></uni-icons>
		</view>
		
	</view>
</template>

<script setup>
import { ref } from 'vue';


const props = defineProps({
	cardinfo:{
		type:Object,
		default(){
			return {
				isExist:false,
			}
		}
	},
})
const cardExist = ref(props.cardinfo.isExist);
// console.log(props.cardinfo);

const navToCards = () => {
	let arr=getCurrentPages();
	console.log();
	if(!(arr[arr.length-1].route==='pages/health-cards/health-cards')){
		uni.navigateTo({
				url: '/pages/health-cards/health-cards'
			})
		}
	}
	

const navToform = () => {
	uni.navigateTo({
		url: '/pages/health-card-form/health-card-form'
	})
}

const extractColorByName= (name) => {
	var temp = [];
	temp.push("#");
	for (let index = 0; index < name.length; index++) {
	    temp.push(parseInt(name[index].charCodeAt(0), 10).toString(16));
	}
	return temp.slice(0, 5).join('').slice(0, 4);
}
</script>

<style lang="scss" scoped>
.health-card{
		background: white;
		width: 690rpx;
		height: 200rpx;
		border-radius: 30rpx;
		box-shadow: 0 10px 10px rgba(0,0,0,0.1);
		margin: 20rpx auto;
		.box2{
			display: flex;
			flex-direction: row;
			.image{
				width: 200rpx;
				box-sizing: border-box;
				height: 200rpx;
				margin: 0 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.row{
				width: 440rpx;
				height: 200rpx;
				// margin: 25rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				// align-items: center;
				font-size: 18px;
				// background: red;
				color:#333;
				gap: 30rpx;
				.text{
					// padding:0rpx;
					font-size: 30rpx;
				}
				.smallText{
					// padding-right:0 5px;
					// margin-bottom: 180rpx;
					font-size: 20rpx;
				}
			}
		}
		.none{
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}	       
</style>