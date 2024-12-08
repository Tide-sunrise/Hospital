<template>
	<view class="empty" :style="squareStyle">
		
	</view>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// 定义 props
const props = defineProps({
  height: {
    type: String,
    default: '200rpx'
  }
});

// 定义一个 ref 来存储高度
const squareHeight = ref(props.height);

// 计算样式
const squareStyle = computed(() => ({
  '--square-height': squareHeight.value
}));

// 监听 props 变化，更新高度
watch(() => props.height, (newHeight) => {
  squareHeight.value = newHeight;
});
</script>

<style lang="scss" scoped>
.empty{
		width: 100%;
		height: var(--square-height);
	}	       
</style>