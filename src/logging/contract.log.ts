import { log } from "winston";
import { BaseLog } from "./BaseLog";
export class Contract_log extends BaseLog {

createLog(proxyRes: any, req: any, res: any){
   let method = req.method;
   if (proxyRes.statusCode === 200) {
      this.logData = `User ${req.user.username} ${method} in loan/contract`;   
      this.withResContent = true; 
      super.onSuccess(proxyRes, req, res);
   }else{     
      this.logData = `User ${req.user.username} ${method} in loan/contract failed - Status Code: ${proxyRes.statusCode}`;
      this.withResContent = true;
      super.onError(proxyRes, req, res);
   }
}
}