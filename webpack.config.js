const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge').merge;
//自定义主题
const colors = require("colors");
colors.setTheme({info: 'green', warn: 'yellow', debug: 'blue', error: 'red'});
//common
const common = require('./webpack.common');

module.exports = (env) => {
	if (!env) {
		console.error('缺少环境参数 env; eg:--env.NODE_ENV=dev --env.name=demo'.red);
	}
	
	let ProjectName = env.name;
	let Common_config = common(env);
	
	let WebpackConfig = merge(Common_config, {
		mode: 'development',
		devtool: 'source-map',
		devServer: {
			port: 9000,
			host: '0.0.0.0',
			inline: true,
			useLocalIp: true,
			// 自动打开浏览器
			open: true,
			hot: true,
			historyApiFallback: true,
			// 告诉服务器从哪里dist目录中提供内容
			contentBase: './dist/' + ProjectName,
			proxy:{
				'/api':{
					target:''
				}
			}
		},
		plugins: [
			// 打印更新的模块路径
			new webpack.NamedModulesPlugin(),
			// 热更新插件
			new webpack.HotModuleReplacementPlugin(),
		],
	});
	
	return WebpackConfig;
}