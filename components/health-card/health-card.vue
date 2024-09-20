<template>
	<view class="health-card">
		<view v-if="cardExist" class="exist" @click="navToCards">
			<view class="box2">
				<view class="image">
					<image src="../../common/image/genshin.jpg" mode="aspectFill"></image>
				</view>
				<view class="row">
					<view class="text">姓名：原神</view>
					<view class="smallText">身份证号：114514191981011451</view>
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
	}
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
				image{
					margin:25rpx ;
					width: 150rpx;
					height: 150rpx;
					border-radius: 20%;
				}
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