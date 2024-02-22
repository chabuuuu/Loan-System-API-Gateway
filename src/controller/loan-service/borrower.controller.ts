import { BaseController } from "/home/haphuthinh/Documents/Workspace/LoanSystem/Loan-System-API-Gateway/src/controller/base.controller";
import axios from 'axios';
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');
export class BorrowerController extends BaseController {
    
    async getById(req: any, res: any, next: any): Promise<void> {
        try {
            const borrower = await axios.get(`${LOAN_SERVICE}/borrower/${req.params.id}`);
            return res.json(borrower.data);
        } catch (error : any) {
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)
        }
    }

    async get(req: any, res: any, next: any): Promise<void> {
        try {            
            const allBorrwers = await axios.get(`${LOAN_SERVICE}/borrower`);
            return res.json(allBorrwers.data);
        } catch (error : any) {
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)
        }
    }

    async create(req: any, res: any, next: any): Promise<void> {
        try {
            const borrower = await axios.post(`${LOAN_SERVICE}/borrower`, req.body);
            return res.json(borrower.data);
        } catch (error : any) {
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)
        }
    }

}