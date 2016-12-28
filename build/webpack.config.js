const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env={dev: true}) => {
  return {
    entry: {
      app: []
    },
    output: {
      filename: "[name].bundle.js",
      path: resolve(__dirname, "../assets"),
      publicPath: "http://localhost/"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: [
              "stage-3",
              ["latest", {modules: false}],
              "react"
            ],
            plugins: ["transform-runtime"]
          }
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader!postcss-loader",
          options: {
            minimize: true
          }
        },
        {
          test: /\.(jpg|jpeg|png|gif|swf|mp4)$/,
          loader: "file-loader"
        }
      ]
    },
    devtool: "source-map",
    resolve: {
      extensions: ['.js', '.jsx', '.css']
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        vue: {
          postcss: [require('autoprefixer')()]
        }
      }),
      new webpack.ProvidePlugin({
      })
    ]
  }
}
