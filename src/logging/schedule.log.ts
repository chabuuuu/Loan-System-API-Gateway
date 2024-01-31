import { log } from "winston";
import { BaseLog } from "./BaseLog";
export class Schedule_log extends BaseLog {

createLog(proxyRes: any, req: any, res: any){
   let method = req.method;
   if (proxyRes.statusCode === 200 || proxyRes.statusCode === 201) {
      this.logData = `User ${req.user.username} ${method} in worker/schedule`;   
      this.withResContent = true; 
      super.onSuccess(proxyRes, req, res);
   }else{     
      this.logData = `User ${req.user.username} ${method} in worler/schedule failed - Status Code: ${proxyRes.statusCode}`;
      this.withResContent = true;
      super.onError(proxyRes, req, res);
   }
}
}