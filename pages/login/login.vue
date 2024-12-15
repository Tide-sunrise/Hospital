<template>
	<view class="loginLayout pageBg2">
		<view class="title">
			登录
		</view>
		<view class="input">
			<view class="small-input">
				<view class="text-box">
					手机号
				</view>
				<up-input
				    placeholder="请输入手机号码"
				    border="bottom"
					v-model="phone"
				    clearable
					
				  ></up-input>
			</view>
			<view class="small-input">
				<view class="text-box">
					密码
				</view>
				<up-input placeholder="请输入密码" border="bottom" v-model="password" clearable maxlength="20"
					:password="!eye">
				
				
					<template #suffix>
						<view class="eye" @click="eye=!eye">
							<up-icon name="eye-fill" v-if="!eye"></up-icon>
							<up-icon name="eye-off" v-if="eye"></up-icon>
						</view>
				
					</template>
				
				</up-input>
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
			<wd-button block @click="confirm">登录</wd-button>
			<wd-button block type="success" @click="navToRig">注册</wd-button>
		</view>
	</view>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { login } from '@/api/users.js'
import store from '@/store/index.js'
import CryptoJS from 'crypto-js'

//挂载前检查当前token是否存在
onMounted(()=>{
	//store.commit('checkToken');
	// if(store.getters.isAuthenticated){
	// 	console.log('已登录')
	// 	uni.navigateTo({
	// 		url: '/pages/index/index'
	// 	})
	// }
})

const value = ref(false)
const phone = ref("")
const username = ref("")
const password = ref("")
const eye = ref(false)

const handleChange = (e) => {
	value.value = e.value
}
async function userlogin(){
	console.log("123")
	let data = {
		phone: phone.value,
		password: CryptoJS.MD5(password.value).toString()
	}
	console.log("1223")
	let res = await login(data)
	console.log(res)
	res=res.data;
	store.commit('setToken',res.tokenValue);
	store.commit('setUser',res.loginId);
	uni.showToast({
		title: '登录成功',
		icon: 'success',
		duration: 1000
	})
	uni.navigateTo({
		url: '/pages/index/index'
	})
	return true
}


const confirmPassword = () =>{
	if(!value.value){
		uni.showToast({
			title: '请同意隐私政策',
			icon: 'none',
			duration: 1000
		})
		return false
	}
	//此处插入判断用户是否存在逻辑
	return userlogin()
}

const navToRig = () => {
	uni.navigateTo({
		url: '/pages/register/register'
	})
}

const confirm = () => {
	console.log("你好")
	if(!confirmPassword()){
		console.log("你好a")
		return
	}
}
</script>

<style lang="scss" scoped>
.loginLayout{
	display: flex;
	flex-direction: column;
	
	.title{
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		margin: 100rpx 0;
		
	}
	.input{
		display: flex;
		flex-direction: column;
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
	}
	.negotiate{
		
		left: 0%;
		width: 600rpx;
		margin: 0 auto;
		display: flex;
		//分散布局
		justify-content: space-between;
		margin-top: 100rpx;
		.choice{
			display: flex;
			flex-direction: row;
			
			.line{
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				
			}
			.a{
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
	.button{
		margin-top: 50rpx;
		display: flex;
		
		
	}
	
}  
</style>
