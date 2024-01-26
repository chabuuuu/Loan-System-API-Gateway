import axios from 'axios';
import BaseError from '../utils/baseError';
const jwt = require('jsonwebtoken');
const authURL = process.env.AUTH_URL || 'http://localhost:3001/api/v1/authenticaion/me';
async function getUser(token: string) {
    try {
      const user = await axios.get(authURL, {headers: {
        'Authorization': token
      }});
      console.log("response::::", user.data)
      return user.data;
    } catch (error: any) {
      console.error("error:::", error);
      if (error.code === "ECONNREFUSED"){
        throw new BaseError(500, "fail", "Auth Service Not Available")
      }
      const errorRespond = error.response.data;
      throw errorRespond;
    }
  }

function getAuthOrNot(r : any, method: any) : boolean{
    var result = method in r.auth ? r.auth[method] : r.auth["default"];
    return result;
}

export const requestAuthCheck = (app: any, routes: any) => {
    routes.forEach((r: any) => {
            app.use(r.url, async function(req: any, res: any, next: any) {
                try {
                    if (getAuthOrNot(r, req.method) == false){
                      console.log("No need auth");     
                      req.user = {
                        id: "",
                        username: "",
                        role: "anonymous"};     
                      next();
                    }
                    else{
                      const token = req.get('Authorization')
                      const user : any = await getUser(token);
                      delete user.status;
                      req.user = user;
                      next();
                    }
                } catch (error: any) {
                    console.log(error.message);
                    next(error)   
                }
            });
    })
}

