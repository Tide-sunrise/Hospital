import { createStore } from 'vuex';

// 定义初始状态
const state = {
  message: 'Hello, World!'
};

// 定义获取状态的方法
const getters = {
  getMessage: (state) => state.message
};

// 定义改变状态的方法
const mutations = {
  setMessage(state, payload) {
    state.message = payload;
  }
};

// 定义异步操作
const actions = {
  updateMessage({ commit }, payload) {
    commit('setMessage', payload);
  }
};

// 创建 Vuex Store
export default createStore({
  state,
  getters,
  mutations,
  actions
});