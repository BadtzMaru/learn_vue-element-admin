const port = process.env.port || process.env.npm_config_port || 9527;

module.exports = {
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: false, // 关闭eslint检测
	devServer: {
		port: port,
		open: false,
		before: require('./mock/mock-server.js'),
	},
};
