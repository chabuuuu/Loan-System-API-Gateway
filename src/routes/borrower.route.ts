import express from 'express';
import { BorrowerController } from '../controller/loan-service/borrower.controller';
const borrowerRouter = express.Router();
borrowerRouter.get('/', BorrowerController.prototype.get)
borrowerRouter.post('/', BorrowerController.prototype.create)
borrowerRouter.get('/:id', BorrowerController.prototype.getById)
export default borrowerRouter;