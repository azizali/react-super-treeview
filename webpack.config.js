'use strict';

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config0 = {
    entry : {
        main: './src',
    },
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: 'dist/',
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'ExpandableTree',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: /src/,
                loaders: ['babel-loader'],
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ],

    externals: [
      nodeExternals({
        // load non-javascript files with extensions, presumably via loaders
        whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
      })
    ]
}

module.exports = config0;
