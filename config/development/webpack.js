const common = require('../webpack.common.js');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, '../../build'),
    compress: true,
    historyApiFallback: true,
    port: 5000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/development/'
              }
            }
          }
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ options: {
      filename: 'styles.css',
      chunkFilename: 'styles.css'
    }}),
  ],
});
