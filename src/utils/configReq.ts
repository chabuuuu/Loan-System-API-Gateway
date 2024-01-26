const querystring = require("querystring");

export function configReq(proxyReq: any, req: any, res: any) {
    const requestBody = req.body;
    proxyReq.setHeader('X-User-Id', req.user.id);
    proxyReq.setHeader('X-Client-Role', req.user.role);
    console.log("Req.user:::", proxyReq);   
    if (!requestBody) {
        return;
    }
    const contentType = proxyReq.getHeader('Content-Type');
    const writeBody = (bodyData: any) => {
        console.log("BodyData:::", bodyData);
        
        // deepcode ignore ContentLengthInCode: bodyParser fix
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    };
    if (contentType && contentType.includes('application/json')) {
        writeBody(JSON.stringify(requestBody));
    }
    if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
        writeBody(querystring.stringify(requestBody));
    }
  }