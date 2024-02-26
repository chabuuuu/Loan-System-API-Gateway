import { BaseController } from "../base.controller";
import axios from 'axios';
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');

export class LoanPackageController extends BaseController {
    constructor() {
        super(`${LOAN_SERVICE}/loanpackage`);
    }
    async get(req: any, res: any, next: any): Promise<void> {        
        const respond = await super.get(req, res, next);
        return respond;
    }

    async create(req: any, res: any, next: any): Promise<void> {
        return super.create(req, res, next);
    }
}