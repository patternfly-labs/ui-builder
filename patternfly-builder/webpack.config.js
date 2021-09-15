const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pfDir = path.dirname(require.resolve('@patternfly/patternfly/package.json'));

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/entry.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devServer: {
    port: 8085
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: "style-loader",
      //     },
      //     {
      //       loader: "css-loader",
      //     },
      //   ],
      // },
      // {
      //   test: /\.(png|jpe?g|webp|gif|svg)$/,
      //   loader: "null-loader"
      // },
      // {
      //   test: /.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: "null-loader"
      // },
      {
        test: /\.css$/i,
        oneOf: [
          {
            include: /\/monaco-editor\//,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            use: 'null-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({ template: 'src/index.html' }),
    new CopyPlugin({
      patterns: [
        { from: path.join(pfDir, 'patternfly.css'), to: '' },
        { from: path.join(pfDir, 'patternfly-addons.css'), to: '' },
        { from: path.join(pfDir, 'assets'), to: 'assets' },
        { from: path.join(__dirname, 'src/styles.css'), to: '' },
      ],
    }),
    new MonacoWebpackPlugin({
      languages: ['javascript', 'typescript']
    }),
    new MiniCssExtractPlugin()
  ]
};
