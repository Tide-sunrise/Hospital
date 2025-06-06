import App from './App'
import uviewPlus from '@/uni_modules/uview-plus'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import store from './store'
import Vuex from "vuex";
import { routerInterceptor } from './interceptors/routerInterceptor.js'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(routerInterceptor)
  app.use(uviewPlus)
  
  return {
    app,
	Vuex
  }
}
// #endif