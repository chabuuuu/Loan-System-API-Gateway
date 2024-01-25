import BaseError from "../utils/baseError";

export const setupErrorHandle = (app: any, routes: any) => {
    routes.forEach((r: any) => {
            app.use(r.url, async function(error: BaseError, req: any, res: any, next: any) {
                error.statusCode = error.statusCode || 500;
                error.status = error.status || 'error';
                console.log('This error' + error);
                res.status(error.statusCode).json({
                statusCode: error.statusCode,
                status: error.status,
                message: error.message,
        });
            });
        
    })
}