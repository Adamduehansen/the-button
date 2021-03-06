/* global __dirname */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const projectRoot = path.resolve(__dirname, "..");

module.exports = {
  entry: path.resolve(projectRoot, "client/index.tsx"),
  output: {
    path: path.resolve(projectRoot, "wwwroot"),
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [{ 
      test: /\.tsx?$/, 
      loader: "awesome-typescript-loader" 
    }, { 
      enforce: "pre", 
      test: /\.js$/, 
      loader: "source-map-loader" 
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(projectRoot, "client/index.html"),
      title: "index.html"
    })
  ]
};