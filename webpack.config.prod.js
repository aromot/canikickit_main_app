const { getConfig } = require('./webpack.common');

module.exports = env => {

  env = env || {};
  console.log('env=', env);

  return getConfig('main_app', 'prod');
};