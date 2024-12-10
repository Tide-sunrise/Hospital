<template>
  <view class="registration-container pageBg2">
    <view class="header">
      <text class="title">挂号信息</text>
    </view>
   <view class="info-block">
      <view class="info-item"><text><strong>挂号日期:</strong> 2024年12月10日</text></view>
      <view class="info-item"><text><strong>挂号时间:</strong> {{ registrationTime }}</text></view>
      <view class="info-item"><text><strong>挂号金额:</strong> ¥50.00</text></view>
      <view class="info-item"><text><strong>医生信息:</strong> 雷医生, 🐓科专家</text></view>
    </view>
    <view v-if="!isPaid" class="payment-section">
      <up-button @click="handlePayment" color="rgb(66, 83, 216)" shape="circle">支付 ¥50.00</up-button>
    </view>
    <view v-else class="success-message">
      <text>挂号成功！请于指定时间前往医院就诊。</text>
    </view>
	<wd-button v-if="isPaid" block @click="navBack">返回主页</wd-button>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 定义响应式变量
const isPaid = ref(false);
const registrationTime = ref('');
const isisPaid = ref(true);
// // 模拟页面加载时获取传递过来的时间参数
onLoad((options) => {
  registrationTime.value = options.time || '8:30-9:30';
  isPaid.value=options.isPaid==='true'||false;
  isisPaid.value=isPaid.value
  
  
});

//重新切回页面时诱发函数效果,但是第一次进入不需要
// onLoad(()=>{
// 	if(isisPaid.value){
// 		uni.showToast({
// 			title: '挂号成功！请于指定时间前往医院就诊。',
// 			icon: 'none',
// 			duration: 2000
// 		});
// 	}
// })


// 处理支付逻辑
const handlePayment = () => {
  // 这里可以添加实际的支付处理逻辑，比如调用支付API等
  uni.showModal({
    title: '支付确认',
    content: '是否确认支付 ¥50.00？',
    success: (res) => {
      if (res.confirm) {
        // 模拟支付成功后的状态改变
        setTimeout(() => {
          isPaid.value = true;
          uni.navigateTo({
          	url:`/pages/payment/payment?isSuccess=${isPaid.value}`
          })
        }, 1000); // 假设需要1秒来完成支付过程
      }
    }
  });
};


const navBack =()=>{
	uni.navigateTo({
		url:'/pages/index/index'
	})
}
</script>

<style lang="scss" scoped>
.registration-container {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  text-align: center;

  .header {
    margin-bottom: 20px;

    .title {
      font-size: 24px;
      color: #333;
    }
  }

  .info-block {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

    .info-item {
      margin: 5px 0;
      font-size: 16px;
      color: #666;

      strong {
        color: #333;
      }
    }
  }

  .payment-section {
    margin-bottom: 20px;
  }

  .success-message {
    background-color: #e6ffed;
    padding: 20px;
    border-radius: 8px;
    color: #28a745;
    font-weight: bold;
	margin-bottom: 40rpx;
  }
}
</style>