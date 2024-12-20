// 页面路径：store/index.js
import { createStore } from 'vuex'
import { jwtDecode, InvalidTokenError } from 'jwt-decode';
const store = createStore({
	state: { //存放状态
		user: uni.getStorageSync('user')| null,
		// token: uni. || null
	},
	mutations: { //同步修改状态
		setToken(state, token) {
			// localStorage.setItem('token', token);
			state.token = token;
		},
		setUser(state, user) {
			// localStorage.setItem('user', user);
			state.user = user;
		},
		removeUser(state) {
			// localStorage.removeItem('user');
			state.user = null;
		},
		removeToken(state) {
			// localStorage.removeItem('token');
			state.token = null;
		},
		checkToken(state) {
			console.log('checkToken');
			if(state.token != null){
				//调用接口验证token是否过期
				const token = state.token;
				const decoded = jwtDecode(token);
				const currentTime = Date.now().valueOf() / 1000;
				if(decoded.exp < currentTime){
					state.token = null;
					// localStorage.removeItem('token');
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