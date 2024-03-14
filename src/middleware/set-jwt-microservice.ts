import { jwtCreate } from "@/utils/jwt/jwt-creator"

export const setJwtMicroservice = (req: any, res: any, next: any) => {
    try {
        let email = ""
        console.log('email:::');

        if (req.user.role !== 'other' || req.user.role ) {
            email = req.user.email
        }
        
        const token = jwtCreate(email)
        console.log('token::', token);
        
        req.protect = 'Bearer ' + token;
        console.log('microservice token:::',token);
        next()
    } catch (error) {
        next(error)
    }
}