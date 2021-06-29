const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { title, description, author } = require('../siteMeta');

const paths = require('./paths');

module.exports = {
  entry: [path.join(paths.src, 'index.jsx')],

  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.static,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store', '**/mockServiceWorker.js', '**/favicon*'],
          },
          noErrorOnMissing: true,
        },
        {
          from: path.join(paths.static, 'mockServiceWorker.js'),
          to: '.',
        },
      ],
    }),

    new HtmlWebpackPlugin({
      title,
      meta: { description, author },
      favicon: path.join(__dirname, '..', 'static', 'favicon-32x32.png'),
      template: path.join(paths.src, 'template.html'),
      filename: 'index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        resolve: { extensions: ['.js', '.jsx'] },
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        exclude: path.resolve(__dirname, '../src/assets/icons'),
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, '../src/assets/icons'),
        use: ['@svgr/webpack'],
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
    },
    extensions: ['.js', '.jsx'],
  },
};
