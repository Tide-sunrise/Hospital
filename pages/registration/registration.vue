<template>
	<view class="registrationLayout pageBg">
		
		<view class="layout">
			<view class="navbar">
				<view class="goBack" @click="goBack">
					<uni-icons type="back" color="#000" size="20"></uni-icons>
				</view>
				<view class="text">
					科室选择
				</view>
				<view class="goBack">
					<!-- <uni-icons type="back" color="#fff" size="20"></uni-icons> -->
				</view>
			</view>
		</view>
		<view class="em">
			
		</view>
		<view class="pic">
			<image src="../../static/picture/guahao.jpg" mode="aspectFill"></image>
		</view>
		<view class="wraper">
		    <wd-sidebar v-model="active" @change="handleChange" style="width: 250rpx;">
		        <wd-sidebar-item style="width: 250rpx;"
		          v-for="(item, index) in categories"
		          :key="index"
		          :value="index"
		          :label="item.label"
		          :icon="item.icon"
		          :disabled="item.disabled"
		        />
		    </wd-sidebar>
		    <view class="content" :style="`transform: translateY(-${active * 100}%)`">
		        <scroll-view
		          v-for="(item, index) in categories"
		          :key="index"
		          class="category"
		          scroll-y
		          scroll-with-animation
		          :show-scrollbar="false"
		          :scroll-top="scrollTop"
		          :throttle="false">
					<wd-cell-group :title="item.title" border>
						<wd-cell v-for="(cell, index) in item.items" :key="index" :title="cell.title" :label="cell.label"
						is-link :to="`/pages/doctor/doctor?specializationId=${cell.id}`">
							<image src="../../static/zxj/CT.png" mode="aspectFit"></image>
						</wd-cell>
					</wd-cell-group>
		        </scroll-view>
		    </view>
		</view>
		
		<uni-popup ref="scorePopup" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view class="title">挂号前须知</view>
				</view>
				
				<view class="content">
					<precautions />
				</view>
				
				<view class="footer">
					<button @click="sure" type="default" size="mini" plain>我已同意并知晓</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted } from 'vue'
import { getAllDepartments } from '../../api/department'
import { getSpecializationByDepartmentId } from '../../api/specialization'
import axios from 'axios'
import { number } from '../../uni_modules/uview-plus/libs/function/test'
// import {onShow,onLoad} from "@dcloudio/uni-app"

const active = ref<number>(0)
const scrollTop = ref<number>(0)
const subCategories = ref([{title:String,label:String,id:Number}])
subCategories.value = new Array(24).fill({ title: '原神', label: '一款开放世界冒险游戏', id: 0 }, 0, 24)
const categories = ref([
  {
    label: '分类一',
    title: '标题一',
    icon: "none",
    items: subCategories,
    disabled: false
  },
  {
    label: '分类二',
    title: '标题二',
    icon: "none",
    items: subCategories,
    disabled: false
  },
  {
    label: '分类三',
    title: '标题三',
    icon: "none",
    items: subCategories,
    disabled: false
  }
])

//弹窗
const scorePopup =ref(null)

async function getSpecialization(departmentId: number) {
  let res = await getSpecializationByDepartmentId(departmentId)
  let data = res.data
  //清空subCategories
  subCategories.value = []
  for (let i = 0; i < data.length; i++) {
    //构造一个新的对象，包含title, label
    let obj = {
      title: data[i].name,
      label: data[i].description,
	  id: data[i].specializationId
    }
    subCategories.value.push(obj)
  }
  console.log(subCategories.value)
}

function handleChange({ value }) {
	active.value = value
	scrollTop.value = -1
	nextTick(() => {
		scrollTop.value = 0
	})
	getSpecialization(categories.value[value].departmentId)
}

const sure=() => {
  scorePopup.value.close();
}

//返回上一页
const goBack = () => {
	uni.navigateTo({
		url:'/pages/index/index'
	})
}

onMounted(()=>{
	async function getDepartments() {
		let res = await getAllDepartments()
		let data = res.data
		//清空categories
		categories.value = []
		for (let i = 0; i < data.length; i++) {
			//构造一个新的对象，包含label,title,icon,items,disabled
			let obj = {
				departmentId: data[i].departmentId,
				label: data[i].name,
				title: data[i].name,
				icon: "none",
				items: subCategories,
				disabled: false
			}
			categories.value.push(obj)
		}
		getSpecialization(categories.value[0].departmentId)
	}
	getDepartments()
	scorePopup.value.open();
})


</script>


<style lang="scss" scoped>
.registrationLayout{
	height: 100%;
	// background: #f7f8fa;
	.layout {
		.navbar {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 10;
			padding: 80rpx 0 30rpx 0;
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
	.pic{
		width: 750rpx;
		height: 400rpx;
		image{
			width: 750rpx;
			height: 110%;
		}
	}
	.wraper {
		position: fixed;
		width: 100%;
		display: flex;
		height: calc(100vh - var(--window-top));
		height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
		height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
		overflow: hidden;
		border-radius: 2% 2% 0 0;
		box-shadow: 0 -10px 10px rgba(0,0,0,0.1);
		.title{
			font-size: 30rpx;
			font-weight: bold;
			color: #333;
		}
		.content {
			flex: 1;
			background: #fff;
			transition: transform 0.3s ease;
			.category {
				box-sizing: border-box;
				height: 100%;
				image {
					width: 50rpx;
					height:50rpx;
					border-radius: 50%;
				}
			}
		}
	}
	.scorePopup{
		background: #fff;
		padding: 30rpx;
		width: 95vw;
		border-radius: 30rpx;
		.popHeader{
			display: flex;
			justify-content: center;
			.title{
				color: #333;
				margin-bottom: 0px;
				display: flex;
				font-size: 50rpx;
				font-weight: bold;
				// justify-content: center;
			}
		}
		
		.content{
			padding: 20rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.text{
				color: #FECA3E;
				padding-left: 0rpx;
				width: 80rpx;
				line-height: 1em;
				text-align: right;
			}
		}
		.footer{
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

}





</style>