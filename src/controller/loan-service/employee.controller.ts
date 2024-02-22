import { BaseController } from '../base.controller';
import axios from 'axios';
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');

export class EmployeeController extends BaseController {
    async get(req: any, res: any, next: any): Promise<void> {
        try {
            const employee = await axios.get(`${LOAN_SERVICE}/employees`);
            return res.json(employee.data);
        } catch (error : any) {
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)   
        }
    }

    async create(req: any, res: any, next: any): Promise<void> {
        try {
            const employee = await axios.post(`${LOAN_SERVICE}/employees`, req.body);
            return res.json(employee.data);
        } catch (error : any) {
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error) 
        }
    }
}