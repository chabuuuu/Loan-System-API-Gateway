import { BaseController } from "@/controller/base.controller";
import axios from "axios";
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');

export class AuthenticateController extends BaseController {
    constructor() {
        super(`${LOAN_SERVICE}/authenticaion`);
    }
    async login(req: any, res: any, next: any) {
        try {
            const token = await axios.post(`${LOAN_SERVICE}/authenticaion/login`, req.body)
            return res.json(token.data);
        } catch (error : any) {
            if (error.code === "ECONNREFUSED"){
                error.message = `Service ${this.service} Not Available`
            } 
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)
        }
    }
}