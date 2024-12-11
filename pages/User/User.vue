<template>
	<view class="userLayout pageBg">
		<view class="userInfo">
			<view class="avatar">
				<image src="../../common/image/1726211145961.jpg" mode="aspectFill"></image>
			</view>
			<view class="ip">100.100.100.100</view>
			<view class="address">来自于：中南大学</view>
		</view>
		
		
		
		
		<view class="section">
			<view class="list">
				<view class="row" @click="navToA">
					<view class="left">
						<uni-icons type="calendar-filled" size="20" ></uni-icons>
						<view class="text">我的挂号记录</view>
					</view>
					<view class="right">
						<view class="text">{{recordNum}}</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				
				<view class="row" @click="navToB">
					<view class="left">
						<uni-icons type="star-filled" size="20"></uni-icons>
						<view class="text">我的评分</view>
					</view>
					<view class="right">
						<view class="text">33</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				
				<view class="row">
					<view class="left">
						<uni-icons type="chatboxes-filled" size="20"></uni-icons>
						<view class="text">联系客服</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
					<!-- #ifdef MP -->
					<button open-type="contact">联系客服</button>
					<!-- #endif -->
					<!-- #ifndef MP -->
					<button @click="clickContact">拨打电话</button>
					<!-- #endif -->				
					
					
				</view>
			</view>
		</view>
		
		<view class="section">
			<view class="list">
				<view class="row">
					<view class="left">
						<uni-icons type="notification-filled" size="20"></uni-icons>
						<view class="text">订阅更新</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				
				<view class="row">
					<view class="left">
						<uni-icons type="flag-filled" size="20"></uni-icons>
						<view class="text">常见问题</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				
				<view class="row" @click="loginOut">
					<view class="left">
						<uni-icons type="minus-filled" size="20"></uni-icons>
						<view class="text">退出登录</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<myTabBar :item="itemTab"></myTabBar>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { loginout } from '@/api/users.js'
import store from '../../store';

const itemTab=ref({myTabbar:2})
const recordNum=ref(33)


async function userLoginOut(){
	const res = await loginout()
	if(res.code===0){
		store.commit('removeUser');
		store.commit('removeToken');
		uni.showToast({
			title: '退出成功',
			icon: 'success',
			duration: 1000
		})
		uni.reLaunch({
			url:"/pages/login/login"
		})
	}
}

const navToA = ()=>{
	uni.navigateTo({
		url:"/pages/reg-record/reg-record"
	})
}

const navToB = ()=>{
	uni.navigateTo({
		url:"/pages/catalogs/catalogs"
	})
}

const clickContact = ()=>{
	uni.makePhoneCall({
		phoneNumber:"114"
	})
}

const loginOut = ()=>{
	uni.showModal({
		title:"提示",
		content:"是否退出登录",
		success(res){
			if(res.confirm){
				userLoginOut();
			}
		}
	})
}

</script>

<style lang="scss" scoped>
.userLayout{
	.userInfo{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;		
		padding:50rpx 0;
		.avatar{
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.ip{
			font-size: 44rpx;
			color:#333;
			padding:20rpx 0 5rpx;
		}
		.address{
			font-size: 28rpx;
			color:#aaa;
		}
	}
	
	.section{
		width: 690rpx;
		margin:50rpx auto;
		border:1px solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0,0,0,0.05);
		.list{
			.row{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding:0 30rpx;
				height: 100rpx;
				border-bottom: 1px solid #eee;
				position: relative;
				background: #fff;
				&:last-child{border-bottom:0}
				.left{
					display: flex;
					align-items: center;
					:deep(){
						.uni-icons{
							color:$brand-theme-color !important;
						}
					}
					.text{
						padding-left: 20rpx;
						color:#666
					}
				}
				.right{
					display: flex;
					align-items: center;
					.text{
						font-size: 28rpx;
						color:#aaa;
						
					}
				}
				button{
					position: absolute;
					top:0;
					left:0;
					height: 100rpx;
					width:100%;
					opacity: 0;
				}
			}
		}
	}
}
</style>
