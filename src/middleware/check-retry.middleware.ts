import { CountRetryService } from "@/service/count-retry.service"
import BaseError from "@/utils/baseError";
import { HttpStatusCode } from "axios";
const oneDayInSeconds = 60 * 60 * 24;
const countRetryService = new CountRetryService(oneDayInSeconds);
export const checkRetry = (maxRetry : number) => async (req: any, res: any, next: any) => {
    const user = req.body
    if (user.username) {
        const username = user.username;
        const count = await countRetryService.getRetryCountByUsername(username);
        if (count >= maxRetry) {
            next(new BaseError(HttpStatusCode.BadRequest, "fail","You have reached the maximum number of retries"))
        }
    }
    next()
}