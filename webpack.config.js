const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    publicPath: '/',
    pathinfo: false,
  },
  optimization: {
    removeEmptyChunks: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'swc-loader',
        options: {
          parseMap: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        build: true,
        mode: 'write-references',
        memoryLimit: 4096,
      },
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devtool: 'source-map',
  devServer: {
    client: {
      overlay: false,
    },
  },
  performance: {
    hints: false,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
