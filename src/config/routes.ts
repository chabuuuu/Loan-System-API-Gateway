const root = '/api/v1'
const {fixRequestBody } = require('http-proxy-middleware');
export const ROUTES = [
    {
        url: `${root}/borrower`,
        auth: true,
        methodCheck: true,
        methodAllow: {
            "Admin": ["GET", "POST", "PUT", "DELETE"],
            "Employee": ["GET", "POST", "PUT", "DELETE"],
            "Borrower": ["GET", "POST", "PUT", "DELETE"],
            "other": ["GET"],
        },
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3001/api/v1/borrower",
            changeOrigin: true,
            pathRewrite: {
                [`^${root}/login`]: '',
            },
            onProxyReq: fixRequestBody,
        }
    },
    {
        url: `${root}/employees`,
        auth: true,
        methodCheck: true,
        methodAllow: {
            "Admin": ["GET", "POST", "PUT", "DELETE"],
            "Employee": ["GET", "POST", "PUT", "DELETE"],
            "other": ["GET"],
        },
        proxy: {
            target: "http://localhost:3001/api/v1/employees",
            changeOrigin: true,
            pathRewrite: {
                [`^${root}/employees`]: '',
            },
            onProxyReq: fixRequestBody,
        }
    },
    {
        url: `${root}/login`,
        auth: false,
        methodCheck: true,
        methodAllow: {
            "other": ["POST"],
        },
        proxy: {
            target: "http://localhost:3001/api/v1/authenticaion/login",
            changeOrigin: false,
            pathRewrite: {
                [`^${root}/login`]: '',
            },
            onProxyReq: fixRequestBody,
        }
    }
]
