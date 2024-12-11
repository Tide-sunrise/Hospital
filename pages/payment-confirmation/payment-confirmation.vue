<template>
	<view class="paymentInfoLayout pageBg2">
		<view class="title">
			支付信息确认
		</view>
		<view class="box">
			<view class="info-item">
				<label>订单生成时间:</label>
				<span>{{ orderTime }}</span>
			</view>
			<view class="info-item">
				<label>医生姓名:</label>
				<span>{{ doctorName }}</span>
			</view>
			<view class="info-item">
				<label>科室:</label>
				<span>{{ department }}</span>
			</view>
			<view class="info-item">
				<label>金额:</label>
				<span>{{ amount }} 元</span>
			</view>
			<view class="info-item">
				<label>患者姓名:</label>
				<span>{{ patientName }}</span>
			</view>
		</view>
		<view class="button">
			<up-button :disabled="isPaid" @click="handlePayment" color="rgb(66, 83, 216)" shape="circle">确认支付</up-button>
		</view>
		<view class="button">
			<up-button @click="abandonPayment" color="rgb(66, 83, 216)" shape="circle">{{!isPaid?'放弃挂号':'返回首页'}}</up-button>
		</view>
	</view>
	
	<uni-popup ref="infoPopup" type="bottom">
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
							<view class="detail2">
								微信支付
							</view>
						</view>
					</view>
				</view>
			</view>
	</uni-popup>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 假定的数据，实际应用中应该从后端获取
const orderTime = ref('2024-12-11 13:36'); // 挂号订单生成的时间
const doctorName = ref('张三'); // 医生姓名
const department = ref('内科'); // 科室名称
const amount = ref(50); // 金额
const patientName = ref('李四'); // 患者姓名

const isPaid=ref(false)
const infoPopup =ref(null)
const isSuccess=ref(false)
const regId=-1;

onLoad((options)=>{
	regId.value = parseInt(options.regId, 10);
})

onMounted(()=>{
	//5个变量先通过regId.value获取数据
})

const handlePayment=()=>{
	//将数据库订单状态切为已支付，并将其传回isPaid
	isPaid.value=true
	isSuccess.value=isPaid.value
	infoPopup.value.open();
}

const abandonPayment =()=>{
	uni.navigateTo({
		url:'/pages/index/index'
	})
}

</script>

<style lang="scss" scoped>
.paymentInfoLayout {
	display: flex;
	flex-direction: column;
	padding: 20px;
	// background-color: #f9f9f9;
	border-radius: 8px;
	
	.title {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 20px;
		text-align: center;
	}
	.box{
		width: 690rpx;
		// height: 200rpx;
		border-radius: 30rpx;
		box-shadow: 0 10px 10px rgba(0,0,0,0.1);
		margin: 30rpx auto;
		background: #fff;
		.info-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			margin: 30rpx 30rpx ;
			label {
				font-weight: bold;
			}
		
			span {
				font-size: 16px;
			}
		}
	}
	.button{
		margin: 30rpx 0;
	}
}

.paymentLayout{
	background: #fff;
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
			margin-bottom: 50rpx;
			.time{
				display: flex;
				justify-content: space-between;
				width: 100%;
				margin: 30rpx 0;
				.words{
					height: 50rpx;
					font-size: 30rpx;
					color: #666;
				}
				.numbers{
					height: 50rpx;
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
					height: 50rpx;
					font-size: 30rpx;
					color: #666;
					width: 540rpx;
					display: flex;
					// justify-content: center;
					align-items: center;
				}
			
				.detail2 {
					display: flex;
					// justify-content: center;
					  /* 假设父级需要有一个明确的宽度 */
					//垂直居中
					// align-items: center;
					height: 50rpx;  
					width: 120rpx;
					// background: red;
					font-size: 30rpx;
					color: #333;
					position: absolute;
					right: 30rpx;
					
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