import express from 'express';
import { requestMethodCheck } from './config/requestMethod';
import BaseError from './utils/baseError';
const morgan = require("morgan");
import 'dotenv/config'
import { LoanContractRabbitMQ } from './rabbitmq/LoanContract/LoanContract.rabbitmq';
import { route } from './routes';
import { HTTPStatusMessage } from './utils/http-status-code';
import helmet from 'helmet';
import { setupRateLimit } from '@/config/ratelimit';
import { GATEWAY_CONFIG } from '@/config/routes';
import { extractJWT } from '@/utils/jwt';
const loanContractRabbitMQ  = new LoanContractRabbitMQ();
import { BaseLog } from '@/logging/BaseLog';
const logger = new BaseLog();
var cors = require('cors')
const app = express();
const port = 3000;
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
GATEWAY_CONFIG.forEach((config: any) => {
    setupRateLimit(app, config);
    requestMethodCheck(app, config);
})

route(app);
app.use((error: any, req: any, res: any, next: any) => {
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

//config

//rabbitmqRoute(app);
// setupProxies(app, ROUTES);
// setupErrorHandle(app, ROUTES)
//app.post('/api/v1/contract', loanContractRabbitMQ.createLoanContract);
app.all('*', (req: any, res: any, next: any) => {
    const status = 'fail';
    const statusCode = 404;
    const err = new BaseError(statusCode, status, 'URL Not Valid');
    next(err);
});
app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});