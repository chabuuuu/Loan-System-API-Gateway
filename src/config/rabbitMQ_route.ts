import { LoanContractRabbitMQ } from "../rabbitmq/LoanContract/LoanContract.rabbitmq";
const loanContractRabbitMQ  = new LoanContractRabbitMQ();
export function rabbitmqRoute(app: any){
    app.post('/api/v1/contract', loanContractRabbitMQ.createLoanContract);
}