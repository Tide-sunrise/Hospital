<template>
	<view class="doctorDetailLayout pageBg2">
		<view class="logoBackground">
			<view class="logo">
				<image src="../../common/image/genshin.jpg" mode="aspectFill"></image>
			</view>
			<view class="box">
				<view class="name">
					医生
				</view>
				<view class="reservation">
					预约量：114514
				</view>
			</view>
			
		</view>
		<view class="time-of-registration">
			<view class="time">
				<text>就诊时间：     2024-09-15</text>
			</view>
			<view class="time-detail">
				<view class="morning">
					<view class="text">上午 （08：00-12：00） 有号 </view>
					<view class="button">
						<wd-button size="small" @click="timeSelect">预约</wd-button>
					</view>
				</view>
				<view class="afternoon">
					<view class="text">下午 （14：30-18：00） 有号</view>
					<view class="button">
						<wd-button size="small" @click="timeSelect">预约</wd-button>
					</view>
				</view>
			</view>
		</view>
		<view class="patient">
			<view class="title">
				<view class="text">当前就诊人</view>
				<view class="button">
					<wd-button size="small" type="info">健康卡管理</wd-button>
				</view>	
			</view>
			<view class="logo">
				<image src="../../common/image/genshin.jpg" mode="aspectFill"></image>
			</view>
			<view class="name">
				原神
			</view>
			<view class="id">
				身份证号：114514191981011451
			</view>
		</view>
		
		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="title">
					请选择时间段
				</view>
				<view class="grid">
					<view class="tabs" v-for="item in 8">
						<text>10:00-10:30</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { ref } from 'vue';

//预约
const infoPopup =ref(null)
const timeSelect = () => {
	infoPopup.value.open();
}
</script>

<style lang="scss" scoped>

.doctorDetailLayout{
	padding: 100rpx 0 0 0;
	.logoBackground{
		margin: 20rpx 0;
		.logo{
			position: absolute;
			// border-color: #000;
			top: 50rpx;
			left: 50%;
			z-index: 20;
			transform: translateX(-50%);
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				// display: flex;
				// justify-content: center;
				// align-items: center;
			}
		}
		.box{
			z-index: 1;
			width: 690rpx;
			margin: 0 auto;
			height: 200rpx;
			position: relative; /* 使得相对定位生效 */
			overflow: hidden; /* 隐藏溢出的部分，如果需要的话 */
			background: white;
			border-radius: 20rpx;
			box-shadow: 0 10px 10px rgba(0,0,0,0.1);
			padding-top: 70rpx;
			display: flex;
			// justify-content: center;
			align-items: center;
			flex-direction: column;
			.name{
				margin-bottom: 20rpx;
			}
		}
		
	}
	.time-of-registration{
		z-index: 1;
		width: 690rpx;
		margin: 40rpx auto;
		height: 300rpx;
		position: relative; /* 使得相对定位生效 */
		overflow: hidden; /* 隐藏溢出的部分，如果需要的话 */
		// background: skyblue;
		border-radius: 20rpx;
		box-shadow: 0 10px 10px rgba(0,0,0,0.1);
		background: white;
		// display: flex;
		// justify-content: center;
		// align-items: center;
		flex-direction: column;
		.time{
			width: 690rpx;
			height: 100rpx;
			padding-top: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			// background: white;
		}
		.time-detail{
			width: 690rpx;
			height: 150rpx;
			// background: white;
			display: flex;
			justify-content: center;
			// align-items: center;
			flex-direction: column;
			gap: 20rpx;
			.morning{
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: row;
				.text{
					width: 500rpx;
				}
			}
			.afternoon{
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: row;
				.text{
					width: 500rpx;
				}
			}
		}
	}
	.patient{
		z-index: 1;
		width: 690rpx;
		margin: 40rpx auto;
		height: 350rpx;
		position: relative; /* 使得相对定位生效 */
		overflow: hidden; /* 隐藏溢出的部分，如果需要的话 */
		// background: skyblue;
		border-radius: 20rpx;
		box-shadow: 0 10px 10px rgba(0,0,0,0.1);
		background: white;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.title{
			height: 100rpx;
			width: 690rpx;
			padding-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: row;
			.text{
				width: 450rpx;
			}
		}
		.logo{
			height: 100rpx;
			width: 100rpx;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				border-radius: 50%;
				height: 100%;
				width: 100%;
			}
			// background: white;
		}
		.name{
			height: 50rpx;
			padding-top: 25rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			// background: white;
		}
		.id{
			height: 100rpx;
			padding-top: 0rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			// background: white;
		}
	}
	.infoPopup{
		background: #fff;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;
		padding-bottom: 100rpx;
		.title{
			font-size: 30rpx;
			text-align: center;
			margin-bottom: 30rpx;
		}
		.grid{
			display: grid;
			grid-template-columns: repeat(2,1fr);
			column-gap: 20rpx;
			row-gap: 20rpx;
			.tabs{
				background: #f5f5f5;
				border-radius: 20rpx;
				padding: 20rpx;
				text-align: center;
			}
		}
	}
}    
</style>
