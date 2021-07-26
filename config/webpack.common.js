const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { title, description, author } = require('../src/siteMeta');

const paths = require('./paths');

module.exports = {
  entry: {
    main: path.join(paths.src, 'index.jsx'),
  },

  output: {
    clean: true,
    hashDigestLength: 10,
  },

  plugins: [
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
    }),
  ],

  module: {
    generator: {
      'asset/resource': {
        filename: 'assets/[hash][ext][query]',
      },
    },

    rules: [
      {
        test: /\.jsx?$/,
        include: paths.src,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ico|gif|png|jpe?g|svg)$/,
        exclude: path.join(paths.src, 'assets', 'icons'),
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        include: path.join(paths.src, 'assets', 'icons'),
        use: '@svgr/webpack',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ],
  },

  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@services': path.resolve(__dirname, '../src/services'),
      '@store': path.resolve(__dirname, '../src/store'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@constants': path.resolve(__dirname, '../src/utils/constants'),
      '@helpers': path.resolve(__dirname, '../src/utils/helpers'),
      '@hooks': path.resolve(__dirname, '../src/utils/hooks'),
      '@views': path.resolve(__dirname, '../src/views'),
    },
    extensions: ['.js', '.jsx'],
  },
};
