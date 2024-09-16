<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<view class="banner">
			<view class="card-swiper">
			  <wd-swiper
			    autoplay
			    v-model:current="current"
			    custom-indicator-class="custom-indicator-class"
			    custom-image-class="custom-image"
			    custom-next-image-class="custom-image-prev"
			    custom-prev-image-class="custom-image-prev"
			    :indicator="{ type: 'dots' }"
			    :list="swiperList"
			    previousMargin="24px"
			    nextMargin="24px"
			  >
			  </wd-swiper>
			</view>
		</view>
		
		<view class="healthCard">
			这里放健康卡
		</view>
		
		<view class="bigBox">
			<view class="function">
				<small-icon v-for="item in myFunction" :item="item"></small-icon>
			</view>
		</view>
		
		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
				
			</view>
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<swiper-item v-for="item in noticeList" >
						<navigator :url="'/pages/notice/detail?id='+item._id">
							{{item}}
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">				
				<uni-icons type="right" size="20"></uni-icons>
			</view>
		</view>
		
		<view class="guide">
		    <y-tabs 
			:wrap-style="{ 'border-radius': '30rpx 30rpx 0 0' }"

			color="red" ref="tabs" v-model="activeIndex" barAnimateMode="worm">
		        <y-tab v-for="tab in Tabs" :title="tab.title" :key="tab.title" />
		    </y-tabs>
		    
		    <swiper class="swiper" :current="activeIndex" @transition="onTransition" @animationfinish="onAnimationfinish">
		        <swiper-item v-for="tab in Tabs" :key="tab.title">
		            <view class="swiper-item-view">
		                <small-icon v-for="item in 8"></small-icon>
		            </view>
		        </swiper-item>
		    </swiper>
		</view>
		
		<view class="news">
		 	<view class="title">
		 	    医院资讯
		 	</view>
			<view class="out">
				<view class="list" v-for="(item,index) in newsLists" :key="item.id">
					<view class="image">
						<image src="../../static/logo.png" mode="aspectFill"></image>
					</view>
					<view class="row">
						<view class="text">{{index+1}}.{{item.title}}</view>
						<view class="smallText">这是小字</view>
					</view>
				</view>	
				<view class="count">
					共{{newsLists.length}}条资讯
				</view>	
			</view>
		</view>
		
		<myTabBar :item="itemTab"></myTabBar>
		<view class="safe-area-inset-bottom"></view>
	</view>
	
</template>

<script setup>
import { ref, onMounted } from 'vue';

import {tabBarList} from '../../common/data/data.js'



//滚动
const current = ref(0)

const swiperList = ref([
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/moon.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg'
])



const noticeList = ref(['我草泥马','一得阁拉米','摩洛哥炒饼'])
const myFunction = ref([{name:"挂号",url:"/pages/registration/registration"},{name:"击败"},{name:"吧唧"}])
//底部导航栏使用
const itemTab=ref({myTabbar:0})

//滑动标签使用
const Tabs = ref([
	{title:"常用"},
	{title:"门诊"},
	{title:"住院"},
	{title:"其他"},
	{title:"动态"}
])
const activeIndex = ref(0)
const tabs = ref([])

//这是资讯用的
const newsLists = ref([
	{id:111,title:"这是资讯1"},
	{id:222,title:"这是资讯2"},
	{id:333,title:"这是资讯3"},
	{id:444,title:"这是资讯4"}
])


//导航栏


//滚动
function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}

//以下皆为标签栏
//swiper滑动中
const onTransition = (e) => {
    if (Tabs.value) {
        tabs.value.setDx(e.detail.dx);
    }
};
//swiper滑动结束
function onAnimationfinish(e) {
    activeIndex.value = e.detail.current;
    // 通过setTimeout解决解锁时机问题
    tabs.value.unlockDx()//通知y-tabs解除对setDx()的锁定
    console.log(activeIndex)
}
</script>

