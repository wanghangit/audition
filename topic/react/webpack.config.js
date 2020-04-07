const path = require("path")
const HtmlWebpackplugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    "index": path.resolve(__dirname, "./src/index.js")
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ['babel-loader']
      }
    ]
  },
  plugins:[
    new HtmlWebpackplugin({
      template: path.relative(__dirname, 'index.html')
    })
  ],
  mode: 'development',
  devtool: 'cheap-source-map'
}