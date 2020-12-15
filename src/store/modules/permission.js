import { asyncRoutes, constantRoutes } from '@/router';

/* 判断路由是否有权限的方法 */
export function hasPermission(roles, route) {
	if (route.meta && route.meta.roles) {
		return roles.some((role) => route.meta.roles.includes(role));
	} else {
		return true;
	}
}

/* 过滤路由的方法 */
export function filterAsyncRoutes(routes, roles) {
	const res = [];
	routes.forEach((route) => {
		const tmp = { ...route };
		if (hasPermission(roles, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, roles);
			}
			res.push(tmp);
		}
	});
	return res;
}

const state = {
	routes: [], // 全部可以访问的路由
	addRoutes: [], // 从 asyncRoutes 过滤出来可以访问的路由
};

const mutations = {
	SET_ROUTES: (state, routes) => {
		state.addRoutes = routes;
		state.routes = constantRoutes.concat(routes);
	},
};

const actions = {
	generateRoutes({ commit }, roles) {
		return new Promise((resolve) => {
			let accessRoutes;
			if (roles.includes('admin')) {
				accessRoutes = asyncRoutes || [];
			} else {
				accessRoutes = filterAsyncRoutes(asyncRoutes, roles);
			}
			commit('SET_ROUTES', accessRoutes);
			resolve(accessRoutes);
		});
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
