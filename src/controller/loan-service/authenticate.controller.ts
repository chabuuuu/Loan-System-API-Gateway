import { BaseController } from "@/controller/base.controller";
import axios from "axios";
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');
import { CountRetryService } from "@/service/count-retry.service";
const oneDayInSeconds = 60 * 60 * 24;
const countRetryService = new CountRetryService(oneDayInSeconds);
export class AuthenticateController extends BaseController {
    constructor() {
        super(`${LOAN_SERVICE}/authenticaion`);
    }
    async login(req: any, res: any, next: any) {
        try {
            const token = await axios.post(`${LOAN_SERVICE}/authenticaion/login`, req.body, {
                headers: {
                    Authorization: req.protect
                }
            })
            return res.json(token.data);
        } catch (error : any) {
            console.log('errorcode:::',error.response.status);
            if (error.response.status === 401){
                const user = req.body;
                console.log('user:::',user)
                if (user.username) {                    
                    await countRetryService.incrementRetryCount(user.username);
                }
                error.message = 'Invalid Username or Password';
            }
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