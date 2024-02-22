import borrowerRouter from "./borrower.route";

const root = process.env.ROOT_URL || "/api/v1";
export function route(app: any){
    app.use(`${root}/borrower`, borrowerRouter)
}