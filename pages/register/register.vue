<template>
	<view class="rigLayout pageBg2">
		<view class="title">
			注册
		</view>
		<view class="input">
			<view class="small-input">
				<view class="text-box">
					用户名
				</view>
				<up-input placeholder="用户名不得重复" border="bottom" v-model="username" clearable></up-input>
			</view>
			<view class="small-input">
				<view class="text-box">
					密码
				</view>
				<up-input placeholder="6-20位,须含字母 符号 数字至少2种" border="bottom" v-model="password" clearable maxlength="20"
					:password="!eye">


					<template #suffix>
						<view class="eye" @click="eye=!eye">
							<up-icon name="eye-fill" v-if="!eye"></up-icon>
							<up-icon name="eye-off" v-if="eye"></up-icon>
						</view>

					</template>

				</up-input>
			</view>
			<view class="small-input">
				<view class="text-box">
					确认密码
				</view>
				<up-input placeholder="重新输入密码" border="bottom" v-model="rePassword" clearable maxlength="20"
					:password="!eye"></up-input>
			</view>




		</view>
		<view class="negotiate">
			<view class="choice">
				<wd-checkbox class="line" v-model="value" @change="handleChange" shape="square">
					本人已阅读并同意

				</wd-checkbox>
				<view class="a">
					吧唧吧唧隐私政策
				</view>
			</view>
			<view class="rig" @click="navToRig">

			</view>
		</view>
		<view class="button">
			<wd-button block @click="confirm">注册</wd-button>
			<wd-button block type="success" @click="navToRig">返回登录</wd-button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		watch
	} from 'vue'
	import store from '@/store/index.js'
	import {
		register
	} from '../../api/users'
	import CryptoJS from 'crypto-js'

	const value = ref(false)
	const username = ref("")
	const password = ref("")
	const rePassword = ref("")
	const passwordPattern = /^(?:(?=.*\d)(?=.*[a-zA-Z])|(?=.*\d)(?=.*\W)|(?=.*[a-zA-Z])(?=.*\W)).{6,20}$/;
	// const isPassword = ref(true)
	const eye = ref(false)
	const userid = ref()

	const handleChange = (e) => {
		value.value = e.value
	}
	async function userRegister(username, password) {
		let data = {
			userId: null,
			name: username,
			phone: null,
			balabce: 0,
			password: password,
		}
		data.password = CryptoJS.MD5(data.password).toString();
		let res = await register(data)
		if (res.code == 0) {
			res = res.data;
			userid.value = res
			console.log(userid.value)
			uni.showModal({
				title: '注册成功',
				content: '请记住您的登录账号:' + userid.value,
				showCancel: false,
				confirmText: '确定',
				success: function(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
				}
			})
			return true;
		} else {
			uni.showToast({
				title: res.message,
				icon: 'none',
				duration: 1000
			})
			return false;
		}
	}
	const confirmPassword = () => {
		if (!value.value) {
			uni.showToast({
				title: '请同意隐私政策',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		if (!passwordPattern.test(password.value)) {
			uni.showToast({
				title: '密码格式错误',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		if (password.value !== rePassword.value) {
			uni.showToast({
				title: '两次密码输入不一致',
				icon: 'none',
				duration: 1000
			})
			return false
		}
		return userRegister(username.value, password.value)
	}

	const navToRig = () => {
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}

	const confirm = () => {
		if (!confirmPassword()) {
			return
		}
	}
</script>

<style lang="scss" scoped>
	.rigLayout {
		display: flex;
		flex-direction: column;

		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 20px;
			margin: 100rpx 0;

		}

		.input {
			display: flex;
			flex-direction: column;

			.small-input {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin: 20rpx 60rpx;

				.text-box {
					font-size: 13px;
					color: #333;
					width: 100rpx;
				}
			}
		}

		.negotiate {

			left: 0%;
			width: 600rpx;
			margin: 0 auto;
			display: flex;
			//分散布局
			justify-content: space-between;
			margin-top: 100rpx;

			.choice {
				display: flex;
				flex-direction: row;

				.line {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;

				}

				.a {
					color: #007aff;
					font-size: 13px;
					display: flex;
					align-items: center;
				}
			}

			// .rig{
			// 	display: flex;
			// 	margin-right: 20rpx;
			// 	color: #007aff;
			// 	font-size: 13px;
			// 	align-items: center;
			// }

		}

		.button {
			margin-top: 50rpx;
			display: flex;


		}

	}
</style>