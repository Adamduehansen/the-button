/* global __dirname */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const projectRoot = path.resolve(__dirname, "..");

module.exports = {
  entry: path.resolve(projectRoot, "client/index.ts"),
  output: {
    path: path.resolve(projectRoot, "wwwroot"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [{ 
      test: /\.tsx?$/, 
      loader: "ts-loader" 
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(projectRoot, "client/index.html"),
      title: "index.html"
    })
  ]
};