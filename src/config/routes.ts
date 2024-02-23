import { Borrower_log } from "../logging/borrower.log";
import { Contract_log } from "../logging/contract.log";
import { Employee_log } from "../logging/employee.log";
import { Lender_log } from "../logging/lender.log";
import { LoanPackage_log } from "../logging/loanpackage.log";
import { Login_log } from "../logging/login.log";
import { Schedule_log } from "../logging/schedule.log";
import { configReq } from "../utils/configReq"
const winston = require('winston');
const root = process.env.ROOT_URL || "/api/v1";
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
    },
    {
        url: `${root}/lender`,
        auth: {
            "GET": true,
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
    }
    
]
