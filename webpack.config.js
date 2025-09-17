const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: '/src/index.js',
  output: {
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.json'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/dist/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: __dirname + '/dist',
    },
    compress: true,
    port: 3000,
  },
}
