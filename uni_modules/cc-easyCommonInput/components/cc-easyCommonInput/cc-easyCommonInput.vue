<template>
	<view>
		<view class="inputView">
			<text class="leftTitle">{{leftTitle}}</text>

			<!-- 根据输入框类型渲染不同的input -->
			<input v-if="type == 'text'" class="rightInput" type="text" :password="password" :name="name"
				:value="value" @input="updateValue($event.target.value)" :placeholder="placeholder" />
			<input v-if="type == 'number'" class="rightInput" type="number" :password="password" :name="name"
				:value="value" @input="updateValue($event.target.value)" :placeholder="placeholder" />
			<input v-if="type == 'idcard'" class="rightInput" type="idcard" :password="password" :name="name"
				:value="value" @input="updateValue($event.target.value)" :placeholder="placeholder" />
			<input v-if="type == 'digit'" class="rightInput" type="digit" :password="password" :name="name"
				:value="value" @input="updateValue($event.target.value)" :placeholder="placeholder" />
			<input v-if="type == 'tel'" class="rightInput" type="tel" :password="password" :name="name"
				:value="value" @input="updateValue($event.target.value)" :placeholder="placeholder" />
			<input v-if="type == 'safe-password'" class="rightInput" type="safe-password" :password="password"
				:name="name" :value="value" @input="updateValue($event.target.value)" :placeholder="placeholder" />
			<input v-if="type == 'nickname'" class="rightInput" type="nickname" :password="password" :name="name"
				:value="value" @input="updateValue($event.target.value)" :placeholder="placeholder" />

			<!-- 是否带右标题 -->
			<text v-if="rigTitle.length" class="rightTitle">{{rigTitle}}</text>
		</view>

		<view class="line"></view>
	</view>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

// 定义 props
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  password: {
    type: Boolean,
    default: false
  },
  leftTitle: {
    type: String,
    default: ''
  },
  rigTitle: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
});

// 定义 emits
const emit = defineEmits(['update:value']);

// 更新父组件的值
function updateValue(newValue) {
  emit('update:value', newValue);
}
</script>


<style scoped>
	.inputView {
		flex-direction: row;
		display: flex;
		height: 50px;
		align-items: center;
		width: 100%;
	}
	.leftTitle {
		margin-left: 12px;
		width: 68px;
		font-size: 28rpx;
		color: #333333;
	}
	.rightInput {
		width: calc(100vw - 106px);
		font-size: 28rpx;
		height: 50px;
		color: #161616;
	}
	.rightTitle {
		margin-left: -50px;
		width: 40px;
		font-size: 28rpx;
		color: #666666;
		text-align: right;
	}
	.line {
		width: 90%;
		height: 2rpx;
		margin-left: -2rpx;
		background-color: #f8f8f8;
		margin-left: 5%;
	}
</style>
