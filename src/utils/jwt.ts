import jwt from 'jsonwebtoken';

export const generateToken =(payload:{id:string},expired:string)=>{
    return jwt.sign(payload,<string>process.env.SECRET_TOKEN,{
        expiresIn:expired
    })
}