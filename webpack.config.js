const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'), //源文件目录
    entry: {
        app: "./index.js", //在源文件目录下去找index.js 文件作为打包的入口文件
        vendor: [
            'lodash',
            'react'
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "src"),
        compress: true,
        port: 9000,
        hot: true,
        proxy: {}
    },
    plugins: [
        new UglifyJSPlugin(),
        new CleanWebpackPlugin(['app']),
        new HtmlWebpackPlugin({
            title: 'React',
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
        }),
        new webpack.HashedModuleIdsPlugin(),
        //提取模板
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })

        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server',
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: 8888,
        //     reportFilename: 'report.html',
        //     defaultSizes: 'parsed',
        //     openAnalyzer: true,
        //     generateStatsFile: false,
        //     statsFilename: 'stats.json',
        //     logLevel: 'info'
        // })

    ],
    output: {
        path: path.resolve(__dirname, 'app'), //生成的文件存放目录
        filename: "[name].[hash].js" //chunk就是模块,chunkhash也就是根据模块内容计算出的hash值。

        // chunkFilename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            'Components': path.resolve(__dirname, './src/components'),
            'Lesson': path.resolve(__dirname, './src/components/lesson')
        }
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ["react", "es2015"]
                    }
                }],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }

        ]
    }
}