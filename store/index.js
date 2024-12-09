// 页面路径：store/index.js
import { createStore } from 'vuex'
import { jwtDecode, InvalidTokenError } from 'jwt-decode';const store = createStore({
	state: { //存放状态
		token: localStorage.getItem('token') || "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiIsImFkbWluIjp0cnVlLCJleHAiOjE3MzU1NzQ0MDB9.4Q0y-VeMDvz5_puwuznHU_FAQOtH1gGaBnmG1O664IXzcH1hAe2_Dj1cZ61hKPjNYsvVrQ1VlE1CzEUPetnuQw",
	},
	mutations: { //同步修改状态
		setToken(state, token) {
			localStorage.setItem('token', token);
			state.token = token;
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