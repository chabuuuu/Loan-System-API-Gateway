const rateLimit = require("express-rate-limit");

export const setupRateLimit = (app: any, config: any) => {
        if (config.rateLimit) {
            app.use(config.url, rateLimit(config.rateLimit));
        }
}
