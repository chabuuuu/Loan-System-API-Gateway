import express from 'express';
import { LoanPackageController } from '../../controller/loan-service/loan-package.controller';
import { checkRole } from '../../auth/check-role';
import { Subject } from '../../auth/subject';
import { jwtAuthenticate } from '@/middleware/jwt-authenticate';
const loanPackageRouter = express.Router();
const loanPackageController = new LoanPackageController();
loanPackageRouter.get('/', loanPackageController.get)
loanPackageRouter.post('/', jwtAuthenticate, checkRole('write', Subject.LoanPackage), loanPackageController.create)
export default loanPackageRouter