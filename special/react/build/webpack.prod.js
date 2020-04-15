const path = require("path");
const webpackMerge = require("webpack-merge")
const baseConfig = require("./webpack.base")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { entrys, pages} = require('./config')

const copyEntry = Object.assign({}, entrys)
// for (const key in copyEntry) {
//   if (copyEntry.hasOwnProperty(key)) {
//     const element = copyEntry[key];
//     copyEntry[key] = ['react-hot-loader/patch', copyEntry[key]]
//   }
// }
copyEntry.vendor = ['react', 'react-dom']
module.exports = webpackMerge.smart(baseConfig, {
  entry: copyEntry,
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader, // 注意书写的顺序
          {
            loader: 'css-loader',
            options: {
              modules: false // 如果要启用css modules，改为true即可
            }
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: { javascriptEnabled: true }
          }
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
      // chunkFilename: '[name].[contenthash:8].chunk.css'
    }),
  ].concat(pages),
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      maxInitialRequests: 5,
      cacheGroups: {
        // 提取公共模块
        commons: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'common'
        }
      }
    }
  }
})
