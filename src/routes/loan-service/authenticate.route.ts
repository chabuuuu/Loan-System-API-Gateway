import express from 'express';
import { AuthenticateController } from '@/controller/loan-service/authenticate.controller';
import { checkRetry } from '@/middleware/check-retry.middleware';
const authenticateRouter = express.Router();
const authenticateController = new AuthenticateController();
authenticateRouter.post('/', checkRetry(5), authenticateController.login.bind(authenticateController));
export default authenticateRouter;