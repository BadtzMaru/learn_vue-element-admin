import request from '@/utils/request';

// 登陆方法
export function login(data) {
	return request({
		url: '/vue-element-admin/user/login',
		method: 'post',
		data,
	});
}
// 获取用户信息
export function getInfo(token) {
	return request({
		url: '/vue-element-admin/user/info',
		method: 'get',
		params: { token },
	});
}
