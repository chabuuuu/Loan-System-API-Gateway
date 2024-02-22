import borrowerRouter from "./borrower.route";
import contractRouter from "./contract.route";

const root = process.env.ROOT_URL || "/api/v1";
export function route(app: any){
    app.use(`${root}/borrower`, borrowerRouter)
    app.use(`${root}/contract`, contractRouter)
}