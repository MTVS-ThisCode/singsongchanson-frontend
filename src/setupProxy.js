const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://13.209.8.180:8080',
      changeOrigin: true,
    }),
  );
};
