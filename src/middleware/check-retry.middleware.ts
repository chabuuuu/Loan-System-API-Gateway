import { CountRetryService } from "@/service/count-retry.service"
import BaseError from "@/utils/baseError";
import { HttpStatusCode } from "axios";
import axios from "axios";
const jwt = require('jsonwebtoken');
const oneDayInSeconds = 60 * 60 * 24;
const countRetryService = new CountRetryService(oneDayInSeconds);
const config = require('config');
const LOAN_SERVICE = config.get('LOAN_SERVICE');

async function blockUser(username: string) {
    try {
        const token = jwt.sign(
            { aud: LOAN_SERVICE },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
        );
        await axios.post(`${LOAN_SERVICE}/authenticaion/block`, {username: username}, {
            headers: {
                'Authorization': token
            }
        })
    } catch (error) {
        throw(error)
    }
    
}
export const checkRetry = (maxRetry: number) => async (req: any, res: any, next: any) => {
    try {
        const user = req.body
    if (user.username) {
        const username = user.username;
        const count = await countRetryService.getRetryCountByUsername(username);
        if (count >= maxRetry) {
            await blockUser(username)
            throw(new BaseError(HttpStatusCode.BadRequest, "fail", "You have reached the maximum number of retries"))
        }
    }
    next()
    } catch (error) {
        next(error)
    }
}