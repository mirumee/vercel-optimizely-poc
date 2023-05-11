const path = require("path");
const webpack = require("webpack");
const { config } = require("dotenv");
const CopyPlugin = require("copy-webpack-plugin");

const envs = {
  ...config({ path: path.resolve(__dirname, "../.env.local") }).parsed,
};

const dist = path.resolve(__dirname, "out");

module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  devtool: false,
  externals: ["log", "http-request", "cookies"],
  resolve: {
    aliasFields: ["browser"],
    extensions: [".tsx", ".ts", ".js"],
  },
  experiments: { outputModule: true },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: dist,
    filename: "main.js",
    library: {
      type: "module",
    },
  },

  plugins: [
    new webpack.EnvironmentPlugin(envs),
    new CopyPlugin({
      patterns: [{ from: "bundle.json", to: dist }],
    }),
  ],
};
