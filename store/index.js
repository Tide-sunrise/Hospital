// 页面路径：store/index.js
import { createStore } from 'vuex'
import { jwtDecode, InvalidTokenError } from 'jwt-decode';const store = createStore({
	state: { //存放状态
		token: localStorage.getItem('token') || "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiIsImFkbWluIjp0cnVlLCJleHAiOjE3MzM0MTQ0MDB9.c54bgsRg-hH_laPe0RtGuXv3LTjVHjPoEjVvHNoRdHbmqpHhKBDhHFM_aes1tC5i_qrPR3nXdcYsDuVdLf6yVA",
	},
	mutations: { //同步修改状态
		setToken(state, token) {
			localStorage.setItem('token', token);
			state.token = token;
		},
		checkToken(state) {
			if(state.token != null){
				//调用接口验证token是否过期
				const token = state.token;
				const decoded = jwtdecode(token);
				const currentTime = Date.now().valueOf() / 1000;
				if(decoded.exp < currentTime){
					state.token = null;
					localStorage.removeItem('token');
				}
			}
		}
	},
	getters: { //计算属性
		isAuthenticated(state) {
			return state.token != null;
		}
	},
});

export default store