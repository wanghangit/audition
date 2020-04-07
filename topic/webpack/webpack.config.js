const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin")

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    main: './src/main.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, './build')
  },
  module: {
    rules: [{
      test: /\.(jpg|png|gif|jpeg|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 102400,
          name: '[name].[ext]',
          outputPath: path.resolve(__dirname, "./imgs")
        }
      }]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true // 开启css模块化
          }
        }
      ]
    }, {
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true // 开启css模块化
          }
        },
        'postcss-loader',
        'less-loader'
      ]
    }]
  },
  devServer: {
    hot: true // 开启热更新
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack title',
      template: path.resolve(__dirname, './index.html'),
      favicon: path.resolve(__dirname, './favicon.ico')
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}