const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const baseConfig = require("./webpack.base")
const path = require("path");
const { entrys } = require('./config')

const copyEntry = Object.assign({}, entrys)
for (const key in copyEntry) {
  if (copyEntry.hasOwnProperty(key)) {
    const element = copyEntry[key];
    copyEntry[key] = ['react-hot-loader/patch', copyEntry[key]]
  }
}
console.log(copyEntry)
module.exports = webpackMerge(baseConfig, {
  mode: "development",
  entry: copyEntry,
  devServer: {
    port: 8000,
    open: true,
    contentBase: path.resolve(__dirname, "../dist"),
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "../src"),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',  // jsx支持
                ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 2 }] // 按需使用polyfill
              ],
              cacheDirectory: true, // 加快编译速度
              plugins: ['react-hot-loader/babel', "@babel/plugin-transform-arrow-functions", "@babel/plugin-proposal-class-properties"],
            }
          },
        ]
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
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
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
})
