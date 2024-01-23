export const requestMethodCheck = (app: any, routes: any) => {
    routes.forEach((r: any) => {
        if (r.methodCheck) {
            app.use(r.url, async function(req: any, res: any, next: any) {
                try {
                    var allowMethod;
                    if (req.role in r.methodAllow) {
                        allowMethod = r.methodAllow[req.role];
                    }else{
                        allowMethod = r.methodAllow["other"];
                    }
                    if (!allowMethod.includes(req.method)){
                        throw new Error(`Method ${req.method} not allowed`);
                    }      
                    console.log(req.body);
                                                      
                    next();                    
                } catch (error: any) {
                    res.status(402).send(error.message);
                }
            });
        }
    })
}