const path = require("path");
const argv = require('yargs').argv;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackMerge = require('webpack-merge');
const { pages } = require('./config')

const base = {
  plugins: []
}

if(argv.report){
  base.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: path.resolve(__dirname, "../report.html")
  }));
}
module.exports = webpackMerge(base, {
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
  },
  resolve: {
    extensions: ['.js', '.jsx','.less']
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
              plugins: ["@babel/plugin-proposal-class-properties"],
              cacheDirectory: true // 加快编译速度
            },
            
          },
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10240, // 小于大小限制的图片转为base64
          },
        },
      },
    ],
  },
  plugins: pages
});
