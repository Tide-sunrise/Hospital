<template>
  <view class="noticeLayout pageBg2">
	<myEmpty height="50rpx"></myEmpty>
	<view class="layout">
		<view class="navbar">
			<view class="goBack" @click="goBack">
				<uni-icons type="back" color="#000" size="20"></uni-icons>
			</view>
			<view class="text">
				公告
			</view>
			<view class="goBack">
				<!-- <uni-icons type="back" color="#fff" size="20"></uni-icons> -->
			</view>
		</view>
	</view>
	<view class="em">
		
	</view>
    <view class="title">
      <view class="tag">
        <uni-tag inverted :text="noticeList[pos].tagText" :type="noticeList[pos].tagType" />
      </view>
      <view class="font">{{ noticeList[pos].title }}</view>			
    </view>
    
    <view class="info">
      <view class="item">{{ noticeList[pos].infoItem1 }}</view>					
      <view class="item">
        <uni-dateformat :date="noticeList[pos].date" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
      </view>	
    </view>
    
    <view class="content">		
      {{ noticeList[pos].content }}					
    </view>
    
    <view class="count">
      阅读 {{ noticeList[pos].readCount }}	
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
onLoad((options)=>{
	pos.value=(parseInt(options.id,10)-1)
})

const pos=ref(0)

// 定义静态通知列表
const noticeList = ref([
  {
    _id: '1',
    tagText: '置顶',
    tagType: 'error',
    title: '欢迎使用我们的新应用',
    infoItem1: '把既定',
    date: Date.now(),
    content: '吧唧挂号是一款专为简化就医流程设计的智能挂号应用，旨在让您的医疗体验更加便捷、高效。无论您是初次就诊还是复诊，吧唧挂号都能为您提供一站式的医疗服务解决方案。',
    readCount: 5588
  },
  {
    _id: '2',
    tagText: '普通',
    tagType: 'default',
    title: '重要更新：版本1.0现已上线',
    infoItem1: '更新信息',
    date: new Date('2024-11-15T10:00:00'),
    content: 'app上线了而已，其实没啥。',
    readCount: 3421
  },
  {
    _id: '3',
    tagText: '活动',
    tagType: 'primary',
    title: '本周特别活动预告',
    infoItem1: '活动预告',
    date: new Date('2024-12-05T14:30:00'),
    content: '实际上是没有活动……',
    readCount: 7654
  },
  {
    _id: '4',
    tagText: '反馈',
    tagType: 'warning',
    title: '用户反馈收集进行中',
    infoItem1: '用户反馈',
    date: new Date('2024-12-01T09:15:00'),
    content: '记得给个五星好评哦！',
    readCount: 1234
  }
]);

const goBack = () => {
	uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.noticeLayout{
  padding:30rpx;
  .layout {
  	.navbar {
  		position: fixed;
  		top: 0;
  		left: 0;
  		width: 100%;
  		z-index: 10;
  		padding: 30rpx 0;
  		background:
  			linear-gradient(to bottom, transparent 0%, #fff 400rpx),
  			linear-gradient(to left, #beecd8 20%, #b2e0fa);
  		display: flex;
  		flex-direction: row; //设置布局方向为水平
  
  		.goBack {
  			width: 38rpx;
  			height: 38rpx;
  			// background: rgba(0, 0, 0, 0.5);
  			// left: 30rpx;
  			margin: 0 30rpx;
  			border-radius: 100px;
  			top: 0;
  			backdrop-filter: blur(10rpx);
  			border: 1rpx solid rgba(255, 255, 255, 0.3);
  			display: flex;
  			align-items: center;
  			justify-content: center;
  		}
  		.text{
  			width: 554rpx;
  		}
  	}
  }
  .em{
  	height: 98rpx;
  }
  .title{
    font-size: 40rpx;
    color:#111;
    line-height: 1.6em;
    padding-bottom:30rpx;
    display: flex;
    .tag{
      transform: scale(0.8);
      transform-origin: left center;
      flex-shrink: 0;	
    }
    .font{
      padding-left:6rpx;
    }
  }
  .info{
    display: flex;
    align-items: center;
    color:#999;
    font-size: 28rpx;
    .item{
      padding-right: 20rpx;
    }
  }
  .content{
    padding:50rpx 0;
  }
  .count{
    color:#999;
    font-size: 28rpx;
  }
}
</style>