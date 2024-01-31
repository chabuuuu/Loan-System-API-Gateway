import { log } from "winston";
import { BaseLog } from "./BaseLog";
export class LoanPackage_log extends BaseLog {

createLog(proxyRes: any, req: any, res: any){
    let method = req.method;
   if (proxyRes.statusCode === 200) {
      this.logData = `User ${req.user.username} ${method} in loan/loanpackage`;    
      this.withResContent = true;
      super.onSuccess(proxyRes, req, res);
   }else{     
      this.logData = `User ${req.user.username} ${method} failed in loan/loanpackage - Status Code: ${proxyRes.statusCode}`;
      super.onError(proxyRes, req, res);
   }
}
}