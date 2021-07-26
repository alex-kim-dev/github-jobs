const { merge } = require('webpack-merge');

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
});
