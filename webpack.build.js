const webpack = require('webpack');
const merge = require('webpack-merge').merge;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.common');
module.exports = (env) => {
	
	let Common_config = common(env);
	
	let webpackConfig = merge(Common_config, {
		mode: 'production',
		devtool: 'source-map',
		performance: {
			hints: 'warning'
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/[name].[chunkhash:8].css',
				chunkFilename: "css/chunk/[id].css"
			}),
			new OptimizeCssAssetsPlugin()
		],
		optimization: {
			//提取公共代码
			splitChunks: {
				chunks: "initial",
				minSize: 0,
				minChunks: 2,
				// name: true,
				// maxAsyncRequests: 5,
				// maxInitialRequests: 3,
				// automaticNameDelimiter: '~',
				cacheGroups: {
					vendor: {
						name: "vendor",
						test: /[\\/]node_modules[\\/]/,
						chunks: "initial",
						minChunks: 5,
						priority: 10 // 优先级
					},
					common: {
						name: "common",
						test: /[\\/]src[\\/]/,
						minSize: 1024,
						chunks: "initial",
						priority: 5,
					},
				}
			}
		},
	});
	
	return webpackConfig;
}