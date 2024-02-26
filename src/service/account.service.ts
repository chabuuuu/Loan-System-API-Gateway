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
}