const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: '/ts-src/index.ts',
  output: {
    path: __dirname + '/ts-dist',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/dist/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    static: {
      directory: __dirname + '/ts-dist',
    },
    compress: true,
    port: 3000,
  },
}
