import { configReq } from "../utils/configReq"

const root = '/api/v1'


export const ROUTES = [
    {
        url: `${root}/borrower`,
        auth: {
            //"POST": false,
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
            onProxyReq: configReq,
        }
    },
    {
        url: `${root}/worker/schedule`,
        auth: {
            "default": true
        },
        methodCheck: true,
        methodAllow: {
            "Admin": ["GET", "POST", "PUT", "DELETE"],
            "other": [""],
        },
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3002/api/v1/schedule",
            changeOrigin: true,
            pathRewrite: {
                [`^${root}/worker/schedule`]: '',
            },
            onProxyReq: configReq,
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
            "other": ["GET"],
        },
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        //proxy: false
        proxy: {
            target: "http://localhost:3001/api/v1/contract",
            changeOrigin: true,
            pathRewrite: {
                [`^${root}/contract`]: '',
            },
            onProxyReq:  configReq,
        }
    },
    {
        url: `${root}/employees`,
        auth: {
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
            onProxyReq: configReq,
        }
    },
    {
        url: `${root}/loanpackage`,
        auth: {
            "GET": false,
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
            target: "http://localhost:3001/api/v1/loanpackage",
            changeOrigin: true,
            pathRewrite: {
                [`^${root}/loanpackage`]: '',
            },
            onProxyReq: configReq,
        }
    },
    {
        url: `${root}/lender`,
        auth: {
            "GET": false,
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
            target: "http://localhost:3001/api/v1/lender",
            changeOrigin: true,
            pathRewrite: {
                [`^${root}/lender`]: '',
            },
            onProxyReq: configReq,
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
            onProxyReq: configReq,
        }
    }
]
