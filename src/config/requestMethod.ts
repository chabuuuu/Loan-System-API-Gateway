export const requestMethodCheck = (app: any, config: any) => {
        if (config.methodCheck) {
            app.use(config.url, async function(req: any, res: any, next: any) {
                try {
                    var allowMethod;               
                    if (req.user.role in config.methodAllow) {
                        allowMethod = config.methodAllow[req.user.role];
                    }else{
                        allowMethod = config.methodAllow["other"];
                    }
                    if (!allowMethod.includes(req.method)){
                        throw new Error(`Method ${req.method} not allowed`);
                    }      
                    console.log(req.user);
                                                      
                    next();                    
                } catch (error: any) {
                    res.status(402).send(error.message);
                }
            });
        }
}