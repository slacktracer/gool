import webpackMerge from "webpack-merge";

import { baseConfiguration } from "./base.configuration";

const developmentConfiguration = {
  devServer: {
    historyApiFallback: true,
    host: "0.0.0.0",
    port: process.env.PORT,
  },
  devtool: "inline-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
};

export default webpackMerge(baseConfiguration, developmentConfiguration);
