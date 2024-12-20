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

		<!-- <view class="recommend">
			<view class="topTitle">
				<view class="text">热门搜索</view>
			</view>
			<view class="tabs">
				<view class="tab" v-for="tab in recommendList" :key="tab" @click="clickTab(tab)">{{tab}}</view>
			</view>
		</view> -->



		<view class="noSearch" v-if="classList.length===0">
			<uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png"></uv-empty>
		</view>

<!-- 		<view class="doctor" v-for="(item,index) in classList">
			2
		</view> -->
		<view class="list">
			<view class="doctor" v-for="(item,index) in classList">
				
				<view class="up-content">
					<view class="box2">
						<view class="image">
							<view class="circle" :style="{ background: getGradient('#2f8afb') }">
								{{item.name}}
							</view>
						</view>
						<view class="row">
							<view class="text1">{{item.name}}</view>
							<view class="smallText">{{item.title}}</view>
							<view class="text">
								<scroll-view :show-scrollbar="false" scroll-y="true" class="text-true">
									<view class="text2">
									{{item.intro}}
									</view>
							
								</scroll-view>
							</view>
						</view>
					</view>
				</view>
				<view class="bar"></view>
				<view class="down-content">
					<scroll-view :show-scrollbar="false" scroll-x="true" class="downFixedDay">
						<view class="downFixDay" v-for="it in item.schedule" @click="navToDetail(item.doctorId,it.date,item)">
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
		ref,
		onMounted
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
	import {
		getByDoctorIdAndDate
	} from '@/api/schedule.js'
	import {
		formatDateToChinese
	} from '@/utils/date.js'
