var webpack = require("webpack");
var path = require("path");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var OfflinePlugin = require("offline-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "docs"),
    filename: "bundle.js",
    publicPath: "/todo-icon/"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      include: __dirname,
      query: {
        presets: ["es2015", "react"]
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify("production") }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    /*
    new CopyWebpackPlugin([
      { from: "manifest.json" }
    ]),
    */
    new HtmlWebpackPlugin({
      title: "name",
      template: "src/index.ejs"
    }),
    new HtmlWebpackPlugin({
      filename: "manifest.json",
      template: "manifest.json",
      chunks: []
    }),
    new OfflinePlugin()
  ]
};
