<template>
	<view class="registrationLayout pageBg">
		
		<view class="empty">
			<custom-nav-bar :isBack="true" title="智能搜索"/>
			<!-- <uni-icons type="contact" size="30" @click="onClicked"></uni-icons> -->
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
		          :throttle="false"
		        >
					<wd-cell-group :title="item.title" border @click="navToDoctor">
						<wd-cell v-for="(cell, index) in item.items" :key="index" :title="cell.title" :label="cell.label">
							<image src="../../common/image/genshin.jpg" mode="aspectFit"></image>
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
import axios from 'axios'
// import {onShow,onLoad} from "@dcloudio/uni-app"

const active = ref<number>(0)
const scrollTop = ref<number>(0)
const subCategories = new Array(24).fill({ title: '原神', label: '一款开放世界冒险游戏' }, 0, 24)
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
    items: subCategories.slice(0, 18),
    disabled: false
  },
  {
    label: '分类四',
    title: '标题四',
    icon: "none",
    items: subCategories.slice(0, 21),
    disabled: false
  },
  {
    label: '分类五',
    title: '标题五',
	icon: "none",
    items: subCategories,
    disabled: false
  },
  {
    label: '分类六',
    title: '标题六',
	icon: "none",
    items: subCategories.slice(0, 18),
    disabled: false
  },
  {
    label: '分类七',
    title: '标题七',
	icon: "none",
    items: subCategories,
    disabled: true
  }
])

//弹窗
const scorePopup =ref(null)

function handleChange({ value }) {
  active.value = value
  scrollTop.value = -1
  nextTick(() => {
    scrollTop.value = 0
  })
}

const sure=() => {
  console.log('你好')
  
  scorePopup.value.close();
}

const navToDoctor = () => {
  uni.navigateTo({
    url: '/pages/doctor/doctor'
  })
}

onMounted(()=>{
	console.log('onShow')
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
		console.log(categories.value)
	}
	getDepartments()
	scorePopup.value.open();
})


</script>


<style lang="scss" scoped>
.registrationLayout{
	height: 100%;
	// background: #f7f8fa;
	.empty {
		padding-top: 70rpx;
		height: 300rpx;
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
					width: 100rpx;
					height:100rpx;
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