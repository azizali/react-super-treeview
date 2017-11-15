const path = require('path');
const nodeExternals = require("webpack-node-externals");

module.exports = {
    target: 'node',
    module: {
    loaders: [
      {
        test: /\.js$/,
        include: /src/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpg|gif|woff|ico|woff2|svg|css|sass|scss|less|styl)$/,
        loader: "null-loader"
      }
    ]
  },
  externals: [nodeExternals()]
};
