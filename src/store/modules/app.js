import Cookies from 'js-cookie';

const state = {
	sidebar: {
		opened: Cookies.get('sidebarStatus')
			? !!+Cookies.get('sidebarStatus')
			: true,
		withoutAnimation: false,
	},
	device: 'desktop',
};

const mutations = {
	// 关闭侧边菜单栏
	CLOSE_SIDEBAR: (state, withoutAnimation) => {
		Cookies.set('sidebarStatus', 0);
		state.sidebar.opened = false;
		state.sidebar.withoutAnimation = withoutAnimation;
	},
};

const actions = {
	closeSideBar({ commit }, { withoutAnimation }) {
		commit('CLOSE_SIDEBAR', withoutAnimation);
	},
};

export default {
	namespaced: true,
	state,
};
