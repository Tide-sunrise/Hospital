import axios from "uniapp-axios-adapter"; 
import store from "../store";

const baseURL = 'http://localhost:8081';
const timeout = 5000;
const instance = axios.create({ 
	baseURL, 
	timeout,
});

//定义拦截器
instance.interceptors.request.use(
    config => {
		// 在发送请求之前做些什么
		//将Content-Type设置为application/json
		if(!config.headers['Content-Type'])
			config.headers['Content-Type'] = 'application/json';
		config.headers['satoken'] = store.state.token;
		console.log(config);
		return config;
});


//定义拦截响应器
instance.interceptors.response.use(
    result => {
		result = result.data;
		//如果没有code字段，直接返回数据
        if (result.code === 0) {
            return result;
        }
        else {
			uni.showModal({
				title: '提示',
				content: result.message,
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
			if(result.message==="NEED_LOGIN"){
				store.commit("removeUser");
				store.commit("removeToken");
				uni.navigateTo({
					url: '/pages/login/login',
				});
			}
            return Promise.reject(result.message);
        }
    },
    err => {
        alert("服务异常")
        return Promise.reject(err);
    }
)//异步

export default instance;