import { GetAllEmployeeDto } from '@/dto/employee/get-all.dto';
import { BaseController } from '../base.controller';
import axios from 'axios';
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');

export class EmployeeController extends BaseController {
    constructor() {
        super(`${LOAN_SERVICE}/employees`);
    }
    async get(req: any, res: any, next: any): Promise<void> {        
        try {
            const {data} = await axios.get(`${this.service}`);

            //Validate the response
            await this.validateResponse(data, new GetAllEmployeeDto())
            this.logger.log(req, JSON.stringify(data), 'info', this.service)            
            return res.json(data);
        } catch (error: any) {    
            next(error)        
            //next(this.erroHandle(error));
        }
    }

    async create(req: any, res: any, next: any): Promise<void> {
        return super.create(req, res, next);
    }
}