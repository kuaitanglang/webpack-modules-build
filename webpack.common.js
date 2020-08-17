const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件

//自定义主题
const colors = require("colors");
colors.setTheme({info: 'green', warn: 'yellow', debug: 'blue', error: 'red'});

module.exports = (env) => {
	let ProjectName = env.name;
	
	function baseUrl() {
		if (env.NODE_ENV === 'dev') {
			return 'https://192.168.1.1';
		} else if (env.NODE_ENV === 'sit') {
			return 'https://192.168.1.1';
		} else if (env.NODE_ENV === 'uat') {
			return 'https://192.168.1.1';
		} else if (env.NODE_ENV === 'production') {
			return 'https://192.168.1.1';
		} else {
			return ''
		}
	}
	
	return {
		entry: {
			main: './src/' + ProjectName + '/main.js',
			app: './src/' + ProjectName + '/app.js'
		},
		output: {
			path: path.resolve(__dirname, 'dist/' + ProjectName),
			filename: '[name].bundle.js',
			chunkFilename: 'js/[name].bundle.js',
		},
		resolve: {
			extensions: ['.js', '.vue', '.json', '.css', '.*'],
			alias: {
				'@': path.resolve(__dirname, './'),//根目录
			}
		},
		plugins: [
			new VueLoaderPlugin(),
			
			new HtmlWebpackPlugin({
				template: './public/index.html',
				favicon: './src/' + ProjectName + '/assets/favicon.ico',
			}),
			new webpack.DefinePlugin({
				'process.env': {
					"NODE_ENV": JSON.stringify(env.NODE_ENV),
					"ProjectName": JSON.stringify(env.name),
					"BASE_URL": JSON.stringify(baseUrl())
				}
			}),
		],
		module: {
			rules: [
				{
					test: /\.(css|scss|less)$/,
					use: env.NODE_ENV !== 'dev' ?
						[
							{
								loader: MiniCssExtractPlugin.loader,
							},
							'css-loader',
							'postcss-loader',
						]
						: [
							'style-loader',
							'css-loader',
							'sass-loader',
							'less-loader',
							'postcss-loader'
						]
				},
				{
					test: /\.vue$/,
					use: [
						'vue-loader',
						{
							loader: 'style-vw-loader',
							options: {
								unitToConvert: 'px',
								viewportWidth: 375,
								unitPrecision: 5,
								viewportUnit: 'vw',
								fontViewportUnit: 'vw',
								minPixelValue: 1
							}
						},
					]
				},
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.(eot(|\?v=.*)|woff(|\?v=.*)|woff2(|\?v=.*)|ttf(|\?v=.*)|svg(|\?v=.*))$/,
					use: [
						{
							loader: 'file-loader',
							options: {name: 'icon/[name].[ext]'}
						}
					],
				},
				{
					//html中引用过的图片将会打包至images目录下，未使用过的将不会存在
					test: /\.(png|jpg|jpeg|gif|ico)$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 10000,
								esModule: false,
								name: 'img/[name].[ext]',
							}
						}
					],
				}
			]
		}
	};
}