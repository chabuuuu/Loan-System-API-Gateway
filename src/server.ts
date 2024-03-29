import express from 'express';
const morgan = require("morgan");
import 'dotenv/config'

import BaseError from './utils/baseError';
import { LoanContractRabbitMQ } from './rabbitmq/LoanContract/LoanContract.rabbitmq';
import { requestMethodCheck } from './config/requestMethod';
import { route } from './routes';
import { HTTPStatusMessage } from './utils/http-status-code';


import helmet from 'helmet';
import { setupRateLimit } from '@/config/ratelimit';
import { GATEWAY_CONFIG } from '@/config/routes';
const loanContractRabbitMQ  = new LoanContractRabbitMQ();
import { BaseLog } from '@/logging/BaseLog';
import { extractJWT } from '@/utils/jwt/jwt-extractor';
import { setJwtMicroservice } from '@/middleware/set-jwt-microservice';
import { AxiosError } from 'axios';
import { formatResponse } from '@/middleware/format-response.middleware';
const logger = new BaseLog();
var cors = require('cors')
const app = express();
const port = process.env.PORT || 3000 ;
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));
app.use(extractJWT)
app.use(setJwtMicroservice)
GATEWAY_CONFIG.forEach((config: any) => {
    setupRateLimit(app, config);
    requestMethodCheck(app, config);
})
//app.use(formatResponse)
route(app);
app.use((error: any, req: any, res: any, next: any) => {
    //console.log('Error:::', error);
    if (error instanceof AxiosError) {
        error = error.response!.data
    }
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    if (!error.message) {
        error.message = error;
    }
    console.log('This error' + error);
    
    logger.customLog(error.message, 'error');
    res.status(error.statusCode).json({
        statusCode: error.statusCode,
        status: error.status,
        message: error.message,
        httpErrorMessage: HTTPStatusMessage[error.statusCode as unknown as keyof typeof HTTPStatusMessage].message,
    });
});
app.all('*', (req: any, res: any, next: any) => {
    const status = 'fail';
    const statusCode = 404;
    const err = new BaseError(statusCode, status, 'URL Not Valid');
    next(err);
});
app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});