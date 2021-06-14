const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  module: {
    rules: [
      // {test: /\.(js)$/, use: 'babel-loader'},
      {test: /\.(css)$/, use: ['style-loader', 'css-loader']}
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "index_bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html"
    })
  ],
  mode: "development"
}
