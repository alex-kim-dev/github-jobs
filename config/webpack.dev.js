const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshBabelPlugin = require('react-refresh/babel');

const paths = require('./paths');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  target: 'web',

  devtool: 'eval-source-map',

  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    compress: true,
    hot: true,
    port: 8080,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: { plugins: [ReactRefreshBabelPlugin] },
        },
      },
    ],
  },
});
