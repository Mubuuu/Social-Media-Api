const jwt = require("jsonwebtoken")
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

 const 
 protect = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {    
  
  const authHeader = req.headers.authorization;    
  interface ITokenPayload {
    iat: number;
    exp: number;
    id: string;
  }
  if (!authHeader) {
    res.status(401)
    throw new Error("auth failed")
  }
  const token = authHeader.split(" ")[1];    
  jwt.verify(
    token,
    process.env.SECRET_TOKEN,
    (err: object | null, decoded: object | undefined) => {
      if (err) {                              
        throw new Error("jwt errror")
      } else {
        const { id } = decoded as ITokenPayload;
        req.body.userId = id;
        next();
      }
    }  
  );
})

export default protect