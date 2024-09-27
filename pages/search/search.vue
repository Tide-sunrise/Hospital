<template>
	<view class="searchLayout pageBg">
		<view class="searchBar">
			<view class="downBox" @click="timeSelect">
				<view class="text">
					{{typeSelect}}
					<uni-icons type="down" size="20"></uni-icons>
				</view>
			</view>
			<view class="search">
				<uni-search-bar 
				@confirm="onSearch"
				@cancel="onClear"
				@clear="onClear"
				focus 
				placeholder="搜索"
				v-model="queryParams.keyword">
				</uni-search-bar>
			</view>
			
		</view>

		
		<view>
			<view class="history">
				<view class="topTitle">
					<view class="text">最近搜索</view>
					<view class="icon" @click="removeHistory">
						<uni-icons type="trash" size="25"></uni-icons>
					</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in historySearch" :key="tab" @click="clickTab(tab)">{{tab}}</view>		
				</view>
			</view>
			
			<view class="recommend">
				<view class="topTitle">
					<view class="text">热门搜索</view>				
				</view>
				<view class="tabs">				
					<view class="tab" v-for="tab in recommendList" :key="tab" @click="clickTab(tab)">{{tab}}</view>
				</view>
			</view>
		</view>
		
		
		<view class="noSearch">
			<uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></uv-empty>
		</view>
		
		
		<view>
			<view class="list">
				<navigator :url="`/pages/preview/preview`"  class="item" 
				v-for="item in classList" :key="item._id">				
					<image :src="item.smallPicurl" mode="aspectFill"></image>				
				</navigator>
			</view>		
			<view v-if="noData || classList.length"><uni-load-more :status="noData?'noMore':'loading'"/></view>
		</view>
		
		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="title">
					请选择类别
				</view>
				<view class="grid">
					<view class="tab1" @click="switchToD">
						<text>按医生</text>
					</view>
					<view class="tab2" @click="switchToI">
						<text>按疾病</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import {ref} from "vue";
import {onLoad,onUnload,onReachBottom} from "@dcloudio/uni-app";

//查询参数
const queryParams = ref({	
	pageNum:1,
	pageSize:12,
	keyword:""
})

//搜索历史词
const historySearch = ref(['搜索词1','搜索词2','搜索词3','搜索词4']);

//热门搜索词
const recommendList = ref(["美女","帅哥","宠物","卡通"]);

//没有更多
const noData = ref(false);
//没有搜索结果
const noSearch = ref(false);

//搜索结果列表
const classList = ref([
	// {_id:123123,smallPicurl:'https://mp-0cb878b7-99ec-44ea-8246-12b123304b05.cdn.bspapp.com/xxmBizhi/20231102/1698905562410_0_small.webp'}
]);


//搜索栏切换
const infoPopup =ref(null)
const typeSelect = ref("请选择")
const timeSelect = () => {
	infoPopup.value.open();
}

//点击类别
const switchToD = ()=>{
	typeSelect.value = "按医生";
	infoPopup.value.close();
}
const switchToI = ()=>{
	typeSelect.value = "按疾病";
	infoPopup.value.close();
}

//点击搜索
const onSearch = ()=>{
	
}

//点击清除按钮
const onClear = ()=>{
	
}



//点击标签进行搜索
const clickTab = (value)=>{
	
}


//点击清空搜索记录
const removeHistory = ()=>{
	uni.showModal({
		title:"是否清空历史搜索？",
		success:res=>{
			if(res.confirm){
				console.log("确认删除");			
			}
		}
	})
}

//触底加载更多
onReachBottom(()=>{
	
})

//关闭有页面
onUnload(()=>{
	
})


</script>

<style lang="scss" scoped>
.searchLayout{
	.searchBar{
		padding: 0 30rpx;
		display: flex;
		flex-direction: row;
		height: 100rpx;
		// background: pink;
		justify-content: center;
		align-items: center;
		.downBox{
			background-color: white;
			// padding-top: 10rpx;
			height: 60%;
			width: 25%;
			// background: #F4F4F4;
			border-radius: 50rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.text{
				font-size: 28rpx;
				color:#666;
				text-align: center;
				display: flex;
				flex-direction: row;
				// line-height: 100rpx;
			}
		}
		.search{
			width: 75%;
			padding:0 10rpx;
		}	
	}

	.topTitle{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		color:#999;
	}
	.history{
		padding:30rpx;		
	}
	.recommend{
		padding:30rpx;
	}
	.tabs{
		display: flex;		
		align-items: center;
		flex-wrap: wrap;
		padding-top:20rpx;
		.tab{
			background: #F4F4F4;
			font-size: 28rpx;
			color:#333;
			padding:10rpx 28rpx;
			border-radius: 50rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;
		}
	}	
	.list{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 5rpx;
		padding:20rpx 5rpx;		
		.item{
			height: 440rpx;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}			
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
			display: flex;
			flex-direction: column;
			// grid-template-columns: repeat(2,1fr);
			// column-gap: 20rpx;
			// row-gap: 20rpx;
			.tab1{
				background: #f5f5f5;
				border-radius: 20rpx;
				padding: 20rpx;
				text-align: center;
				margin: 20rpx 0;
			}
			.tab2{
				background: #f5f5f5;
				border-radius: 20rpx;
				padding: 20rpx;
				text-align: center;
				margin-top: 20rpx;
			}
		}
	}
}
</style>
