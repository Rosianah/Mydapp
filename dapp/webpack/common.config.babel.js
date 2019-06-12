import '@babel/polyfill' //gives webpack basic funtionality
import path               from 'path'
import merge              from 'webpack-merge'
import development        from './dev.config.babel'
import production         from './prod.config.babel'

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build')
};

process.env.BABEL_ENV = TARGET;

//webpack entry- defines files where the dependency traversal graph begins
const common = {
  entry: [
    PATHS.app
  ],

  //where teh outpit goes
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.scss'],
    modules: ['node_modules', PATHS.app, PATHS.build]
  },

  //loaders - tranform files intp modules which webpack can make sense of and give final output
  //whenever .js file is opened call babel loader, whic allows support of the latest version of js
  module: {
    rules: [{
      test: /\.js$/,
      loaders: ['babel-loader'], //js loader
      exclude: /node_modules/
    },
    {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
      loader: 'file-loader' //image loader
    }]
  }

};

//detects what command is entered

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(development, common);
}

if (TARGET === 'build' || !TARGET) {
  module.exports = merge(production, common);
}
