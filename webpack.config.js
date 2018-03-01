
let path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "bundle.js"
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.(png|jpg|gif|svg)$/, use: 'file-loader'}
    ]
  }
}