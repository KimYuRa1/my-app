//22. CORS 이슈, proxy 설정
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:7100',
            changeOrigin: true,
        })
    );
};