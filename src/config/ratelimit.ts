const rateLimit = require("express-rate-limit");

export const setupRateLimit = (app: any, routes: any) => {
    routes.forEach((r: any) => {
        if (r.rateLimit) {
            app.use(r.url, rateLimit(r.rateLimit));
        }
    })
}
