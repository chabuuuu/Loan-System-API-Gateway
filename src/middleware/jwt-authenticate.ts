import BaseError from "@/utils/baseError";
import axios from "axios";
const authURL = process.env.AUTH_URL || 'http://localhost:3001/api/v1/authentication/me';

async function getUser(token: string, microservice_protector: string) {
    try {
      const user = await axios.get(authURL, {headers: {
        'Authorization': token,
        'Microservice_protect': microservice_protector
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

export const jwtAuthenticate = async (req: any, res: any, next: any) => {
                try {
                      const token = req.get('Authorization')
                      const user : any = await getUser(token, req.protect);
                      delete user.status;
                      if (user.isBlock){
                        throw new BaseError(401, "fail", "This account is currently blocked")
                      }
                      console.log('User response:::', user.data);
                      
                      req.user = user.data
                      next();
                    }
                catch (error: any) {
                    console.log(error.message);
                    next(error)   
                }
            }

  