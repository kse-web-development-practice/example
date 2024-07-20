/* eslint-disable no-undef */

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const dotenv = require('dotenv')

const localEnv = dotenv.config().parsed

module.exports = (env) => {
  return {
    entry: './src/index.js',
    mode: env.dev === true ? 'development' : 'production',
    output: {
      filename: '[name]-[fullhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: process.env.BASE_URL ?? '/',
      clean: true
    },
    module: {
      rules: [
        {
          test: /.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                esModule: false,
                modules: {
                  localIdentName: '[local]--[name]--[hash:base64:5]'
                }
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        publicUrl: process.env.BASE_URL ?? '/'
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public/assets/favicon.ico', to: 'favicon.ico' },
          { from: 'public/assets/192.png', to: '192.png' },
          { from: 'public/assets/512.png', to: '512.png' },
          { from: 'public/assets/screenshot1.png', to: 'screenshot1.png' },
          { from: 'public/assets/screenshot2.png', to: 'screenshot2.png' },
          { from: 'public/manifest.json', to: 'manifest.json' },
          { from: 'public/worker.js', to: 'worker.js' }
        ]
      }),
      new ESLintPlugin({
        exclude: ['node_modules', 'dist'],
        context: path.resolve(__dirname, 'src'),
        emitWarning: env.dev !== true,
        emitError: env.dev !== true
      }),
      new webpack.DefinePlugin({
        'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
        'process.env.MAP_KEY': localEnv.MAP_KEY
          ? JSON.stringify(localEnv.MAP_KEY)
          : JSON.stringify(process.env.MAP_KEY),
        'process.env.API_KEY': localEnv.API_KEY
          ? JSON.stringify(localEnv.API_KEY)
          : JSON.stringify(process.env.API_KEY)
      })
    ],
    devtool: env.dev ? 'eval-source-map' : 'source-map',
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      compress: false,
      port: 3000,
      historyApiFallback: true
    }
  }
}
