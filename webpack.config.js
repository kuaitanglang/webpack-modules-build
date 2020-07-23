const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

module.exports = (env) => {
    console.log(env)
    let ProjectName = env.name;
    let log = console;
    return {
        mode: 'development',
        entry: './src/' +ProjectName+ '/main.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist/' + ProjectName)
        },
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
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                favicon: './src/' +ProjectName+ '/assets/favicon.ico',
            }),
            new VueLoaderPlugin(),

            // 打印更新的模块路径
            new webpack.NamedModulesPlugin(),
            // 热更新插件
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'processEnv': {
                    "NODE_ENV": JSON.stringify(env.NODE_ENV),
                    "ProjectName": JSON.stringify(env.name)
                }
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.(scss|less)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader', 'less-loader', 'postcss-loader']
                },
                {
                    test: /\.vue$/,
                    use: [
                        'vue-loader',
                        /*{
                            loader: 'style-vw-loader',
                            options: {
                                unitToConvert: 'px',
                                viewportWidth: 375,
                                unitPrecision: 5,
                                viewportUnit: 'vw',
                                fontViewportUnit: 'vw',
                                minPixelValue: 1
                            }
                        },*/
                    ]
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(eot(|\?v=.*)|woff(|\?v=.*)|woff2(|\?v=.*)|ttf(|\?v=.*)|svg(|\?v=.*))$/,
                    loader: 'file-loader',
                    // options: {name: 'static/iconfont/[name].[hash:8].[ext]'},
                },
                {
                    //html中引用过的图片将会打包至images目录下，未使用过的将不会存在
                    test: /\.(png|jpg|jpeg|gif|ico)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 20000,
                        esModule: false,
                        //name:'images/[name].[hash:8].[ext]',
                        // name: './dist/assets/images/[name].[ext]'
                    }
                }
            ]
        }
    };
}