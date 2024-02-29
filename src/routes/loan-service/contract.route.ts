import express from 'express';

import { jwtAuthenticate } from '@/middleware/jwt-authenticate';
import { LoanContractRabbitMQ } from '@/rabbitmq/LoanContract/LoanContract.rabbitmq';
import { ContractContoller } from '@/controller/loan-service/contract.controller';
import { Subject } from '@/auth/subject';
import { checkRole } from '@/auth/check-role';
import { setJwtMicroservice } from '@/middleware/set-jwt-microservice';
const loanContractRabbitMQ  = new LoanContractRabbitMQ();
const contractController = new ContractContoller();

const contractRouter = express.Router();
contractRouter.post('/', jwtAuthenticate, checkRole('write', Subject.Contract), setJwtMicroservice, loanContractRabbitMQ.createLoanContract)
contractRouter.get('/', jwtAuthenticate, checkRole('read', Subject.Contract), setJwtMicroservice, contractController.get.bind(contractController))
export default contractRouter