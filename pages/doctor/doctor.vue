<template>
	<view class="doctorLayout pageBg">
		<view class="upBar">
			<view class="anyDay">
				<text class="t1">不限</text>
				<text class="t2">日期</text>
			</view>
			<scroll-view :show-scrollbar="false" scroll-x="true" class="fixedDay">
				<view class="fixDay" v-for="item in 14">
					<view class="box">
						<text class="t1">周日</text>
						<text class="t2">9-15</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="doctor" v-for="item in 8">
			<view class="up-content">
				<view class="box2">
					<view class="image">
						<image src="../../common/image/genshin.jpg" mode="aspectFill"></image>
					</view>
					<view class="row">
						<view class="text">原神</view>
						<view class="smallText">mihoyo</view>
					</view>
				</view>
			</view>
			<view class="bar"></view>
			<view class="down-content">
				<scroll-view :show-scrollbar="false" scroll-x="true" class="downFixedDay">
					<view class="downFixDay" v-for="item in 8" >
						<view class="box" @click="navToDetail">
							<text class="t1">周日</text>
							<text class="t2">9-15</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref,onMounted } from 'vue'

onMounted(()=>{
	console.log("挂载")
})
const  navToDetail = () => {
	uni.navigateTo({
		url: '/pages/doctor-details/doctor-details'
	})
}
</script>

<style lang="scss" scoped>
.doctorLayout{
	.upBar{
		display: flex;
		flex-direction: row;
		padding: 0 30rpx;
		// background: #e8e8e4;
		.anyDay{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 120rpx;
			height: 120rpx;
			padding: 10rpx 0 10rpx 0;
			margin-top: 10rpx;
			margin-right: 10rpx;
			background-color: white;
			border-radius: 20rpx;
			box-shadow: 0px 10px 10px rgba(0,0,0,0.1);
			flex-direction: column;
		}
		.fixedDay{
			display: flex;
			flex-direction: row;
			max-width: 560rpx;
			height: 140rpx;
			padding: 10rpx 0 10rpx 0;
			white-space:nowrap; 
			scroll-behavior: smooth;
			-webkit-overflow-scrolling: touch;
			.fixDay{
				width: 120rpx;
				height: 120rpx;
				margin: 0 5rpx 0 5rpx;
				background-color: white;
				// background-color: red;
				border-radius: 20rpx;
				box-shadow: 0 10px 10px rgba(0,0,0,0.1);
				display: inline-block;
				.box{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					flex-direction: column;
					.t1{
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 30rpx;
						color: #333;
					}
					.t2{
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 30rpx;
						color: #666;
					}
				}
				
			}
		}
	}
	.doctor{
		height: 400rpx;
		width: 690rpx;
		border-radius: 30rpx;
		box-shadow: 0 10px 10px rgba(0,0,0,0.1);
		margin: 20rpx auto;
		background-color: white;
		// background: red;
		.up-content{
			height: 250rpx;
			// background: skyblue;
			border-radius: 30rpx 30rpx 0 0;
			.box2{
				display: flex;
				flex-direction: row;
				.image{
					width: 250rpx;
					box-sizing: border-box;
					height: 250rpx;
					image{
						margin:25rpx ;
						width: 200rpx;
						height: 200rpx;
						border-radius: 50%;
					}
				}
				.row{
					width: 440rpx;
					height: 200rpx;
					margin: 25rpx;
					display: flex;
					flex-direction: column;
					// justify-content: center;
					// align-items: center;
					font-size: 18px;
					// background: red;
					color:#333;
					.text{
						// padding:0rpx;
					}
					.smallText{
						// padding-right:0 5px;
						// margin-bottom: 180rpx;
						font-size: 25rpx;
					}
				}
			}
		}
		.bar{
			height: 5rpx;
			background: #e8e8e4;
		}
		.down-content{
			height: 145rpx;
			// background: pink;
			border-radius: 0 0 30rpx 30rpx;
			.downFixedDay{
				display: flex;
				flex-direction: row;
				max-width: 670rpx;
				height: 145rpx;
				padding: 10rpx;
				white-space:nowrap; 
				scroll-behavior: smooth;
				-webkit-overflow-scrolling: touch;
				.downFixDay{
					width: 125rpx;
					height: 125rpx;
					margin: 0 5rpx 0 5rpx;
					// background-color: red;
					border-radius: 20rpx;
					box-shadow: 0 10px 10px rgba(0,0,0,0.1);
					display: inline-block;
					.box{
						display: flex;
						align-items: center;
						justify-content: center;
						width: 100%;
						height: 100%;
						flex-direction: column;
						.t1{
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 30rpx;
							color: #333;
						}
						.t2{
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 30rpx;
							color: #666;
						}
					}
					
				}
			}
		}
	}
}   
</style>
