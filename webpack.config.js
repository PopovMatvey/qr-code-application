const webpack = require('webpack');
const path = require('path');

const config = {
  entry: ['react-hot-loader/patch', './js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {   
        exclude: /node_modules/,
        test: /\.css$/,
        use: ['style-loader','css-loader'],
      },
      {
        exclude: /node_modules/,
        test: /\.jpg$/,
        use: ['file-loader'],
      },
      {
        exclude: /node_modules/,
        test: /\.jpeg$/,
        use: ['file-loader'],
      },
      {
        exclude: /node_modules/,
        test: /\.png$/,
        use: ['file-loader'],
      }
    ],
  },
  // target: 'node',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    port: 5000,
    onAfterSetupMiddleware: function (devServer) {
      devServer.app.post('*', (req, res) => {
        res.redirect(req.originalUrl);
      });
    },
    static: {
      directory: './dist',
    },
  },
};

module.exports = config;
