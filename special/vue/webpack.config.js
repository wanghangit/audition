const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require("fs");
const VueLoaderPlugin = require('vue-loader/lib/plugin');


const dirname = path.resolve(__dirname, "./src/pages");

const fileNames = fs.readdirSync(dirname, "utf-8");
const entrys = {};
const pages = []
fileNames.forEach(file => {
  const item = file.replace(".js", "")
  entrys[item] = path.join(dirname, "/" + file);
  pages.push(
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: item+'.html',
      chunks: [item]
    })
  )
});

module.exports = {
  entry: entrys,
  resolve: {
    extensions: ['.vue', '.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    library: '[name]'
  },
  devServer: {
    port: 8000,
  },
  mode: 'development',
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/
      },{
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ].concat(pages)
};
