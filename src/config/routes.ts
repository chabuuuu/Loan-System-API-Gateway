const root = '/api/v1'
const {fixRequestBody } = require('http-proxy-middleware');
export const ROUTES = [
    {
        url: `${root}/borrower`,
        auth: {
            "POST": false,
            "default": true
        },
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
                [`^${root}/borrower`]: '',
            },
            onProxyReq: fixRequestBody,
        }
    },
    {
        url: `${root}/contract`,
        auth: {
            "default": true
        },
        methodCheck: true,
        methodAllow: {
            "Admin": ["GET", "POST", "PUT", "DELETE"],
            "Employee": ["GET", "POST", "PUT", "DELETE"],
            "Borrower": ["GET", "POST"],
            "Lender": ["GET", "POST", "PUT"],
            "other": ["GET"],
        },
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: false
    },
    {
        url: `${root}/employees`,
        auth: {
            "POST": false,
            "default": true
        },
        methodCheck: true,
        methodAllow: {
            "Admin": ["GET", "POST", "PUT", "DELETE"],
            "Employee": ["GET", "POST", "PUT", "DELETE"],
            "other": ["GET"],
        },
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
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
        auth: {
            "default": false
        },
        methodCheck: true,
        methodAllow: {
            "other": ["POST"],
        },
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
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
