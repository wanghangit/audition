const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path")
const fs = require("fs")

const dirname = path.resolve(__dirname, "./test/pages");

const fileNames = fs.readdirSync(dirname, "utf-8");
const entrys = {};
const pages = []
fileNames.forEach(file => {
  const item = file.replace(".js", "")
  entrys[item] = path.join(dirname, "/" + file);
  pages.push(
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./test/index.html"),
      filename: item+'.html',
      chunk: [item]
    })
  )
});
module.exports = {
  entry: entrys,
  output: {
    filename: "app.js"
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "types": path.resolve(__dirname, "./src/types")
    }
  },
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /.tsx?$/i,
        use: [
          {
            loader: "ts-loader"
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins:pages
};
