import Vue from 'vue';
import Router from 'vue-router';

/* 路由模块 */
import componentsRouter from './modules/components';
import chartsRouter from './modules/charts.js';

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
		hidden: true,
	},
	{
		path: '/404',
		component: () => import('@/views/error-page/404'),
		hidden: true,
	},
	{
		path: '/401',
		component: () => import('@/views/error-page/401'),
		hidden: true,
	},
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		children: [
			{
				path: 'dashboard',
				component: () => import('@/views/dashboard/index'),
				name: 'Dashboard',
				meta: { title: '仪表盘', icon: 'dashboard', affix: true },
			},
		],
	},
	{
		path: '/documentation',
		component: Layout,
		children: [
			{
				path: 'index',
				component: () => import('@/views/documentation/index'),
				name: 'Documentation',
				meta: {
					title: '文献记录',
					icon: 'documentation',
					affix: true,
				},
			},
		],
	},
	{
		path: '/guide',
		component: Layout,
		redirect: '/guide/index',
		children: [
			{
				path: 'index',
				component: () => import('@/views/guide/index'),
				name: 'Guide',
				meta: { title: '指南', icon: 'guide', noCache: true },
			},
		],
	},
	{
		path: '/profile',
		component: Layout,
		redirect: '/profile/index',
		hidden: true,
		children: [
			{
				path: 'index',
				component: () => import('@/views/profile/index'),
				name: 'Profile',
				meta: { title: '个人简况', icon: 'user', noCache: true },
			},
		],
	},
];

/* 需要角色验证的路由 */
export const asyncRoutes = [
	{
		path: '/permission',
		component: Layout,
		redirect: '/permission/page',
		alwaysShow: true, // 只有一个 children 也会显示在根菜单中
		name: 'Permission',
		meta: {
			title: '权限管理',
			icon: 'lock',
			roles: ['admin', 'editor'],
		},
		children: [
			{
				path: 'page',
				component: () => import('@/views/permission/page'),
				name: 'PagePermission',
				meta: {
					title: '角色切换',
					roles: ['admin'],
				},
			},
			{
				path: 'directive',
				component: () => import('@/views/permission/directive'),
				name: 'DirectivePermission',
				meta: {
					title: '权限指令',
				},
			},
			{
				path: 'role',
				component: () => import('@/views/permission/role'),
				name: 'RolePermission',
				meta: {
					title: '角色管理',
					roles: ['editor'],
				},
			},
		],
	},
	{
		path: '/icon',
		component: Layout,
		children: [
			{
				path: 'index',
				component: () => import('@/views/icons/index'),
				name: 'Icons',
				meta: { title: '图标库', icon: 'icon', noCache: true },
			},
		],
	},
	// 组件路由模块
	componentsRouter,
	chartsRouter,
	// 404页面必须放在路由的最后面 !!!
	{ path: '*', redirect: '/404' },
];

/* 创建路由实例 */
const createRouter = () =>
	new Router({
		mode: 'history',
		scrollBehavior: () => ({ y: 0 }),
		routes: constantRoutes,
	});

const router = createRouter();

export default router;
