const path = require("path");
const fs= require('fs')
const HtmlWebpackPlugin = require("html-webpack-plugin");

const dirname = path.resolve(__dirname, "../src/pages");

const fileNames = fs.readdirSync(dirname, "utf-8");
const entrys = {};
const pages = []
console.log(fileNames)
fileNames.forEach(file => {
  const item = file.replace(".js", "")
  entrys[item] = path.join(dirname, "/" + file);
  console.log(item)
  pages.push(
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      filename: item+'.html',
      chunks: [item],
    })
  )
});

module.exports = {
  entrys,
  pages
}