const path = require("path");
const webpack = require("webpack");

const merge = require("webpack-merge");
const baseConfig = require("./webpack.config");

module.exports = merge(baseConfig, {
  mode: "development",
  entry: ["webpack-hot-middleware/client?reload=true"],
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(s[ca]ss|css)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              localIdentName: "[name]__[local]__[hash:base64:5]",
              modules: true,
            },
          },
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
});
