import express from 'express';
import { AuthenticateController } from '@/controller/loan-service/authenticate.controller';
import { checkRetry } from '@/middleware/check-retry.middleware';
import { setJwtMicroservice } from '@/middleware/set-jwt-microservice';
const authenticateRouter = express.Router();
const authenticateController = new AuthenticateController();
// authenticateRouter.post('/', checkRetry(5),  authenticateController.login.bind(authenticateController));
authenticateRouter.post('/',  authenticateController.login.bind(authenticateController));

export default authenticateRouter;