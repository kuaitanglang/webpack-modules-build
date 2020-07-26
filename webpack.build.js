const webpack = require('webpack');
const merge = require('webpack-merge').merge;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const common = require('./webpack.common');
module.exports = (env) => {

    let Common_config = common(env);

    let webpackConfig = merge(Common_config,{
        mode: 'production',
        // devtool: 'source-map',
        performance: {
            hints: 'warning'
        },
        plugins : [
            // 提取@import css到独立的css文件
            new ExtractTextPlugin({
                filename: '[name].[chunkhash:8].css',
                allChunks: true,
                //disable: false,//警用插件
            })
        ],
        optimization:{
            //提取公共代码
            splitChunks: {
                chunks: "initial",
                minSize: 50000,
                minChunks: 1,
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
        }
    });

    return webpackConfig;
}