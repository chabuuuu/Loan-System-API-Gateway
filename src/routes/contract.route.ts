import express from 'express';
import { LoanContractRabbitMQ } from "../rabbitmq/LoanContract/LoanContract.rabbitmq";
const loanContractRabbitMQ  = new LoanContractRabbitMQ();
import { ContractContoller } from '../controller/loan-service/contract.controller';
const contractController = new ContractContoller();

const contractRouter = express.Router();
contractRouter.post('/', loanContractRabbitMQ.createLoanContract)
contractRouter.get('/', contractController.get)
export default contractRouter