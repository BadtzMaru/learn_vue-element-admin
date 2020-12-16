import Layout from '@/layout';

const chartsRouter = {
	path: '/charts',
	component: Layout,
	redirect: 'noRedirect',
	name: 'Charts',
	alwaysShow: true, // 只有一个 children 的时候也显示父级路由
	meta: {
		title: '图表',
		icon: 'chart',
	},
	children: [
		{
			path: 'keyboard',
			component: () => import('@/views/charts/keyboard'),
			name: 'KeyboardChart',
			meta: { title: 'Keyboard Chart', noCache: true },
		},
	],
};

export default chartsRouter;
