const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const pfDir = path.dirname(
  require.resolve("@patternfly/patternfly/package.json")
);

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/builder/entry.tsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "uiBuilder"),
    libraryTarget: "umd",
    library: "patternfly-builder",
  },
  externals: {
    vscode: "commonjs vscode",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    fallback: {
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      path: require.resolve("path-browserify"),
      crypto: require.resolve("crypto-browserify"),
      zlib: require.resolve("browserify-zlib"),
      assert: require.resolve("assert/"),
      fs: false,
    },
  },
  devServer: {
    port: 8085,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {},
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.css$/i,
        oneOf: [
          {
            include: /\/monaco-editor\//,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            use: "null-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      // {
      //   test: /\.(png|jpe?g|webp|gif|svg)$/,
      //   loader: "null-loader"
      // },
      // {
      //   test: /.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: "null-loader"
      // },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({ template: "src/builder/index.html" }),
    new CopyPlugin({
      patterns: [
        { from: path.join(pfDir, "patternfly.css"), to: "" },
        { from: path.join(pfDir, "patternfly-addons.css"), to: "" },
        { from: path.join(pfDir, "assets"), to: "assets" },
        { from: path.join(__dirname, "src/builder/styles.css"), to: "" },
      ],
    }),
    new MonacoWebpackPlugin({
      languages: ["javascript", "typescript", "html", "xml"],
    }),
    new MiniCssExtractPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ],
  // performance: {
  //   hints: false,
  // },
};
