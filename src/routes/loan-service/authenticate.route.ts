import express from 'express';
import { AuthenticateController } from '@/controller/loan-service/authenticate.controller';
const authenticateRouter = express.Router();
const authenticateController = new AuthenticateController();
authenticateRouter.post('/', authenticateController.login.bind(authenticateController));
export default authenticateRouter;