const jwt = require('jsonwebtoken')
import { Router, Request, Response } from 'express';
import * as bodyParser from 'body-parser';

interface AuthRequest extends Request {
  user?: any;
}

export const auth = Router();

  auth.use(bodyParser.json());

 auth.get('/auth', async (req:Request, res: Response, next)=>{
  let jwtToken:any = req.header("Authorization")
  jwtToken = jwtToken.split(' ')[1]
  if(!jwtToken){
   return res.status(400).send("Acceso denegado. No hay token")
  } 

 try{
   //revisar como es nuestro modelo
   const payload = jwt.verify(jwtToken, "secretKey")
   const authReq = req as AuthRequest;
   authReq.user = payload
   next()
 } catch(err){
     res.status(401).send("Acceso denegado. Token no valido")
 }
})
