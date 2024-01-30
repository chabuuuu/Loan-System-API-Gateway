import BaseError from "../utils/baseError";

export const createLogging = (app: any, routes: any) => {
    routes.forEach((r: any) => {
            app.use(r.url, async function(req: any, res: any, next: any) {
                console.log("HELLOOOOO");
        });      
    })
}