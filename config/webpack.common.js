/* global __dirname */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const projectRoot = path.resolve(__dirname, "..");

module.exports = {
  entry: path.resolve(projectRoot, "client/index"),
  output: {
    path: path.resolve(projectRoot, "wwwroot"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(projectRoot, "client/index.html"),
      title: "index.html"
    })
  ]
};