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
				<up-input placeholder="请输入" v-model="searchValue" :disabled="typeSelect==='请选择'" clearable="true">

					<template #prefix>
						<uni-icons @click="onSearch(searchValue)" type="search" size="22"></uni-icons>
					</template>

				</up-input>
				<!-- <uni-search-bar @confirm="onSearch" @cancel="onClear" @clear="onClear" focus placeholder="搜索"
					v-model="queryParams.keyword">
				</uni-search-bar> -->
			</view>
			<view class="back" @click="goback">
				<up-icon name="arrow-up-fill" color="#000" size="28"></up-icon>
			</view>
		</view>


		
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
		


		<view class="noSearch" v-if="classList.length===0">
			<uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></uv-empty>
		</view>


		
			<view class="list">
				<view class="doctor" v-for="(item,index) in classList">
					<view class="up-content">
						<view class="box2">
							<view class="image">
								<image :src="item.avatar" mode="aspectFill"></image>
							</view>
							<view class="row">
								<view class="text">{{item.name}}</view>
								<view class="smallText">{{item.title}}</view>
							</view>
						</view>
					</view>
					<view class="bar"></view>
					<view class="down-content">
						<scroll-view :show-scrollbar="false" scroll-x="true" class="downFixedDay">
							<view class="downFixDay" v-for="it in item.schedule" navToDetail(item.doctorId,it.date,item)>
								<view class="box">
									<text class="t1">{{it.week}}</text>
									<text class="t2">{{it.date}}</text>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<!-- <view v-if="noData || classList.length"><uni-load-more :status="noData?'noMore':'loading'" /></view> -->
		

		<uni-popup ref="infoPopup" type="bottom">
			<view class="infoPopup">
				<view class="title">
					请选择
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
	import {
		ref
	} from "vue";
	import {
		onLoad,
		onUnload,
		onReachBottom
	} from "@dcloudio/uni-app";
	import {
		getDoctorInfoByName,
		getDoctorInfoByIntroduction
	} from "@/api/doctor.js";

	//查询参数
	const queryParams = ref({
		pageNum: 1,
		pageSize: 12,
		keyword: ""
	})

	//搜索历史词
	const historySearch = ref(['中医', '骨', '皮肤', '张三']);

	//热门搜索词
	const recommendList = ref(["陶勇", "发热", "老年", "人瑞"]);

	//没有更多
	const noData = ref(false);
	//没有搜索结果
	const noSearch = ref(false);

	//搜索结果列表
	const classList = ref([
		// {_id:123123,smallPicurl:'https://mp-0cb878b7-99ec-44ea-8246-12b123304b05.cdn.bspapp.com/xxmBizhi/20231102/1698905562410_0_small.webp'}
	]);

	const searchValue = ref("")
	
	//搜索栏切换
	const infoPopup = ref(null)
	const typeSelect = ref("请选择")
	const timeSelect = () => {
		infoPopup.value.open();
	}

	//点击类别
	const switchToD = () => {
		typeSelect.value = "按医生";
		infoPopup.value.close();
	}
	const switchToI = () => {
		typeSelect.value = "按疾病";
		infoPopup.value.close();
	}

	//点击搜索
	const onSearch = async (value) => {
		let res;
		if(typeSelect.value=="按医生"){
			res = await getDoctorInfoByName({name:value});
		}
		else if(typeSelect.value=="按疾病"){
			res = await getDoctorInfoByIntroduction({introduction:value});
		}
		console.log(res)
	}

	//点击清除按钮
	const onClear = () => {

	}

	const goback = ()=>{
		uni.navigateTo({
			url:'/pages/index/index'
		})
	}

	//点击标签进行搜索
	const clickTab = (value) => {
		onSearch(value)
	}


	//点击清空搜索记录
	const removeHistory = () => {
		uni.showModal({
			title: "是否清空历史搜索？",
			success: res => {
				if (res.confirm) {
					console.log("确认删除");
				}
			}
		})
	}

	//触底加载更多
	onReachBottom(() => {

	})

	//关闭有页面
	onUnload(() => {

	})
</script>

<style lang="scss" scoped>
	.searchLayout {
		padding-top: 50rpx;
		.searchBar {
			padding: 0 30rpx;
			display: flex;
			flex-direction: row;
			height: 100rpx;
			// background: pink;
			justify-content: center;
			align-items: center;
			
			.downBox {
				background-color: white;
				// padding-top: 10rpx;
				height: 60%;
				width: 25%;
				// background: #F4F4F4;
				border-radius: 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.text {
					font-size: 28rpx;
					color: #666;
					text-align: center;
					display: flex;
					flex-direction: row;
					// line-height: 100rpx;
				}
			}

			.search {
				width: 75%;
				padding: 0 10rpx;
				// background: #fff;
				.u-input{
					background: #fff;
				}
			}
		}

		.topTitle {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			color: #999;
		}

		.history {
			padding: 30rpx;
		}

		.recommend {
			padding: 30rpx;
		}

		.tabs {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding-top: 20rpx;

			.tab {
				background: #F4F4F4;
				font-size: 28rpx;
				color: #333;
				padding: 10rpx 28rpx;
				border-radius: 50rpx;
				margin-right: 20rpx;
				margin-top: 20rpx;
			}
		}

		.list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 5rpx;
			padding: 20rpx 0rpx;

			.doctor{
				height: 400rpx;
				width: 690rpx;
				border-radius: 30rpx;
				box-shadow: 0 10px 10px rgba(0,0,0,0.1);
				margin: 20rpx 30rpx;
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

		.infoPopup {
			background: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			overflow: hidden;
			padding-bottom: 100rpx;

			.title {
				font-size: 30rpx;
				text-align: center;
				margin-bottom: 30rpx;
			}

			.grid {
				display: flex;
				flex-direction: column;

				// grid-template-columns: repeat(2,1fr);
				// column-gap: 20rpx;
				// row-gap: 20rpx;
				.tab1 {
					background: #f5f5f5;
					border-radius: 20rpx;
					padding: 20rpx;
					text-align: center;
					margin: 20rpx 0;
				}

				.tab2 {
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