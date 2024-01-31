import { Borrower_log } from "../logging/borrower.log";
import { Contract_log } from "../logging/contract.log";
import { Employee_log } from "../logging/employee.log";
import { Lender_log } from "../logging/lender.log";
import { LoanPackage_log } from "../logging/loanpackage.log";
import { Login_log } from "../logging/login.log";
import { Schedule_log } from "../logging/schedule.log";
import { configReq } from "../utils/configReq"
const winston = require('winston');
const root = '/api/v1'
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

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
            onProxyRes: new Borrower_log().createLog,
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
            max: 10
        },
        proxy: {
            target: "http://localhost:3002/api/v1/schedule",
            changeOrigin: true,
            pathRewrite: {
                [`^${root}/worker/schedule`]: '',
            },
            onProxyReq: configReq,
            onProxyRes: new Schedule_log().createLog,
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
            onProxyRes: new Contract_log().createLog,
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
            onProxyRes: new Employee_log().createLog,
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
            onProxyRes: new LoanPackage_log().createLog,
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
            onProxyRes: new Lender_log().createLog,
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
            onProxyRes: new Login_log().createLog,
        }
    }
    
]
