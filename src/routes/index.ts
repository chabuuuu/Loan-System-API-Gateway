import authenticateRouter from "@/routes/loan-service/authenticate.route";
import borrowerRouter from "@/routes/loan-service/borrower.route";
import contractRouter from "@/routes/loan-service/contract.route";
import employeeRouter from "@/routes/loan-service/employee.route";
import lenderRouter from "@/routes/loan-service/lender.route";
import loanPackageRouter from "@/routes/loan-service/loan-package.route";
import scheduleRouter from "@/routes/worker-service/schedule.route";

const root = process.env.ROOT_URL || "/api/v1";
export function route(app: any){
    app.use(`${root}/borrower`, borrowerRouter)
    app.use(`${root}/contract`, contractRouter)
    app.use(`${root}/employees`, employeeRouter)
    app.use(`${root}/lender`, lenderRouter)
    app.use(`${root}/loanpackage`, loanPackageRouter)
    app.use(`${root}/worker/schedule`, scheduleRouter)
    app.use(`${root}/login`, authenticateRouter)
}