import { BaseController } from "../base.controller";
import axios from 'axios';
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');

export class LoanPackageController extends BaseController {
    async get(req: any, res: any, next: any): Promise<void> {
        try {
            const loanPackages = await axios.get(`${LOAN_SERVICE}/loanpackage`);
            return res.json(loanPackages.data);
        } catch (error: any) {
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)
        }
    }

    async create(req: any, res: any, next: any): Promise<void> {
        try {
            const loanPackage = await axios.post(`${LOAN_SERVICE}/loanpackage`, req.body);
            return res.json(loanPackage.data);
        } catch (error: any) {
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)
        }
    }
}