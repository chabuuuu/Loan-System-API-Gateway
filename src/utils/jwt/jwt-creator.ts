const jwt = require('jsonwebtoken');

export function jwtCreate(email? : string){
    const token = jwt.sign(
        {username : email, timestamp: Date.now(), 'type': 'microservice-protect'},
        process.env.JWT_SECRET,
        { expiresIn: process.env.MICROSERVICE_JWT_EXPIRE_IN },
    );
    return token;
}