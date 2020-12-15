import { login, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';

const state = {
	token: getToken(),
	name: '',
	avatar: '',
	introduction: '',
	roles: [],
};

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token;
	},
	SET_NAME: (state, name) => {
		state.name = name;
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar;
	},
	SET_INTRODUCTION: (state, introduction) => {
		state.introduction = introduction;
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles;
	},
};

const actions = {
	// 登陆 action
	login({ commit }, userInfo) {
		const { username, password } = userInfo;
		return new Promise((resolve, reject) => {
			login({ username: username.trim(), password })
				.then((response) => {
					const { data } = response;
					commit('SET_TOKEN', data.token);
					setToken(data.token);
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	// 获取用户信息
	getInfo({ commit, state }) {
		return new Promise((resolve, reject) => {
			getInfo(state.token)
				.then((response) => {
					const { data } = response;
					if (!data) {
						reject('获取用户失败,请重新登陆');
					}
					const { roles, name, avatar, introduction } = data;

					if (!roles || roles.length <= 0) {
						reject('用户角色数据有误,请重新登陆获取');
					}
					commit('SET_ROLES', roles);
					commit('SET_NAME', name);
					commit('SET_AVATAR', avatar);
					commit('SET_INTRODUCTION', introduction);
					resolve(data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	},
	// 清除token action
	resetToken({ commit }) {
		return new Promise((resolve) => {
			commit('SET_TOKEN', '');
			commit('SET_ROLES', []);
			removeToken();
			resolve();
		});
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
