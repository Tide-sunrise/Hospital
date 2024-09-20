# cc-easyCommonInput

### 二维码小程序已上线，小程序扫码体验地址

![图片](https://i.postimg.cc/R01yVHSG/Wechat-IMG172.jpg)


### 我的技术微信公众号

查看更多前端组件和框架信息，请关注我的技术微信公众号【前端组件开发】

![图片](https://i.postimg.cc/RZ0sjnYP/front-End-Component.jpg)

#### 使用方法 
```使用方法
<!-- type:输入框input类型 password:是否密码 leftTitle：左边标题 rigTitle：右边标题 name：输入框名字  value：输入框值  placeholder:占位符 -->
<cc-easyCommonInput type="text" :password="false" leftTitle="姓名" name="name" value=""
				placeholder="请输入姓名"></cc-easyCommonInput>

<!-- type:输入框input类型 password:是否密码 leftTitle：左边标题 rigTitle：右边标题 name：输入框名字  value：输入框值  placeholder:占位符 -->
<cc-easyCommonInput type="digit" leftTitle="身高" rigTitle="cm" name="height" value=""
				placeholder="请输入身高"></cc-easyCommonInput>

<!-- type:输入框input类型 password:是否密码 leftTitle：左边标题 rigTitle：右边标题 name：输入框名字  value：输入框值  placeholder:占位符 -->
<cc-easyCommonInput type="number" leftTitle="手机号" name="phone" value=""
				placeholder="请输入手机号"></cc-easyCommonInput>

<!-- type:输入框input类型 password:是否密码 leftTitle：左边标题 rigTitle：右边标题 name：输入框名字  value：输入框值  placeholder:占位符 -->
<cc-easyCommonInput :password="true" leftTitle="密码" name="pwd" value=""
				placeholder="请输入密码"></cc-easyCommonInput>
```

#### HTML代码实现部分
```html
<template>
	<view class="content">

		<form @submit="formSubmit" @reset="formReset">


			<!-- type:输入框input类型 password:是否密码 leftTitle：左边标题 rigTitle：右边标题 name：输入框名字  value：输入框值  placeholder:占位符 -->
			<cc-easyCommonInput type="text" :password="false" leftTitle="姓名" name="name" value=""
				placeholder="请输入姓名"></cc-easyCommonInput>

			<cc-easyCommonInput type="digit" leftTitle="身高" rigTitle="cm" name="height" value=""
				placeholder="请输入身高"></cc-easyCommonInput>

			<!-- type:输入框input类型 password:是否密码 leftTitle：左边标题 rigTitle：右边标题 name：输入框名字  value：输入框值  placeholder:占位符 -->
			<cc-easyCommonInput type="number" leftTitle="手机号" name="phone" value=""
				placeholder="请输入手机号"></cc-easyCommonInput>

			<!-- type:输入框input类型 password:是否密码 leftTitle：左边标题 rigTitle：右边标题 name：输入框名字  value：输入框值  placeholder:占位符 -->
			<cc-easyCommonInput :password="true" leftTitle="密码" name="pwd" value=""
				placeholder="请输入密码"></cc-easyCommonInput>

			<cc-easyCommonInput leftTitle="住址" name="address" value="" placeholder="请输入地址"></cc-easyCommonInput>

			<cc-easyCommonInput type="digit" leftTitle="月租金" name="rentMonth" rigTitle="元/月" value=""
				placeholder="请输入月租金"></cc-easyCommonInput>


			<view class="uni-btn-v">
				<button class="botBtn" type="primary" form-type="submit">下一步</button>
				<view class="tipText"> 注意事项: 请确保您填写的信息真实无误 </view>

			</view>
		</form>


	</view>
</template>

<script>
	export default {

		data() {
			return {


			}
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e));
				var formdata = e.detail.value;
				uni.showModal({
					title: '温馨提示',
					content: 'formsubmit事件携带数据为：' + JSON.stringify(e.detail.value)
				})

			},
			towardPickerChange: function(e) {
				this.towardIndex = e.target.value;
				console.log(e.target.value);
			},
			floorPickerChange: function(e) {
				this.floorIndex = e.target.value;
				console.log(e.target.value);
			},
			liftPickerChange: function(e) {
				this.liftIndex = e.target.value;
				console.log(e.target.value);
			},
			decoratePickerChange: function(e) {
				this.decorateIndex = e.target.value;
				console.log(e.target.value);
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}


	.uni-btn-v {
		width: 100%;
		height: auto;
	}

	.botBtn {
		width: 90%;
		margin-top: 36px;
	}

	.tipText {
		width: 100%;
		margin-left: 0px;
		text-align: center;
		color: #666666;
		margin-top: 36px;
		margin-bottom: 36px;
		font-size: 28rpx;
	}
</style>


```
