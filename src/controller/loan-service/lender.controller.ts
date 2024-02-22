import { BaseController } from "../base.controller";
import axios from 'axios';
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');

export class LenderController extends BaseController{
    async get(req: any, res: any, next: any): Promise<void> {
        try {
            const lenders = await axios.get(`${LOAN_SERVICE}/lender`);
            return res.json(lenders.data);
        } catch (error: any) {
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)
        }
    }

    async create(req: any, res: any, next: any): Promise<void> {
        try {
            const lender = await axios.post(`${LOAN_SERVICE}/lender`, req.body);
            return res.json(lender.data);
        } catch (error: any) {
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)
        }
    }
}