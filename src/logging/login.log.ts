import { log } from "winston";
import { BaseLog } from "./BaseLog";
export class Login_log extends BaseLog {

createLog(proxyRes: any, req: any, res: any){
   if (proxyRes.statusCode === 200) {
      this.logData = `User ${req.body.username} login successfully`;    
      this.withResContent = true;
      super.onSuccess(proxyRes, req, res);
   }else{     
      this.logData = `User ${req.body.username} login failed - Status Code: ${proxyRes.statusCode}`;
      this.withResContent = true;
      super.onError(proxyRes, req, res);
   }
}
}