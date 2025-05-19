const PROXY_CONFIG = {
  '/tabelle/**': {
    'target': 'http://localhost:8080',
//  'target': 'http://be-hostname:8080',
    'secure': false,
    'changeOrigin': true,
    'ws': true,
    'logLevel': 'debug',
  },
};

module.exports = PROXY_CONFIG;
