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
    async getRetryCountByUsername(username: string) {
        let count : any = await redis.get(`user:${username}`);
        if (count === null) {
            count = '0';
        }
        return Number(count);
    }

    async setRetryCountByUsername(username: string, count: number) {
        await redis.set(`user:${username}`, count, 'EX', this.expTime);
    }

    async updateRetryCountByUsername(username: string, value: string): Promise<void> {
        await redis.set(`user:${username}`, value, 'EX', this.expTime);
      }
    async incrementRetryCount(username: string) {
        let count : any = await this.getRetryCountByUsername(username);
        console.log('count:::',count);
        
        if (!count || count === 0) {
            this.setRetryCountByUsername(username, 0);
            count = 0;
        }
        count = Number(count) + 1;
        await this.updateRetryCountByUsername(username, count.toString());
    }

    async resetRetryCount(username: string) {
        await this.updateRetryCountByUsername(username, '0');
    }
}