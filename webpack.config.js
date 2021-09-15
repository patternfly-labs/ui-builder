const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');

const pfDir = path.dirname(require.resolve('@patternfly/patternfly/package.json'));

module.exports = {
  entry: {
    uiBuilder: "./src/view/app/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "uiBuilder"),
    filename: "[name].js"
  },
  devtool: "source-map",
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
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
        test: /\.(png|jpe?g|webp|gif|svg)$/,
        loader: "null-loader"
      },
      {
        test: /.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "null-loader"
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.join(pfDir, 'patternfly.css'), to: '' },
        { from: path.join(pfDir, 'patternfly-addons.css'), to: '' },
        { from: path.join(pfDir, 'assets'), to: 'assets' },
      ],
    })
  ]
  // performance: {
  //   hints: false,
  // },
};
