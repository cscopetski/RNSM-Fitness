const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/Client/index.js',
    output: {
        filename: 'index.bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'build'),
    },
    performance: {
        hints: false
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify({
                BACKEND_ADDRESS: process.env.BACKEND_ADDRESS,
                AXIOS_BASE_URL: process.env.AXIOS_BASE_URL,
                CLOUDFRONT_URL: process.env.CLOUDFRONT_URL
            })
        })
    ],
    resolve: {
        extensions: ['.jsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(js)x?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource'
            },
        ]
    }
}