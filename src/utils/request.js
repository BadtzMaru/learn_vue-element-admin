import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';

// 创建axios实例
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		if (store.getters.token) {
			config.headers['X-Token'] = getToken();
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	(response) => {
		const res = response.data;
		if (res.code !== 20000) {
			Message({
				message: res.message || '请求失败',
				type: 'error',
				duration: 5 * 1000,
			});
			if (
				res.code === 50008 ||
				res.code === 50012 ||
				res.code === 50014
			) {
				MessageBox.confirm(
					'您的登陆信息已过期,请重新登陆',
					'确认注销',
					{
						confirmButtonText: '重新登陆',
						cancelButtonText: '取消',
						type: 'warning',
					}
				).then(() => {
					store.dispatch('user/resetToken').then(() => {
						location.reload();
					});
				});
			}
			return Promise.reject(new Error(res.message || '请求失败'));
		} else {
			return res;
		}
	},
	(error) => {
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000,
		});
		return Promise.reject(error);
	}
);

export default service;
