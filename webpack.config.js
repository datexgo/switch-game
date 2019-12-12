
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'
      },
      {
        test: /\.css$/, use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(ttf|eot|woff|woff2|png|jpg|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ]
  }
}
