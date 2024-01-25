import express from 'express';
import { setupLogging } from './config/logging';
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
const loanContractRabbitMQ  = new LoanContractRabbitMQ();
const app = express();
const port = 3000;
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(helmet());
//config
setupLogging(app);
setupRateLimit(app, ROUTES);
requestAuthCheck(app, ROUTES);
requestMethodCheck(app, ROUTES);
setupProxies(app, ROUTES);
setupErrorHandle(app, ROUTES)
app.post('/api/v1/contract', loanContractRabbitMQ.createLoanContract);
app.all('*', (req: any, res: any, next: any) => {
    const status = 'fail';
    const statusCode = 404;
    const err = new BaseError(statusCode, status, 'URL Not Valid');
    next(err);
});
app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});