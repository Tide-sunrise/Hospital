<template>
	<view class="paymentLayout">
		<view class="layout">
			<view v-if="isSuccess" class="icon">
				<image src="../../common/image/zhifu-zhifuchenggong.svg" mode="aspectFill"></image>
			</view>
			<view v-else class="icon">
				<image src="../../common/image/zhifu-zhifushibai.svg" mode="aspectFill"></image>
			</view>
			<view class="success-text">
				付款{{isSuccess?"成功":"失败"}}
			</view>
			<view v-if="isSuccess" class="money">
				￥1145.14
			</view>
			<view class="detail">
				<view class="time">
					<view class="words">付款时间</view>
					<view class="numbers">
						<uni-dateformat :date="Date.now()" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
					</view>
				</view>
				<view class="method">
					<view class="words">付款方式</view>
					<view class="detail">
						<text>微信支付</text>
					</view>
				</view>
			</view>
			<view class="buttons">
				<view class="watch">
					<wd-button block type="success">订单详情</wd-button>
				</view>
				<view class="back">
					<wd-button block type="info" @click="navBack">返回上一页</wd-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
const isSuccess = ref(false);
	
const navBack = () => {
	uni.navigateBack({
		
	})
}
</script>

<style lang="scss" scoped>
.paymentLayout{
	.layout{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 30rpx;
		.icon{
			margin-top: 100rpx;
			width: 200rpx;
			height: 200rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.success-text{
			font-size: 60rpx;
			color: #333;
			margin-top: 30rpx;
		}
		.money{
			font-size: 80rpx;
			color: #333;
			margin-top: 30rpx;
			// margin-bottom: 30rpx;
		}
		.detail{
			margin-top: 30rpx;
			display: flex;
			// background: red;
			flex-direction: column;
			// align-items: center;
			width: 690rpx;
			margin: 0 auto;
			.time{
				display: flex;
				justify-content: space-between;
				width: 100%;
				margin: 30rpx 0;
				.words{
					
					font-size: 30rpx;
					color: #666;
				}
				.numbers{
					font-size: 30rpx;
					color: #333;
					// padding-left: 20rpx;
				}
			}
			.method {
				display: flex;
				justify-content: space-between;
				width: 100%;
				.words {
					font-size: 30rpx;
					color: #666;
					width: 200rpx;
				}
			
				.detail {
					display: flex;
					justify-content: flex-end;
					  /* 假设父级需要有一个明确的宽度 */
					width: 300px;
					// background: red;
					text{
						font-size: 30rpx;
						color: #333;
						position: absolute;
						right: 30rpx;
					}
					
					// margin-left: auto; // 推到最右边
					
				}
			}
		}
		.buttons{
			display: flex;
			flex-direction: column;
			width: 100%;
			margin-top: 100rpx;
			.watch{
				margin-bottom: 20rpx;
			}
			.back{
				margin-bottom: 20rpx;
			}
		}
	}
}
</style>
