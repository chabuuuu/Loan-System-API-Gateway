import express from 'express';
import { LoanContractRabbitMQ } from '../../rabbitmq/LoanContract/LoanContract.rabbitmq';
import { ContractContoller } from '../../controller/loan-service/contract.controller';
import { checkRole } from '../../auth/check-role';
import { Subject } from '../../auth/subject';
import { jwtAuthenticate } from '@/middleware/jwt-authenticate';
const loanContractRabbitMQ  = new LoanContractRabbitMQ();
const contractController = new ContractContoller();

const contractRouter = express.Router();
contractRouter.post('/', jwtAuthenticate, checkRole('write', Subject.Contract), loanContractRabbitMQ.createLoanContract)
contractRouter.get('/', jwtAuthenticate, checkRole('read', Subject.Contract), contractController.get)
export default contractRouter