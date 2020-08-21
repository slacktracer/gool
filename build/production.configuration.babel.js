import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpackMerge from "webpack-merge";

import { baseConfiguration } from "./base.configuration";

const productionConfiguration = {
  devtool: "source-map",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      chunkFilename: "[name].[contenthash].css",
      filename: "[name].[contenthash].css",
    }),
  ],
};

export default webpackMerge(baseConfiguration, productionConfiguration);
