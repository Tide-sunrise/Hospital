import store from "../store";
import pagesData from "../pages.json"

const needLoginPaths = pagesData.pages
  .filter(page => page.needLogin)
  .map(page => '/'+page.path);
const routerInterceptorHandler = {
	invoke(args) {
		console.log(args.url)
		const token = store.state.token
		if (needLoginPaths.includes(args.url) && token==null) {
			uni.showToast({
			          title: '请先登录',
			          icon: 'none'
			        })
			uni.navigateTo({
				url: '/pages/login/login'
			})
			return false
		}
		return true
	},
	fail(args){
		console.log(args)
	}
}

export const routerInterceptor = {
	install() {
		console.log('routerInterceptor installed')
		uni.addInterceptor('navigateTo', routerInterceptorHandler)
		uni.addInterceptor('redirectTo', routerInterceptorHandler)
		uni.addInterceptor('reLaunch', routerInterceptorHandler)
		uni.addInterceptor('switchTab', routerInterceptorHandler)
	}
}
