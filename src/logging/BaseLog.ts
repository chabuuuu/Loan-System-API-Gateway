// const winston = require('winston');
// const { combine, timestamp, label, prettyPrint } = format;
// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.simple(),
//     defaultMeta: { service: 'user-service' },
//     transports: [
//       //
//       // - Write all logs with importance level of `error` or less to `error.log`
//       // - Write all logs with importance level of `info` or less to `combined.log`
//       //
//       new winston.transports.File({ filename: 'error.log', level: 'error' }),
//       new winston.transports.File({ filename: 'combined.log' }),
//     ],


//   });
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, align, printf } = format;

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    label({ label: 'right meow!' }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    align(),
    printf((info : any) => `[${info.timestamp}] ${info.level}: ${info.message}`)  
  ),
      transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
    ],
})

export class BaseLog {
  logData: string;
  constructor() {
    this.logData = "";
  }
  createLog(proxyRes: any, req: any, res: any){}
    onSuccess(proxyRes: any, req: any, res: any) {      
      const content = this.logData;
        var _write = res.write;
        res.write = function (data : any) {
          try{
            var jsonData = JSON.parse(data);            
            logger.info(content);
              var buf = Buffer.from(JSON.stringify(jsonData), 'utf-8');
              _write.call(res,buf);
              return;
          } catch (err) {
            console.log(err);
          }
        }
    }
    onError( ) {
      const content = this.logData;
            logger.error(content);
    }
}