var path = require('path');
var SRC_DIR = path.join(__dirname, '/web/client/src');
var DIST_DIR = path.join(__dirname, '/web/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./web/client'),
      'node_modules'
    ]
  }
  // watch: true
};
