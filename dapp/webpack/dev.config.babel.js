import webpack            from 'webpack'
import path               from 'path'
import HtmlWebpackPlugin  from 'html-webpack-plugin'
import precss             from  'precss'
import autoprefixer       from 'autoprefixer'

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: ''
  },

  devServer: {
    stats: 'errors-only', // Display only errors to reduce the amount of output.
    host: process.env.HOST, // Defaults to `localhost`
    port: '3000', // Defaults to 8080
    open: true, // Open the page in browser
    historyApiFallback: true
  },

  module: {
    noParse: [new RegExp('node_modules/localforage/dist/localforage.js')],
    rules: [{
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            localIdentName: '[hash:base64:5][path]-[local]'
          }
        },
        { loader: 'resolve-url-loader' },
        {
          loader: 'sass-loader', //allows to automatically sass configuration variables
          options: {
            sourceMap: true,
            data: '@import "config-styles.scss";',
            includePaths: [
              path.join(__dirname, '..', '/src/configs/theme')
            ]
          }
        }
      ]
    }]
  },

  // inject js output t index.html
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
      __DEVELOPMENT__: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html' 
    })
  ]
};
