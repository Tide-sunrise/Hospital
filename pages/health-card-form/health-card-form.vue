<template>
	<view class="formLayout">
		<view class="title">
			添加健康卡
		</view>

		<view class="small-input">
			<view class="text-box">
				姓名
			</view>
			<up-input
			    placeholder="请输入姓名"
			    border="bottom"
				v-model="name"
			    clearable
				
			></up-input>
		</view>
		<view class="small-input">
			<view class="text-box">
				身份证号
			</view>
			<up-input
			    placeholder="请输入身份证号"
			    border="bottom"
				v-model="id"
			    clearable
				maxlength="20"
			></up-input>
		</view>
			
		<view class="footer">
			<wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
		</view>

	</view>
</template>

<script setup>
import { ref } from 'vue';

const name=ref("")
const id = ref("")
const idPattern = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/
const namePattern = /^[\u4e00-\u9fa5·－]{2,}$/

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const confirmName =()=>{
	if(!namePattern.test(name.value)){
		uni.showToast({
			title: '医院丁真，鉴定为：罕见',
			icon: 'none',
			duration: 1000
		})
		return false
	}
}

const confirmId =()=>{
	if(!idPattern.test(id.value)){
		uni.showToast({
			title: '医院丁真，鉴定为：罕见',
			icon: 'none',
			duration: 1000
		})
		return false
	}
}

const handleSubmit = async() => {
	if(!confirmName()){
		return
	}
	if (!confirmId()) {
		return
	}
	
	uni.showToast({
		title: '提交成功',
		icon: 'success',
		duration: 1000
	})
	
	//此处应为健康卡数据上传数据库逻辑
	
	await sleep(1000); // 延迟 1000 毫秒（1 秒）

	uni.navigateBack();
}
</script>

<style lang="scss" scoped>
.formLayout{
	padding: 30rpx;
	.title{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
		color:#111;
		padding-bottom:30rpx;
	}
	.small-input{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx 70rpx;
		.text-box{
			font-size: 13px;
			color: #333;
			width: 100rpx;
		}
	}
	.footer {
	  padding: 12px;
	}
	.name{
		display: flex;
		align-items: center;
		padding-bottom: 30rpx;
		.text{
			font-size: 30rpx;
			color:#111;
			padding-right: 20rpx;
		}
		.input{
			flex: 1;
			border-bottom: 1px solid #f5f5f5;
			input{
				width: 100%;
				height: 40rpx;
				border: none;
				outline: none;
			}
		}
	}
	.id{
		display: flex;
		align-items: center;
		padding-bottom: 30rpx;
		.text{
			font-size: 30rpx;
			color:#111;
			padding-right: 20rpx;
		}
		.input{
			flex: 1;
			border-bottom: 1px solid #f5f5f5;
			input{
				width: 100%;
				height: 40rpx;
				border: none;
				outline: none;
			}
		}
	}
}       
</style>
