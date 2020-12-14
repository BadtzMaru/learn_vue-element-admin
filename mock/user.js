const token = {
	admin: {
		token: 'admin-token',
	},
	editor: {
		token: 'editor-token',
	},
};

const user = {
	'admin-token': {
		roles: ['admin'],
		introduction: '我是超级管理员',
		avatar:
			'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
		name: 'Super Admin',
	},
	'editor-token': {
		roles: ['editor'],
		introduction: '我是编者',
		avatar:
			'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607949683523&di=c517903d1e51cf556a0917549d725890&imgtype=0&src=http%3A%2F%2Fimg.tuzhaozhao.com%2F2018%2F04%2F16%2Fbb5758ddb274423d914dbad8e552827e_600x600.jpeg',
		name: 'Normal Editor',
	},
};

module.exports = [
	// 登陆接口
	{
		url: '/vue-element-admin/user/login',
		type: 'post',
		response: (config) => {
			const { username } = config.body;
			const token = tokens[username];
			if (!token) {
				return {
					code: 60204,
					message: '帐号密码错误',
				};
			}
			return {
				code: 20000,
				data: token,
			};
		},
	},
];
