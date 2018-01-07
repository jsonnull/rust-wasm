const { resolve } = require('path')

const config = {
  entry: ['@babel/polyfill', './src/index.js'],
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/\/node_modules\//],
        use: 'babel-loader'
      },
      {
        test: /\.rs$/,
        use: [
          {
            loader: 'wasm-loader'
          },
          {
            loader: 'rust-native-wasm-loader',
            options: {
              release: true,
              gc: true
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
