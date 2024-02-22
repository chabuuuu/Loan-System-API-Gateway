import borrowerRouter from "./loan-service/borrower.route";
import contractRouter from "./loan-service/contract.route";
import employeeRouter from "./loan-service/employee.route";
import lenderRouter from "./loan-service/lender.route";
import loanPackageRouter from "./loan-service/loan-package.route";
import scheduleRouter from "./worker-service/schedule.route";
const root = process.env.ROOT_URL || "/api/v1";
export function route(app: any){
    app.use(`${root}/borrower`, borrowerRouter)
    app.use(`${root}/contract`, contractRouter)
    app.use(`${root}/employees`, employeeRouter)
    app.use(`${root}/lender`, lenderRouter)
    app.use(`${root}/loanpackage`, loanPackageRouter)
    app.use(`${root}/worker/schedule`, scheduleRouter)
}