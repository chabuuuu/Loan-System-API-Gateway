const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, align, printf } = format;

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    align(),
    printf((info : any) => `[${info.timestamp}] ${info.level}: ${info.message}`)  
  ),
      transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
    ],
})

export class BaseLog {
  logData: string;
  withResContent: boolean = false;
  constructor() {
    this.logData = "";
  }
  createLog(proxyRes: any, req: any, res: any){}
    onSuccess(proxyRes: any, req: any, res: any) {      
      let content = this.logData;
      let withResContent = this.withResContent;
        var _write = res.write;
        res.write = function (data : any) {
          try{
            var jsonData = JSON.parse(data);     
            if (withResContent) {
              content += ` - Response: ${JSON.stringify(jsonData)}`;
            }               
            logger.info(content);
              var buf = Buffer.from(JSON.stringify(jsonData), 'utf-8');
              _write.call(res,buf);
              return;
          } catch (err) {
            console.log(err);
          }
        }
    }
    onError(proxyRes: any, req: any, res: any ) {
      let content = this.logData;
      let withResContent = this.withResContent;
        var _write = res.write;
        res.write = function (data : any) {
          try{
            var jsonData = JSON.parse(data);     
            if (withResContent) {
              content += ` - Response: ${JSON.stringify(jsonData)}`;
            }               
            logger.error(content);
              var buf = Buffer.from(JSON.stringify(jsonData), 'utf-8');
              _write.call(res,buf);
              return;
          } catch (err) {
            console.log(err);
          }
        }
    }
    customLog(logData: string, level: string) {
      switch (level) {
        case 'info':
          logger.info(logData);
          break;
        case 'error':
          logger.error(logData);
          break;
        default:
          break;
      }
    }
}