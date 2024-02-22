import { BaseController } from "../base.controller";
import axios from 'axios';
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');

export class ContractContoller extends BaseController {
    async get(req: any, res: any, next: any): Promise<void> {
        try {
            const contracts = await axios.get(`${LOAN_SERVICE}/contract`);
            return res.json(contracts.data);
        } catch (error: any) {
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)
        }
    }
}