<style lang="scss" scoped>
	

.homeLayout{
	padding: 20rpx 0 0 0;
	.banner{
		width: 750rpx;
		padding: 30rpx 0;
		border-radius: 30rpx;
		margin:0 auto;
		// background: red;
		.card-swiper {
		  --wot-swiper-radius: 0;
		  --wot-swiper-item-padding: 0 24rpx;
		  --wot-swiper-nav-dot-color: #e7e7e7;
		  --wot-swiper-nav-dot-active-color: #4d80f0;
		  padding-bottom: 24rpx;
		  :deep(.custom-indicator-class) {
		    bottom: -16px;
		  }
		  :deep(.custom-image) {
		    border-radius: 12rpx;
		  }
		  :deep(.custom-image-prev) {
		    height: 168px !important;
		  }
		}
	}
	.healthCard{
		width: 690rpx;
		height: 200rpx;
		border-radius: 30rpx;
		box-shadow: 0 10px 10px rgba(0,0,0,0.1);
		margin: 20rpx auto;
	}
	.bigBox{
		height: 200rpx;
		width: 690rpx;
		border-radius: 30rpx;
		// background: skyblue;
		box-shadow: 0 10px 10px rgba(0,0,0,0.1);
		margin: 20rpx auto;
		.function{
			display: flex;
			align-items: center;
			justify-content: center;
			height: 200rpx;
			padding: 0 50rpx;
			display: grid;
			grid-template-columns: repeat(3,1fr);
			gap: 115rpx;
		}
	}
	.notice{
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #f9f9f9;
		margin: 40rpx auto;
		border-radius: 80rpx;
		display: flex;
		.left{
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			:deep(){//穿透子组件
				.uni-icons{
					color: $brand-theme-color   !important;
				}
			}
			.text{
				color: $brand-theme-color;
				font-weight: 600;
				font-size: 28rpx;
				
			}
		}
		.center{
			flex: 1;
			swiper{
				height: 100%;
				&-item{
					height: 100%;
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.right{
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.guide{
		width: 690rpx;
		height: 470rpx;
		// background: red;
		border-radius:30rpx;
		box-shadow: 0 10px 10px rgba(0,0,0,0.1);
		margin:0 auto;
		
		.tab{
			// border-radius:30rpx 30rpx 0 0;
			
		}
		
		.swiper {
		    height: 400rpx;
			border-radius:0 0 30rpx 30rpx;
			// background: red;
			
			.swiper-item-view {
			   height: 400rpx;
			   
			   text-align: center;
			   padding: 0rpx 40rpx;
			   display: grid;
			   grid-template-columns: repeat(4,1fr);
			   column-gap: 50rpx;
			   row-gap: 10rpx;
			}
		}


	}
	.news{
		.title{
		  font-size: 26px;
		  text-align: center;
		  color:#3c3c3c;
		  padding:60px 0 10px 0;
		}
		.out{
			width: 690rpx;
			margin:30px auto;
			box-shadow: 0px 10px 20px rgba(0,0,0,0.1);
			border-radius: 5px;
			padding:15rpx;
			box-sizing: border-box;
			.list{
				height: 200rpx;
				display: flex;
				flex-direction: row;
				.image{
					width: 160rpx;
					box-sizing: border-box;
					height: 160rpx;
					image{
						// padding:20rpx ;
						width: 160rpx;
						height: 160rpx;
						border-radius: 50%;
					}
				}
				.row{
					padding:20rpx 20rpx;
					border-bottom:1px solid #e8e8e8;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					font-size: 18px;
					color:#333;
					.text{
						padding:0 5px;
					}
					.smallText{
						padding-right:0 5px;
						margin-bottom: 180rpx;
						font-size: 25rpx;
					}
				}
			}
			.count{
				padding:10px 0;
				font-size: 15px;
				color:#888;
				text-align:center;
			}
		}
	}
}

</style>
