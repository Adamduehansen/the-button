/* global process */
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");



const extractSass = new ExtractTextPlugin({
  filename: "[name].[hash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = merge(commonConfig, {
  output: {
    filename: "build.[contenthash].min.js"
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }],
        fallback: "style-loader"
      })
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new UglifyJsWebpackPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: true,
        output: {
          comments: false,
          beautify: false
        },
      }
    }),
    extractSass
  ]
});