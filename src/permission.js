import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@/utils/auth';
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({
	showSpinner: false,
});

/* 路由白名单 */
const whiteList = ['/login', '/auth-redirect'];

router.beforeEach(async (to, from, next) => {
	NProgress.start();
	document.title = getPageTitle(to.meta.title);
	const hasToken = getToken();
	if (hasToken) {
		// 登陆过了再访问登陆页面挑战到 '/'
		if (to.path === '/login') {
			next({ path: '/' });
			NProgress.done();
		} else {
			try {
				// 判断是否获取了用户信息
				const hasRoles =
					store.getters.roles && store.getters.roles.length > 0;
				if (hasRoles) {
					next();
				} else {
					const { roles } = await store.dispatch('user/getInfo');
					const accessRoutes = await store.dispatch(
						'permission/generateRoutes',
						roles
					);
					router.addRoutes(accessRoutes);
					next({ ...to });
				}
			} catch (error) {
				await store.dispatch('user/resetToken');
				Message.error(error || '请求错误');
				next('/login?redirect=${to.path}');
				NProgress.done();
			}
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next();
		} else {
			next(`/login?redirect=${to.path}`);
			NProgress.done();
		}
	}
});

router.afterEach(() => {
	NProgress.done();
});
