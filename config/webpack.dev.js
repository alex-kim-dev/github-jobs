const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshBabelPlugin = require('react-refresh/babel');

const paths = require('./paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',

  target: 'browserslist:development',

  devtool: 'eval-cheap-module-source-map',

  stats: 'minimal',

  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  devServer: {
    client: {
      logging: 'warn',
    },
    hot: true,
    historyApiFallback: true,
  },

  plugins: [new ReactRefreshWebpackPlugin()],

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
