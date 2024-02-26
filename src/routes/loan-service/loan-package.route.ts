import express from 'express';

import { jwtAuthenticate } from '@/middleware/jwt-authenticate';
import { LoanPackageController } from '@/controller/loan-service/loan-package.controller';
import { checkRole } from '@/auth/check-role';
import { Subject } from '@/auth/subject';
const loanPackageRouter = express.Router();
const loanPackageController = new LoanPackageController();
loanPackageRouter.get('/', loanPackageController.get.bind(loanPackageController))
loanPackageRouter.post('/', jwtAuthenticate, checkRole('write', Subject.LoanPackage), loanPackageController.create.bind(loanPackageController))
export default loanPackageRouter