import BaseError from "./baseError";

const jwt = require('jsonwebtoken');

// Middleware kiểm tra JWT
export function extractJWT(req: any, res: any, next: any) {
    let token = req.header('Authorization');
    console.log(token);
    try {
        if (!token) {
            req.user = {
                role: 'other'
            }  
            next();
        }else{
            token = token.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
                if (err) {                
                    req.user = {
                        role: 'other'
                    }             
                }else{
                    req.user = user;
                }
                next();
            });
        }
    } catch (error: any) {
        next(error);
    }
}
