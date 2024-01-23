import express from 'express';
import { setupLogging } from './config/logging';
import { ROUTES } from './config/routes';
import { setupProxies } from './config/proxy';
import { setupRateLimit } from './config/ratelimit';
import helmet from "helmet";
import { requestAuthCheck } from './config/requestAuth';
import { requestMethodCheck } from './config/requestMethod';
const morgan = require("morgan");
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
app.listen(port, () => {
    console.log(`Server is running on  http://localhost:${port}`);
});