import Vue from 'vue';
import Router from 'vue-router';

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject)
		return originalPush.call(this, location, onResolve, onReject);
	return originalPush.call(this, location).catch((err) => err);
};

Vue.use(Router);

/* 引入Layout组件 */
import Layout from '@/layout';

/* 不需要角色验证的路由 */
export const constantRoutes = [
	{
		path: '/login',
		component: () => import('@/views/login/index'),
	},
	{
		path: '/404',
		component: () => import('@/views/error-page/404'),
	},
	{
		path: '/401',
		component: () => import('@/views/error-page/401'),
	},
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [
			{
				path: 'dashboard',
				component: () => import('@/views/dashboard/index'),
			},
		],
	},
	// 404页面必须放在路由的最后面 !!!
	{ path: '*', redirect: '/404' },
];

/* 需要角色验证的路由 */
export const asyncRoutes = [];

/* 创建路由实例 */
const createRouter = () =>
	new Router({
		mode: 'history',
		scrollBehavior: () => ({ y: 0 }),
		routes: constantRoutes,
	});

const router = createRouter();

export default router;
