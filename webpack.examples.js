'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const examplesFolder = './src-examples/';

module.exports = {
    entry: examplesFolder+'index.js',
    output: {
        path: path.resolve(__dirname, 'examples'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src-examples'),
                loaders: ['babel-loader'],
            },
            {
                test: /\.s?css/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: examplesFolder+'index.html' })
    ]
}
