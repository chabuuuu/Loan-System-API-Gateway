import { CountRetryService } from "@/service/count-retry.service"
import BaseError from "@/utils/baseError";
import { HttpStatusCode } from "axios";
import { AccountService } from "@/service/account.service";
import axios from "axios";
import { sendEmail } from "@/utils/email/send-email";
const jwt = require('jsonwebtoken');
const oneDayInSeconds = 60 * 60 * 24;
const countRetryService = new CountRetryService(oneDayInSeconds);
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');
const authURL = process.env.AUTH_URL || 'http://localhost:3001/api/v1/authenticaion/me';
const accountService = new AccountService();
const ejs = require('ejs');

async function blockUser(username: string) {
    try {
        const token = jwt.sign(
            { aud: LOAN_SERVICE },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
        );
        await axios.post(`${LOAN_SERVICE}/authenticaion/block`, { username: username }, {
            headers: {
                'Authorization': token
            }
        })
    } catch (error) {
        throw (error)
    }

}


export const checkRetry = (maxRetry: number) => async (req: any, res: any, next: any) => {
    try {        
        const user = req.body
        if (!user.hasOwnProperty('email') || !user.hasOwnProperty('password')) {
            throw (new BaseError(HttpStatusCode.BadRequest, "fail", "Email and password are required"))
        }
            const email = user.email;
            const role = user.role;
            const isBlock = await accountService.getBlockStatus(email, role, req.protect);
            if (isBlock === true) {
                throw (new BaseError(HttpStatusCode.BadRequest, "fail", "This account is currently blocked"))
            }
            const count = await countRetryService.getRetryCountByUsername(email);
            if (count >= maxRetry) {
                await blockUser(email)
                // const email = await accountService.getUserEmail(email);
                const root = process.cwd();
                ejs.renderFile(root + '/src/views//email/user-blocked.ejs',
                    { receiver: [email], content: `Tài khoản của bạn đã bị khóa do đăng nhập sai quá ${maxRetry} lần` },
                    async (err: any, data: any) => {
                        if (err) {
                            throw err
                        } else {
                            await sendEmail(email, 'Tài khoản bị khóa', data);
                        }
                    }
                )
                throw (new BaseError(HttpStatusCode.BadRequest, "fail", "You have reached the maximum number of retries"))
            }
        
        next()
    } catch (error) {
        next(error)
    }
}