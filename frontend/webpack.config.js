/* globals require, module, __dirname */
const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function() {
  return {
    entry: {
      app: [
        'babel-polyfill',
        'react-hot-loader/patch',
        'bulma/bulma.sass',
        'font-awesome/scss/font-awesome.scss',
        './src/patches/react-contenteditable-patch.js',
        './src/patches/moment-locale-patch.js',
        './src/index.jsx',
      ],
    },

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },

    devtool: 'inline-source-map',

    devServer: {
      hotOnly: true,
      contentBase: path.resolve(__dirname, 'src'),
      historyApiFallback: true,
      host: '0.0.0.0',
      disableHostCheck: true,
      port: '80',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            'babel-loader',
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.s?[ca]ss$/,
          include: /node_modules/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.s?[ca]ss$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                localIdentName: '[local]--[hash:base64]',
              },
            },
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: 'url-loader',
        },
        {
          test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
          use: 'file-loader',
        },
      ],
    },

    resolve: {
      modules: [
        path.resolve(__dirname, 'src'),
        'node_modules',
      ],
      extensions: [ '.js', '.jsx' ],
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks(module) {
         return module.context && module.context.indexOf('node_modules') !== -1
        },
      }),
      new CopyWebpackPlugin([
        { from: path.resolve(__dirname, 'src', 'index.html') },
      ]),
    ],
  }
}
