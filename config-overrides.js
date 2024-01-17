const path = require('path');
const { addWebpackAlias } = require('customize-cra');

module.exports = function override(config) {
  return addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  })(config);
};
