const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'webcomp-boilerplate.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
