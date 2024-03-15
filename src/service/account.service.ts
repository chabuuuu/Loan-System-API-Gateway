import BaseError from "@/utils/baseError";
import { jwtCreate } from "@/utils/jwt/jwt-creator";
import axios from "axios";
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');

export class AccountService {

    async getAccount(req: any, res: any, next: any) {
        try {
            const account = await axios.get(`${LOAN_SERVICE}/authenticaion/account`, {
                headers: {
                    Authorization: req.headers.authorization
                }
            })
            return res.json(account.data);
        } catch (error : any) {
            if (error.code === "ECONNREFUSED"){
                error.message = `Loan Service Not Available`
            } 
            if (error.hasOwnProperty('response')) {
                next(error.response.data);
            }
            next(error)
        }
    }

    async getBlockStatus(email : string, role: any, microservice_protect: any){
        try {
            const token = jwtCreate("")
            console.log('token:::', token);
            
            const blockStatus = await axios.get(`${LOAN_SERVICE}/authentication/block-status?email=${email}&role=${role}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Microservice_protect: microservice_protect
                }
            })
            return blockStatus.data.isBlock;
        } catch (error: any) {
            if (error.code === "ECONNREFUSED"){
                throw new BaseError(500, "fail", "Loan Service Not Available")
            }
            throw error.response.data;
        }
    }

    async getUserEmail (username : string){
        try {
            const email = await axios.get(`${LOAN_SERVICE}/authenticaion/user-email?username=${username}`)
            return email.data.email;
        } catch (error: any) {
            if (error.code === "ECONNREFUSED"){
                throw new BaseError(500, "fail", "Loan Service Not Available")
            }
            throw error.response.data;
        }
    }
}