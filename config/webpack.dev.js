const webpack = require('webpack');
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshBabelPlugin = require('react-refresh/babel');

const paths = require('./paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',

  target: 'web',

  devtool: 'eval-cheap-module-source-map',

  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    compress: true,
    hot: true,
    port: 8080,
    stats: 'minimal',
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
