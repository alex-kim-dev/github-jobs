const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const paths = require('./paths');
const common = require('./webpack.common.js');

const { url, baseurl } = require('@frontend/site-meta');

module.exports = merge(common, {
  mode: 'production',

  target: 'browserslist',

  devtool: 'source-map',

  output: {
    path: paths.build,
    filename: 'js/[name].[contenthash].bundle.js',
    publicPath: `${url}${baseurl}/github-jobs`,
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
