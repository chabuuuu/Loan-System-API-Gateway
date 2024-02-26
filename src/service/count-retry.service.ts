import { Redis } from "ioredis";
const host = process.env.REDIS_HOST || 'localhost';
const port = process.env.REDIS_PORT || 6379;
const redis = new Redis({
    host: host,
    port: Number(port),
})
export class CountRetryService {
    private expTime : number;
    constructor(expTime: number) {
        this.expTime = expTime;
    }
    async getRetryCountByUserId(userId: number) {
        let count : any = await redis.get(`user:${userId.toString}`);
        if (count === null) {
            count = '0';
        }
        return Number(count);
    }

    async setRetryCountByUserId(userId: number, count: number) {
        await redis.set(`user:${userId.toString()}`, count, 'EX', this.expTime);
    }

    async updateRetryCountByUserId(key: string, value: string): Promise<void> {
        await redis.set(`user:${key}`, value);
      }
    async incrementRetryCount(userId: number) {
        let count : any = await this.getRetryCountByUserId(userId);
        count = Number(count) + 1;
        await this.updateRetryCountByUserId(userId.toString(), count.toString());
    }

    async resetRetryCount(userId: number) {
        await this.updateRetryCountByUserId(userId.toString(), '0');
    }
}