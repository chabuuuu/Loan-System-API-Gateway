import axios from 'axios';
const authURL = process.env.AUTH_URL || 'http://localhost:3001/api/v1/authenticaion/me';
async function getUser(token: string) {
    try {
      const user = await axios.get(authURL, {headers: {
        'Authorization': token
      }});
      console.log("response::::", user.data)
      return user.data;
    } catch (error: any) {
      //console.error("error:::",error.response.data);
      throw new Error(JSON.stringify(error.response.data))    
    }
  }

export const requestAuthCheck = (app: any, routes: any) => {
    routes.forEach((r: any) => {
        if (r.auth) {
            app.use(r.url, async function(req: any, res: any, next: any) {
                try {
                    const token = req.get('Authorization')
                    const user : any = await getUser(token);
                    console.log("user::::", user);
                    
                    if (user.status == 'fail'){
                        throw new Error("User not authenticated");
                    }
                    req.role = user.role;
                    next();
                } catch (error: any) {
                    console.log(error.message);
                    res.status(402).json(JSON.parse(error.message));
                }
            });
        }
    })
}