import { hi } from "date-fns/locale";

	//查询参数
	const queryParams = ref({
		pageNum: 1,
		pageSize: 12,
		keyword: ""
	})

	// //搜索历史词
	// const historySearch = ref(['中医', '骨', '皮肤', '张三']);

	// //热门搜索词
	// const recommendList = ref(["陶勇", "发热", "老年", "人瑞"]);

	//没有更多
	const noData = ref(false);
	//没有搜索结果
	const noSearch = ref(false);

	//搜索结果列表
	const classList = ref([]);

	const searchValue = ref("")

	//搜索栏切换
	const infoPopup = ref(null)
	const typeSelect = ref("请选择")
	const titlehash = {
		'1': '医士',
		'2': '医师',
		'3': '主治医师',
		'4': '副主任医师',
		'5': '主任医师',
		'6': '专家'
	}
	
	const content = ref( `噫吁嚱，危乎高哉！
	  蜀道之难，难于上青天！
	  蚕丛及鱼凫，开国何茫然！
	  尔来四万八千岁，不与秦塞通人烟。
	  西当太白有鸟道，可以横绝峨眉巅。
	  地崩山摧壮士死，然后天梯石栈相钩连。
	  上有六龙回日之高标，下有冲波逆折之回川。
	  黄鹤之飞尚不得过，猿猱欲度愁攀援。
	  青泥何盘盘，百步九折萦岩峦。
	  扪参历井仰胁息，以手抚膺坐长叹。
	
	  问君西游何时还？畏途巉岩不可攀。
	  但见悲鸟号古木，雄飞雌从绕林间。
	  又闻子规啼夜月，愁空山。
	  蜀道之难，难于上青天，使人听此凋朱颜！
	  连峰去天不盈尺，枯松倒挂倚绝壁。
	  飞湍瀑流争喧豗，砯崖转石万壑雷。
	  其险也如此，嗟尔远道之人胡为乎来哉！(也如此 一作：也若此)
	
	  剑阁峥嵘而崔嵬，一夫当关，万夫莫开。
	  所守或匪亲，化为狼与豺。
	  朝避猛虎，夕避长蛇，磨牙吮血，杀人如麻。
	  锦城虽云乐，不如早还家。
	  蜀道之难，难于上青天，侧身西望长咨嗟！`)
	
	
	
	//搜索历史词
	const historySearch = ref(uni.getStorageSync("historySearch")|| []);
	
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
	
	const navToDetail = (id,date,doctor) => {
		// console.log(id)
		// console.log(date)
		//console.log(doctor)
		uni.navigateTo({
			url: `/pages/doctor-details/doctor-details?id=${id}&date=${date}`
		})
	}
	
	// const onOnSearch = () => {
	// 	// uni.showLoading({
	// 	// 	title:"加载中"
	// 	// })
	// 	historySearch.value = [...new Set([queryParams.value.keyword,...historySearch.value])].slice(0,10)
	// 	uni.setStorageSync("historySearch",historySearch.value);
	// 	initParams(queryParams.value.keyword);
	// 	searchData();
	// 	console.log(queryParams.value.keyword);
	// }
	
	//点击搜索
	const onSearch = async (value) => {
		
		// uni.showLoading({
		// 	title:"加载中"
		// })
		
		// 首先尝试从本地存储中获取现有的搜索历史数组
		let historySearchArray = uni.getStorageSync('historySearch') || [];
		console.log(historySearchArray)
		
		// 现在将新的搜索关键词添加到数组中
		historySearchArray.push(value);
		
		// 最后，将更新后的数组存回本地存储
		// console.log(historySearchArray);
		uni.setStorageSync('historySearch', historySearchArray);
		// initParams(queryParams.value.keyword);
		// console.log(queryParams.value.keyword);
		historySearchArray= [...new Set([value,...historySearchArray])].slice(0,10)
		historySearch.value = historySearchArray
		let res;
		if (typeSelect.value == "按医生") {
			res = await getDoctorInfoByName({
				name: value
			});
		} else if (typeSelect.value == "按疾病") {
			res = await getDoctorInfoByIntroduction({
				introduction: value
			});
		}
		
		console.log(res)
		let doctorHash = {}
		res = res.data
		
		console.log(res)
		let now = new Date()
		for (let i = 0; i < res.length; i++) {
			let z = new Date(res[i].date)
			//如果月和日与今天相同，则忽略
			if (now.getDate() == z.getDate() && now.getMonth() == z.getMonth()) continue
			let part = formatDateToChinese(z)
			if (doctorHash.hasOwnProperty(res[i].doctorId)) {
				if (doctorHash[res[i].doctorId].schedule.hasOwnProperty(part.date)) {
					doctorHash[res[i].doctorId].schedule[part.date].registration.push({
						time: res[i].time,
						remain: res[i].availableNumber,
						scheduleId: res[i].scheduleId
					})
				} else {
					doctorHash[res[i].doctorId].schedule[part.date] = {
						date: part.date,
						week: part.week,
						registration: [{
							time: res[i].time,
							remain: res[i].availableNumber,
							scheduleId: res[i].scheduleId
						}]
					}
				}
			} else {
				let doctor = {}
				doctor.doctorId = res[i].doctorId
				doctor.name = res[i].doctorName
				doctor.img =  res[i].photoUrl
				doctor.title = titlehash[res[i].titleId]
				doctor.intro=res[i].introduction
				doctor.schedule = {}
				doctor.schedule[part.date] = {
					date: part.date,
					week: part.week,
					registration: [{
						time: res[i].time,
						remain: res[i].availableNumber,
						scheduleId: res[i].scheduleId
					}]
				}
				doctorHash[res[i].doctorId] = doctor
			}
			
		}
		console.log(doctorHash)
		classList.value = []
		for (let key in doctorHash) {
			//先清空classList.value
			// classList.value = []
			classList.value.push(doctorHash[key])
		}
		console.log("你好")
		// console.log(classList.value[0])
	}

	//点击清除按钮
	const onClear = () => {
		initParams()
	}

	const goback = () => {
		uni.navigateTo({
			url: '/pages/index/index'
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
					uni.removeStorageSync("historySearch")
					historySearch.value=[]
				}
			}
		})
	}

	const initParams = (value='')=>{
		classList.value=[];
		noData.value=false;
		noSearch.value=false;
		queryParams.value = {
			pageNum:1,
			pageSize:12,
			keyword:value||""
		}
	}

	//触底加载更多
	onReachBottom(() => {

	})

	//关闭有页面
	onUnload(() => {

	})
	
	onMounted(()=>{
		historySearch.value = uni.getStorageSync("historySearch")||[];
		historySearch.value= [...new Set(historySearch.value)].slice(0,10)
		// console.log(uni.getStorageSync("historySearch"));
	})
	
	const getGradient = (baseColor) => {
	  return `linear-gradient(135deg, ${baseColor} 0%, ${lightenColor(baseColor)} 50%, ${baseColor} 100%)`;
	};
	
	// 加亮颜色函数
	const lightenColor = (color) => {
	  // 将颜色转换为 RGB 格式
	  const [r, g, b] = hexToRgb(color);
	  // 加亮颜色
	  const lighterR = Math.min(r + 50, 255);
	  const lighterG = Math.min(g + 50, 255);
	  const lighterB = Math.min(b + 50, 255);
	  // 返回加亮后的颜色
	  return `rgb(${lighterR}, ${lighterG}, ${lighterB})`;
	};
	
	// 将十六进制颜色转换为 RGB 格式
	const hexToRgb = (hex) => {
	  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	  return result ? [
	    parseInt(result[1], 16),
	    parseInt(result[2], 16),
	    parseInt(result[3], 16)
	  ] : null;
	};
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
				.u-input {
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
			// display: grid;
			// grid-template-columns: repeat(3, 1fr);
			// gap: 5rpx;
			padding: 20rpx 0rpx;

			.doctor {
				height: 400rpx;
				width: 690rpx;
				border-radius: 30rpx;
				box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
				margin: 20rpx 30rpx;
				background-color: white;

				// background: red;
				.up-content {
					height: 250rpx;
					// background: skyblue;
					border-radius: 30rpx 30rpx 0 0;

					.box2 {
						display: flex;
						flex-direction: row;

						.image {
							margin: 20rpx;
							width: 210rpx;
							box-sizing: border-box;
							height: 210rpx;

							.circle{
								width: 210rpx;
								height: 210rpx;
								border-radius: 50%;
								display: flex;
								justify-content: center;
								align-items: center;
								font-size: 35rpx;
								color: white
							}
						}

						.row {
							width: 440rpx;
							height: 200rpx;
							margin: 25rpx;
							display: flex;
							flex-direction: column;
							// justify-content: center;
							// align-items: center;
							font-size: 18px;
							// background: red;
							color: #333;

							.text1 {
								// padding:0rpx;
							}

							.smallText {
								// padding-right:0 5px;
								// margin-bottom: 180rpx;
								font-size: 25rpx;
							}
							.text{
								// padding: 20rpx;
								font-size: 30rpx;
								height: 100%;
								width: 100%;
								color: #333;
								display: flex;
								flex-direction: column;
								opacity: 1;
								.text-true {
									display: flex;
								    flex-direction: column; /* 垂直方向排列 */
								    max-width: 440rpx; /* 适应容器的宽度 */
								    max-height: 100rpx; /* 设置最大高度 */
								    // padding: 40rpx;
								    overflow-y: auto; /* 启用垂直滚动 */
								    scroll-behavior: smooth;
								    -webkit-overflow-scrolling: touch;
									z-index: 10;
									padding-top: 20rpx;
									.text2{
										text-indent: 2em;
										display: 'block';
										font-size: 20rpx;
										line-height: 30rpx;
										color: #000;
										font-weight: bold;
										font-family: '仿宋';
									}
									.image2{
										display: flex;
										justify-content: center;
										margin: 20rpx 0;
										
										image{
											opacity: 1;
											width: 100%;
											height: 500rpx;
										}
									}
								}
								image{
									//在文字正下方，重叠
									position: absolute;
									margin: 275rpx 0;
									width: 650rpx;
									height: 650rpx;
									opacity: 0.32;
									
									
								}
							}
						}
					}
				}

				.bar {
					height: 5rpx;
					background: #e8e8e4;
				}

				.down-content {
					height: 145rpx;
					// background: pink;
					border-radius: 0 0 30rpx 30rpx;

					.downFixedDay {
						display: flex;
						flex-direction: row;
						max-width: 670rpx;
						height: 145rpx;
						padding: 10rpx;
						white-space: nowrap;
						scroll-behavior: smooth;
						-webkit-overflow-scrolling: touch;

						.downFixDay {
							width: 125rpx;
							height: 125rpx;
							margin: 0 5rpx 0 5rpx;
							// background-color: red;
							border-radius: 20rpx;
							box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
							display: inline-block;

							.box {
								display: flex;
								align-items: center;
								justify-content: center;
								width: 100%;
								height: 100%;
								flex-direction: column;

								.t1 {
									display: flex;
									justify-content: center;
									align-items: center;
									font-size: 30rpx;
									color: #333;
								}

								.t2 {
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