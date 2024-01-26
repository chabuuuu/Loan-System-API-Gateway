const { createProxyMiddleware } = require('http-proxy-middleware');

export const setupProxies = (app: any, routes: any) => {
    routes.forEach((r: any) => 
    {
        if (r.proxy !== false){            
            app.use(r.url, createProxyMiddleware(r.proxy));
        }
    })
}
