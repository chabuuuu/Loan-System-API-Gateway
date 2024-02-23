import { BaseController } from "@/controller/base.controller";
import axios from "axios";
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');

export class AuthenticateController extends BaseController {
    async login(req: any, res: any, next: any) {
        try {
            const token = await axios.post(`${LOAN_SERVICE}/authenticaion/login`, req.body)
            return res.json(token.data);
        } catch (error : any) {
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)
        }
    }
}