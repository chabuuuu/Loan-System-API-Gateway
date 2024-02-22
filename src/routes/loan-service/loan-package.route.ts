import express from 'express';
import { LoanPackageController } from '../../controller/loan-service/loan-package.controller';
const loanPackageRouter = express.Router();
const loanPackageController = new LoanPackageController();
loanPackageRouter.get('/', loanPackageController.get)
loanPackageRouter.post('/', loanPackageController.create)
export default loanPackageRouter