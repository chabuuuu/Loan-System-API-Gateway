import { BaseController } from "../base.controller";
import axios from 'axios';
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');

export class ContractContoller extends BaseController {
    constructor() {
        super(`${LOAN_SERVICE}/contract`);
    }
    async get(req: any, res: any, next: any): Promise<void> {
        return super.get(req, res, next);
    }
}