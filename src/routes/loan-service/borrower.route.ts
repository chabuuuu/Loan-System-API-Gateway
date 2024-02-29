import express from 'express';
import { BorrowerController } from '@/controller/loan-service/borrower.controller';
import { checkRole } from '@/auth/check-role';
import { Subject } from '@/auth/subject';
import { jwtAuthenticate } from '@/middleware/jwt-authenticate';
import { setJwtMicroservice } from '@/middleware/set-jwt-microservice';

const borrowerRouter = express.Router();
const borrowerController = new BorrowerController();

borrowerRouter.get('/', jwtAuthenticate ,checkRole('read', Subject.Borrower), setJwtMicroservice, borrowerController.get.bind(borrowerController))
borrowerRouter.post('/', jwtAuthenticate, checkRole('write', Subject.Borrower), setJwtMicroservice ,borrowerController.create.bind(borrowerController))
borrowerRouter.get('/:id', jwtAuthenticate, checkRole('read', Subject.Borrower), setJwtMicroservice, borrowerController.getById.bind(borrowerController))
export default borrowerRouter;