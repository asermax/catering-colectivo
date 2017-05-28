const { resolve }  = require('path');

module.exports = function(env) {
  return {
    entry: resolve(__dirname, 'src', 'server.js'),
    target: 'node',
    output: {
      filename: 'bundle.js',
      path: resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            'babel-loader'
          ],
          exclude: /node_modules/
        }
      ]
    }
  }
}
