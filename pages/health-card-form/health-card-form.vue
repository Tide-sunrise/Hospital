<template>
	<view class="formLayout">
		<view class="title">
			添加健康卡
		</view>

		<cc-easyCommonInput type="text" :password="false" leftTitle="姓名" name="name" value=""
			placeholder="请输入姓名"></cc-easyCommonInput>
		<!-- type:输入框input类型 password:是否密码 leftTitle：左边标题 rigTitle：右边标题 name：输入框名字  value：输入框值  placeholder:占位符 -->
		<cc-easyCommonInput type="text" leftTitle="身份证号" name="phone" value=""
			placeholder="请输入身份证号"></cc-easyCommonInput>
			
		<view class="footer">
			<wd-button type="primary" size="large" @click="handleSubmit" block>提交</wd-button>
		</view>

	</view>
</template>

<script setup>
import { ref } from 'vue';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const handleSubmit = async() => {
	uni.showToast({
		title: '提交成功',
		icon: 'success',
		duration: 1000
	})
	
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
