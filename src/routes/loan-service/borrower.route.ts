import express from 'express';
import { BorrowerController } from '../../controller/loan-service/borrower.controller';
const borrowerRouter = express.Router();
const borrowerController = new BorrowerController();
borrowerRouter.get('/', borrowerController.get)
borrowerRouter.post('/', borrowerController.create)
borrowerRouter.get('/:id', borrowerController.getById)
export default borrowerRouter;