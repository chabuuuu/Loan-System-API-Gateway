import express from 'express';
import { ROUTES } from './config/routes';
import { setupProxies } from './config/proxy';
import { setupRateLimit } from './config/ratelimit';
import helmet from "helmet";
import { requestAuthCheck } from './config/requestAuth';
import { requestMethodCheck } from './config/requestMethod';
import BaseError from './utils/baseError';
import { setupErrorHandle } from './config/errorHandle';
const morgan = require("morgan");
import 'dotenv/config'
import { LoanContractRabbitMQ } from './rabbitmq/LoanContract/LoanContract.rabbitmq';
import { rabbitmqRoute } from './config/rabbitMQ_route';
import { createLogging } from './config/logging';
import { route } from './routes';
import { HTTPStatusMessage } from './utils/http-status-code';
const loanContractRabbitMQ  = new LoanContractRabbitMQ();
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

route(app);
app.use((error: BaseError, req: any, res: any, next: any) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    console.log('This error' + error);
    res.status(error.statusCode).json({
        statusCode: error.statusCode,
        status: error.status,
        message: error.message,
        httpErrorMessage: HTTPStatusMessage[error.statusCode as unknown as keyof typeof HTTPStatusMessage].message,
    });
});

//config
// setupRateLimit(app, ROUTES);
// requestAuthCheck(app, ROUTES);
// requestMethodCheck(app, ROUTES);
// rabbitmqRoute(app);
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