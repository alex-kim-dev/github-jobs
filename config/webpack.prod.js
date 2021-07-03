const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const { url, baseurl } = require('../src/siteMeta');

const paths = require('./paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',

  target: 'browserslist',

  devtool: 'source-map',

  output: {
    path: paths.build,
    filename: 'js/[name].[contenthash].bundle.js',
    publicPath: `${url}${baseurl}`,
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
        },
      }),
    ],
    runtimeChunk: {
      name: 'runtime',
    },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  resolve: {
    alias: {
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
  },
});
