import axios from 'axios';
import { MessageBox, Mesage, Message } from 'element-ui';
import store from '@/store';

// 创建axios实例
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	(response) => {},
	(error) => {
		console.log('err' + error);
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000,
		});
		return Promise.reject(error);
	}
);

export default service;
