const port = process.env.port || process.env.npm_config_port || 9527;

module.exports = {
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: false, // 关闭eslint检测
	devServer: {
		port: port,
		open: true,
		before: require('./mock/mock-server.js'),
	},
	chainWebpack: (config) => {
		const svgRule = config.module.rule('svg');
		svgRule.uses.clear();
		svgRule
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]',
			});
	},
};
