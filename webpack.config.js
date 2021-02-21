const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

var javascriptEntryPath = path.resolve(__dirname, "src", "index.js");
var buildPath = path.resolve(__dirname, "dist");

module.exports = {
  entry: ["react-hot-loader/patch", javascriptEntryPath],
  output: {
    path: buildPath,
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js?|jsx)$/,
        exclude: /(node_modules|bower_component)/,
        loader: "babel-loader",
      },
      {
        test: /\.svg$/,
        use: [
          "babel-loader",
          {
            loader: "react-svg-loader",
            query: {
              svgo: {
                plugins: [{ cleanUpIDs: false }],
              },
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      {
        test: /\.(otf|eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[hash:6].[ext]",
            },
          },
        ],
      },
      {
        test: /\.ico$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new CompressionPlugin({
      test: /\.(js?|jsx|svg|gif|png|jpe?g|otf|eot|woff|woff2|ttf|ico)$/,
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
};
