export function formatResponse (req: any, res: any, next: any){
    var send = res.json;
    console.log('res.json::: ', res.json);
    res.json = function (body: any) {    
        console.log('body::: ', body);
        if (body.status !== 'fail'){
            body = {
                statusCode: 200,
                status: 'success',
                data: body,
            }
        }
        send.call(this, body);
    };
    next();
}