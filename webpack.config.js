const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const env = process.env.NODE_ENV || 'development'

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})

const webpackConfig = {
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    './client/index.js',
  ],
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { 
        test: /(\.js$|\.jsx$)/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ],
        include: [/flexboxgrid/, /semantic-ui-css/]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" }, 
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /(\.ttf|\.eot|\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?)$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
    }),
  ],
}

if (env === 'production') {
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
    })
  )
}

webpackConfig.devServer = {
  historyApiFallback: true,
  proxy: {
    "/api": "http://localhost:8081"
  }
}

module.exports = webpackConfig