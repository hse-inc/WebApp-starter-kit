import path from 'path';
var webpack = require('webpack');
import HtmlWebpackPlugin from 'html-webpack-plugin';
var postcssAssets = require('postcss-assets');
var postcssNext = require('postcss-cssnext');
var stylelint = require('stylelint');
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

export default {
  devtool: 'inline-source-map',
  //noInfo: false,

  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
    modules: [path.resolve(__dirname), 'node_modules', 'src'],
  },

  entry: {
    app: [
      //'webpack-hot-middleware/client?reload=true',
      './src/index.tsx'
    ]
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    //path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    pathinfo: true
  },
  plugins: [
    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),
    new CheckerPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        tslint: {
          failOnHint: true
        },
        postcss: function () {
          return [
            stylelint({
              files: path.resolve(__dirname, 'src/**/*.css')
            }),
            postcssNext(),
            postcssAssets({
              relative: true
            }),
          ];
        },
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.tsx?$/,
      //   exclude: /node_modules/,
      //   loader: 'tslint-loader'
      // },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot-loader!awesome-typescript-loader'
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: path.resolve('./src'),
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },

      {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader?name=fonts/[hash].[ext]'
      },
      {
        test: /\.(woff|woff2)(\?.*)?$/,
        loader: 'file-loader?name=fonts/[hash].[ext]'
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]'
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'url-loader?limit=1000&name=images/[hash].[ext]'
      }
    ]
  }
}
