import { CountRetryService } from "@/service/count-retry.service"
const oneDayInSeconds = 60 * 60 * 24;
const countRetryService = new CountRetryService(oneDayInSeconds);
export const checkRetry = (maxRetry : number) => async (req: any, res: any, next: any) => {
    const user = req.user
    if (user) {
        const userId = user.id;
        const count = await countRetryService.getRetryCountByUserId(userId);
        if (count >= maxRetry) {
            next(new Error("You have reached the maximum number of retries"))
        }
    }
    next()
}