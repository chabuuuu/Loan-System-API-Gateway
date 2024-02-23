import express from 'express';
import { BorrowerController } from '@/controller/loan-service/borrower.controller';
import { checkRole } from '@/auth/check-role';
import { Subject } from '@/auth/subject';
import { jwtAuthenticate } from '@/middleware/jwt-authenticate';

const borrowerRouter = express.Router();
const borrowerController = new BorrowerController();

borrowerRouter.get('/', jwtAuthenticate ,checkRole('read', Subject.Borrower), borrowerController.get.bind(borrowerController))
borrowerRouter.post('/', jwtAuthenticate, checkRole('write', Subject.Borrower) ,borrowerController.create)
borrowerRouter.get('/:id', jwtAuthenticate, checkRole('read', Subject.Borrower), borrowerController.getById)
export default borrowerRouter;