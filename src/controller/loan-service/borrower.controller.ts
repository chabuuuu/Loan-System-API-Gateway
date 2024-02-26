import { BaseController } from '../base.controller';
import axios from 'axios';
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');
export class BorrowerController extends BaseController {
    constructor() {
        super(`${LOAN_SERVICE}/borrower`);
    }
    async getById(req: any, res: any, next: any): Promise<void> {
        return super.getById(req, res, next);
    }

    async get(req: any, res: any, next: any): Promise<void> {
        return super.get(req, res, next);              
    }

    async create(req: any, res: any, next: any): Promise<void> {
        return super.create(req, res, next);
    }

}